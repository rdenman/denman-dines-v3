import prisma from "@/lib/prisma";
import { SortOption, getOrderByForSort } from "@/lib/query";
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
export async function getPaginatedRecipes(
  page: number = 1,
  pageSize: number = DEFAULT_RECIPES_PER_PAGE,
  sort: SortOption = "newest",
  searchQuery?: string
) {
  const getCachedRecipes = unstable_cache(
    async (
      pageNumber: number,
      recipesPerPage: number,
      sortOption: SortOption,
      query?: string
    ) => {
      console.log(
        `🔄 Cache MISS: Fetching recipes for page ${pageNumber} with page size ${recipesPerPage}, sort ${sortOption}, and query "${query}" from database`
      );

      // Create search conditions if query is provided
      const searchConditions: Prisma.RecipeWhereInput = query
        ? {
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
          }
        : {};

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
          skip: (pageNumber - 1) * recipesPerPage,
          take: recipesPerPage,
        }),
        prisma.recipe.count({
          where: searchConditions,
        }),
      ]);

      return {
        recipes,
        totalCount,
        totalPages: Math.ceil(totalCount / recipesPerPage),
        currentPage: pageNumber,
      };
    },
    [],
    {
      tags: [CACHE_TAGS.RECIPES],
    }
  );

  return getCachedRecipes(page, pageSize, sort, searchQuery);
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
