import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const DEFAULT_RECIPES_PER_PAGE = 24;

export const CACHE_TAGS = {
  RECIPES: "recipes",
  RECIPE_DETAILS: "recipe-details",
  RECIPE_COUNT: "recipe-count",
} as const;

/**
 * Get paginated recipes with user information
 */
export async function getPaginatedRecipes(
  page: number = 1,
  pageSize: number = DEFAULT_RECIPES_PER_PAGE
) {
  const getCachedRecipes = unstable_cache(
    async (pageNumber: number, recipesPerPage: number) => {
      console.log(
        `🔄 Cache MISS: Fetching recipes for page ${pageNumber} with page size ${recipesPerPage} from database`
      );

      const [recipes, totalCount] = await Promise.all([
        prisma.recipe.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          skip: (pageNumber - 1) * recipesPerPage,
          take: recipesPerPage,
        }),
        prisma.recipe.count(),
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

  return getCachedRecipes(page, pageSize);
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
