import prisma from "@/lib/prisma";
import {
  PaginatedQueryParams,
  SortOption,
  getOrderByForSort,
} from "@/lib/query";
import type { Prisma } from "@/prisma/generated/client";
import { unstable_cache } from "next/cache";

export const DEFAULT_RECIPES_PER_PAGE = 24;

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
  sort = "createdAt-desc",
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
              { title: { contains: q, mode: "insensitive" } },
              // Search in recipe description
              { description: { contains: q, mode: "insensitive" } },
              // Search in ingredient names
              {
                ingredientSections: {
                  some: {
                    ingredients: {
                      some: { name: { contains: q, mode: "insensitive" } },
                    },
                  },
                },
              },
            ],
          }
        : {};

      // Use standard Prisma query for all sorting options
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
          orderBy: getOrderByForSort(sortOption),
          skip: (page - 1) * size,
          take: size,
        }),
        prisma.recipe.count({
          where: searchConditions,
        }),
      ]);

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
      revalidate: 300,
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
          user: {
            select: {
              name: true,
            },
          },
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
      revalidate: 300,
    }
  );

  return getCachedRecipe(slug);
}
