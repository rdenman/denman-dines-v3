import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CACHE_TAGS } from "@/lib/recipe";
import { createRecipeSchema } from "@/lib/validation";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric except spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Ensure slug is unique by appending number if needed
async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.recipe.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// TODO make this a server action
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    const data = createRecipeSchema.parse(await request.json());

    // Generate unique slug
    const baseSlug = generateSlug(data.title);
    const slug = await generateUniqueSlug(baseSlug);

    // Create recipe with nested data
    const recipe = await prisma.recipe.create({
      data: {
        title: data.title,
        slug,
        description: data.description || null,
        servings: data.servings || null,
        prepTime: data.prepTime || null,
        cookTime: data.cookTime || null,
        photo: data.photo || null,
        tips: data.tips,
        userId: session.user.id,
        ingredientSections: {
          create: data.ingredientSections.map((section, sectionIndex) => ({
            name: section.name,
            order: sectionIndex,
            ingredients: {
              create: section.ingredients.map(
                (ingredient, ingredientIndex) => ({
                  name: ingredient.name,
                  amount: ingredient.amount || null,
                  preparation: ingredient.preparation || null,
                  order: ingredientIndex,
                })
              ),
            },
          })),
        },
        instructionSections: {
          create: data.instructionSections.map((section, sectionIndex) => ({
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
          })),
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    // Revalidate caches
    revalidateTag(CACHE_TAGS.RECIPES, "max");
    revalidateTag(`${CACHE_TAGS.RECIPE_DETAILS}:${slug}`, "max");

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
