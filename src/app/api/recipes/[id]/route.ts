import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth.server";
import { deleteRecipePhoto } from "@/lib/blob.server";
import prisma from "@/lib/prisma";
import { CACHE_TAGS } from "@/lib/recipe";
import { createRecipeSchema } from "@/lib/validation";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: recipeId } = await params;

    // Check if recipe exists and user owns it
    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { userId: true, photo: true },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = createRecipeSchema.parse(body);

    // Update the recipe
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        photo: validatedData.photo,
        servings: validatedData.servings,
        prepTime: validatedData.prepTime,
        cookTime: validatedData.cookTime,
        tips: validatedData.tips.map((t) => t.text),
        // Update ingredient sections
        ingredientSections: {
          deleteMany: {},
          create: validatedData.ingredientSections.map(
            (section, sectionIndex) => ({
              name: section.name,
              order: sectionIndex,
              ingredients: {
                create: section.ingredients.map(
                  (ingredient, ingredientIndex) => ({
                    name: ingredient.name,
                    amount: ingredient.amount,
                    preparation: ingredient.preparation,
                    order: ingredientIndex,
                  }),
                ),
              },
            }),
          ),
        },
        // Update instruction sections
        instructionSections: {
          deleteMany: {},
          create: validatedData.instructionSections.map(
            (section, sectionIndex) => ({
              name: section.name,
              order: sectionIndex,
              instructions: {
                create: section.instructions.map(
                  (instruction, instructionIndex) => ({
                    text: instruction.text,
                    order: instructionIndex,
                  }),
                ),
              },
            }),
          ),
        },
      },
      include: {
        ingredientSections: {
          include: {
            ingredients: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
        instructionSections: {
          include: {
            instructions: {
              orderBy: { order: "asc" },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    revalidateRecipe(updatedRecipe.slug, "max");

    // Photo replaced or removed: clean up the old blob
    if (existingRecipe.photo !== updatedRecipe.photo) {
      await deleteRecipePhoto(existingRecipe.photo);
    }

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: recipeId } = await params;

    const existingRecipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { userId: true, slug: true, photo: true },
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (existingRecipe.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Sections, ingredients, and instructions cascade via the schema
    await prisma.recipe.delete({ where: { id: recipeId } });

    // Expire immediately (no stale-while-revalidate) so the deleted recipe
    // never reappears on the next visit to the home page
    revalidateRecipe(existingRecipe.slug, { expire: 0 });

    // DB row is gone; blob cleanup is best-effort
    await deleteRecipePhoto(existingRecipe.photo);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 },
    );
  }
}

type RevalidateProfile = Parameters<typeof revalidateTag>[1];

/** Revalidate data cache and page-level ISR for a recipe and the home list */
function revalidateRecipe(slug: string, profile: RevalidateProfile): void {
  revalidateTag(CACHE_TAGS.RECIPES, profile);
  revalidateTag(`${CACHE_TAGS.RECIPE_DETAILS}:${slug}`, profile);
  revalidatePath("/", "page");
  revalidatePath(`/recipes/${slug}`, "page");
}
