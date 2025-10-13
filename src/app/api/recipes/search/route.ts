import prisma from "@/lib/prisma";
import {
  SortOption,
  getOrderByForSort,
  getRawSqlOrderBy,
  isValidSortOption,
  requiresRawSqlSort,
} from "@/lib/query";
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

    let recipes, totalCount;

    if (requiresRawSqlSort(sort)) {
      // Use raw SQL for cook time sorting (total time calculation)
      const orderByClause = getRawSqlOrderBy(sort);

      const whereClause = `
        WHERE (
          "title" ILIKE $1 OR
          "description" ILIKE $1 OR
          EXISTS (
            SELECT 1 FROM "IngredientSection" isec
            JOIN "Ingredient" ing ON isec."id" = ing."sectionId"
            WHERE isec."recipeId" = "Recipe"."id"
            AND ing."name" ILIKE $1
          )
        )
      `;

      const sql = `
        SELECT r.*, u."name" as "user_name"
        FROM "Recipe" r
        LEFT JOIN "User" u ON r."userId" = u."id"
        ${whereClause}
        ${orderByClause}
        LIMIT $2 OFFSET $3
      `;

      const countSql = `
        SELECT COUNT(*) as count
        FROM "Recipe" r
        ${whereClause}
      `;

      const [recipeResults, countResults] = await Promise.all([
        prisma.$queryRawUnsafe(
          sql,
          `%${query}%`,
          pageSize,
          (page - 1) * pageSize
        ),
        prisma.$queryRawUnsafe(countSql, `%${query}%`),
      ]);

      // Transform raw results to match Prisma format
      recipes = (recipeResults as Array<Record<string, unknown>>).map(
        (row) => ({
          id: row.id as string,
          title: row.title as string,
          slug: row.slug as string,
          description: row.description as string | null,
          photo: row.photo as string | null,
          servings: row.servings as number | null,
          prepTime: row.prepTime as number | null,
          cookTime: row.cookTime as number | null,
          user: { name: row.user_name as string | null },
        })
      );

      totalCount = parseInt(
        (countResults as Array<{ count: string }>)[0].count
      );
    } else {
      // Use standard Prisma query for other sorting options
      [recipes, totalCount] = await Promise.all([
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
    }

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
