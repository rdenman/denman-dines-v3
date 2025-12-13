import type { Prisma } from "@/prisma/generated/client";

export const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "totalTime-asc", label: "Cook Time (Shortest)" },
  { value: "totalTime-desc", label: "Cook Time (Longest)" },
  { value: "servings-asc", label: "Servings (Fewest)" },
  { value: "servings-desc", label: "Servings (Most)" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export type SortDirection = "asc" | "desc";

export interface QuerySearchParams {
  page?: string;
  size?: string;
  sort?: string;
  q?: string;
}

export interface PaginatedQueryParams<T = string> {
  page?: number;
  size?: number;
  sort?: T;
  q?: string;
}

/**
 * Check if a value is a valid sort option
 */
export function isValidSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

/**
 * Check if a value is a valid direction
 */
export function isValidSortDirection(value: string): value is SortDirection {
  return ["asc", "desc"].includes(value);
}

const DEFAULT_SORT = { createdAt: "desc" } as const;

/**
 * Get the orderBy configuration for a given sort option
 */
export function getOrderByForSort(
  sortOption: SortOption
):
  | Prisma.RecipeOrderByWithRelationInput
  | Prisma.RecipeOrderByWithRelationInput[] {
  const dir = sortOption.split("-").at(-1);
  if (!dir || !isValidSortDirection(dir)) {
    console.error(
      `Invalid sort option: ${sortOption}. Must end with -asc or -desc.`
    );
    return DEFAULT_SORT;
  }

  const field = sortOption.replace(dir, "").slice(0, -1);
  if (["createdAt", "title"].includes(field)) {
    return { [field]: dir };
  }
  return [{ [field]: { sort: dir, nulls: "last" } }, DEFAULT_SORT];
}
