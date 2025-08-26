import prisma from "@/lib/prisma";
import { SortOption, getOrderByForSort, isValidSortOption } from "@/lib/query";
import type { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface SearchParams {
  q?: string;
  page?: string;
  sort?: string;
}

export interface SearchResponse {
  recipes: Array<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
    photo: string | null;
    servings: number | null;
    prepTime: number | null;
    cookTime: number | null;
    user: {
      name: string | null;
    };
  }>;
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const pageParam = searchParams.get("page") || "1";
    const sortParam = searchParams.get("sort") || "newest";

    const page = Math.max(1, parseInt(pageParam, 10) || 1);
    const sort: SortOption = isValidSortOption(sortParam)
      ? sortParam
      : "newest";
    const pageSize = 24; // Same as DEFAULT_RECIPES_PER_PAGE

    if (!query.trim()) {
      return NextResponse.json({
        recipes: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: page,
      });
    }

    // Create search conditions for recipe title, description, and ingredients
    const searchConditions: Prisma.RecipeWhereInput = {
      OR: [
        // Search in recipe title
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        // Search in recipe description
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        // Search in ingredient names
        {
          ingredientSections: {
            some: {
              ingredients: {
                some: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
        },
      ],
    };

    const [recipes, totalCount] = await Promise.all([
      prisma.recipe.findMany({
        where: searchConditions,
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: getOrderByForSort(sort),
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.recipe.count({
        where: searchConditions,
      }),
    ]);

    const response: SearchResponse = {
      recipes,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error searching recipes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
