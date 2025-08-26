import type { Prisma } from "@prisma/client";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "cook-time-asc", label: "Cook Time (Shortest)" },
  { value: "cook-time-desc", label: "Cook Time (Longest)" },
  { value: "servings-asc", label: "Servings (Fewest)" },
  { value: "servings-desc", label: "Servings (Most)" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export interface QuerySearchParams {
  page?: string;
  sort?: string;
  q?: string;
}

export function isValidSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

/**
 * Get the orderBy configuration for a given sort option
 */
export function getOrderByForSort(
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

export function parseRecipeSearchParams(params: QuerySearchParams) {
  const pageNum = parseInt(params.page || "1", 10);
  const page = Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;

  const sort =
    params.sort && isValidSortOption(params.sort) ? params.sort : "newest";

  const query = params.q?.trim() || "";

  return { page, sort, query };
}
