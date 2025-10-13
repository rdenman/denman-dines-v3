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
 * Check if a sort option requires raw SQL for complex sorting
 */
export function requiresRawSqlSort(sortOption: SortOption): boolean {
  return sortOption === "cook-time-asc" || sortOption === "cook-time-desc";
}

/**
 * Get raw SQL ORDER BY clause for complex sorting
 */
export function getRawSqlOrderBy(sortOption: SortOption): string {
  switch (sortOption) {
    case "cook-time-asc":
      return `ORDER BY 
        CASE 
          WHEN "cookTime" IS NULL AND "prepTime" IS NULL THEN 1 
          ELSE 0 
        END ASC,
        (COALESCE("cookTime", 0) + COALESCE("prepTime", 0)) ASC, 
        "createdAt" DESC`;
    case "cook-time-desc":
      return `ORDER BY 
        CASE 
          WHEN "cookTime" IS NULL AND "prepTime" IS NULL THEN 1 
          ELSE 0 
        END ASC,
        (COALESCE("cookTime", 0) + COALESCE("prepTime", 0)) DESC, 
        "createdAt" DESC`;
    default:
      return "";
  }
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
    case "cook-time-desc":
      // These require raw SQL for total time calculation
      throw new Error(
        "Cook time sorting requires raw SQL - use requiresRawSqlSort() check"
      );
    case "servings-asc":
      return [
        { servings: { sort: "asc", nulls: "last" } },
        { createdAt: "desc" },
      ];
    case "servings-desc":
      return [
        { servings: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
      ];
    default:
      return { createdAt: "desc" };
  }
}
