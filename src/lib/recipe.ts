import prisma from "@/lib/prisma";
import { SortOption } from "@/lib/query";
import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const DEFAULT_RECIPES_PER_PAGE = 24;

export const CACHE_TAGS = {
  RECIPES: "recipes",
  RECIPE_DETAILS: "recipe-details",
  RECIPE_COUNT: "recipe-count",
} as const;

/**
 * Get the orderBy configuration for a given sort option
 */
function getOrderByForSort(
  sortOption: SortOption
):
  | Prisma.RecipeOrderByWithRelationInput
  | Prisma.RecipeOrderByWithRelationInput[] {
  switch (sortOption) {
    case "newest":
      return { createdAt: "desc" };
    case "oldest":
      return { createdAt: "asc" };
    case "title-asc":
      return { title: "asc" };
    case "title-desc":
      return { title: "desc" };
    case "cook-time-asc":
      return [{ cookTime: "asc" }, { prepTime: "asc" }, { createdAt: "desc" }];
    case "cook-time-desc":
      return [
        { cookTime: "desc" },
        { prepTime: "desc" },
        { createdAt: "desc" },
      ];
    case "servings-asc":
      return [{ servings: "asc" }, { createdAt: "desc" }];
    case "servings-desc":
      return [{ servings: "desc" }, { createdAt: "desc" }];
    default:
      return { createdAt: "desc" };
  }
}

/**
 * Get paginated recipes with user information and sorting
 */
export async function getPaginatedRecipes(
  page: number = 1,
  pageSize: number = DEFAULT_RECIPES_PER_PAGE,
  sort: SortOption = "newest"
) {
  const getCachedRecipes = unstable_cache(
    async (
      pageNumber: number,
      recipesPerPage: number,
      sortOption: SortOption
    ) => {
      console.log(
        `🔄 Cache MISS: Fetching recipes for page ${pageNumber} with page size ${recipesPerPage} and sort ${sortOption} from database`
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
          orderBy: getOrderByForSort(sortOption),
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

  return getCachedRecipes(page, pageSize, sort);
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
