import prisma from "@/lib/prisma";
import {
  PaginatedQueryParams,
  SortOption,
  getOrderByForSort,
  getRawSqlOrderBy,
  requiresRawSqlSort,
} from "@/lib/query";
import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const DEFAULT_RECIPES_PER_PAGE = 100;

export const CACHE_TAGS = {
  RECIPES: "recipes",
  RECIPE_DETAILS: "recipe-details",
  RECIPE_COUNT: "recipe-count",
} as const;

/**
 * Get paginated recipes with user information and sorting
 */
export async function getPaginatedRecipes({
  page = 1,
  size = DEFAULT_RECIPES_PER_PAGE,
  sort = "newest",
  q,
}: PaginatedQueryParams<SortOption>) {
  const getCachedRecipes = unstable_cache(
    async (page: number, size: number, sortOption: SortOption, q?: string) => {
      console.log(
        `🔄 Cache MISS: Fetching recipes for page ${page} with page size ${size}, sort ${sortOption}, and query "${q}" from database`
      );

      // Create search conditions if query is provided
      const searchConditions: Prisma.RecipeWhereInput = q
        ? {
            OR: [
              // Search in recipe title
              {
                title: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              // Search in recipe description
              {
                description: {
                  contains: q,
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
                          contains: q,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
              },
            ],
          }
        : {};

      let recipes, totalCount;

      if (requiresRawSqlSort(sortOption)) {
        // Use raw SQL for cook time sorting (total time calculation)
        const orderByClause = getRawSqlOrderBy(sortOption);

        // Build WHERE clause for search conditions
        let whereClause = "";
        const params: unknown[] = [];
        let paramCount = 0;

        if (q) {
          paramCount++;
          whereClause = `
            WHERE (
              "title" ILIKE $${paramCount} OR
              "description" ILIKE $${paramCount} OR
              EXISTS (
                SELECT 1 FROM "IngredientSection" isec
                JOIN "Ingredient" ing ON isec."id" = ing."sectionId"
                WHERE isec."recipeId" = "Recipe"."id"
                AND ing."name" ILIKE $${paramCount}
              )
            )
          `;
          params.push(`%${q}%`);
        }

        paramCount++;
        const limitParam = paramCount;
        params.push(size);

        paramCount++;
        const offsetParam = paramCount;
        params.push((page - 1) * size);

        const sql = `
          SELECT r.*, u."name" as "user_name"
          FROM "Recipe" r
          LEFT JOIN "User" u ON r."userId" = u."id"
          ${whereClause}
          ${orderByClause}
          LIMIT $${limitParam} OFFSET $${offsetParam}
        `;

        const countSql = `
          SELECT COUNT(*) as count
          FROM "Recipe" r
          ${whereClause}
        `;

        const [recipeResults, countResults] = await Promise.all([
          prisma.$queryRawUnsafe(sql, ...params),
          prisma.$queryRawUnsafe(countSql, ...params.slice(0, q ? 1 : 0)),
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
            tips: row.tips as string[],
            userId: row.userId as string,
            createdAt: row.createdAt as Date,
            updatedAt: row.updatedAt as Date,
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
            orderBy: getOrderByForSort(sortOption),
            skip: (page - 1) * size,
            take: size,
          }),
          prisma.recipe.count({
            where: searchConditions,
          }),
        ]);
      }

      return {
        recipes,
        totalCount,
        totalPages: Math.ceil(totalCount / size),
        currentPage: page,
      };
    },
    [],
    {
      tags: [CACHE_TAGS.RECIPES],
    }
  );

  return getCachedRecipes(page, size, sort, q);
}

/**
 * Get a single recipe by slug with all related data
 */
export async function getRecipeBySlug(slug: string) {
  const getCachedRecipe = unstable_cache(
    async (recipeSlug: string) => {
      console.log(
        `🔄 Cache MISS: Fetching recipe "${recipeSlug}" from database`
      );

      return prisma.recipe.findUnique({
        where: { slug: recipeSlug },
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
    },
    [],
    {
      tags: [CACHE_TAGS.RECIPE_DETAILS, `${CACHE_TAGS.RECIPE_DETAILS}:${slug}`],
    }
  );

  return getCachedRecipe(slug);
}
