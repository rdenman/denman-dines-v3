import { getSession } from "@/lib/auth.server";
import prisma from "@/lib/prisma";
import { CACHE_TAGS } from "@/lib/recipe";
import { createRecipeSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
      select: { userId: true },
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
        tips: validatedData.tips,
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
                  })
                ),
              },
            })
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
                    text: instruction,
                    order: instructionIndex,
                  })
                ),
              },
            })
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

    // Revalidate caches
    revalidateTag(CACHE_TAGS.RECIPES, "max");
    revalidateTag(`${CACHE_TAGS.RECIPE_DETAILS}:${updatedRecipe.slug}`, "max");

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}
