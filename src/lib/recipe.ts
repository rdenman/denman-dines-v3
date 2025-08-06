import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const RECIPES_PER_PAGE = 24;

export const CACHE_TAGS = {
  RECIPES: "recipes",
  RECIPE_DETAILS: "recipe-details",
  RECIPE_COUNT: "recipe-count",
} as const;

/**
 * Get paginated recipes with user information
 */
export async function getPaginatedRecipes(page: number = 1) {
  const getCachedRecipes = unstable_cache(
    async (pageNumber: number) => {
      console.log(
        `🔄 Cache MISS: Fetching recipes for page ${pageNumber} from database`
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
          skip: (pageNumber - 1) * RECIPES_PER_PAGE,
          take: RECIPES_PER_PAGE,
        }),
        prisma.recipe.count(),
      ]);

      return {
        recipes,
        totalCount,
        totalPages: Math.ceil(totalCount / RECIPES_PER_PAGE),
        currentPage: pageNumber,
      };
    },
    [],
    {
      tags: [CACHE_TAGS.RECIPES],
    }
  );

  return getCachedRecipes(page);
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
