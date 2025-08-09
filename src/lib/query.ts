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
}

function isValidSortOption(value: string): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function parseRecipeSearchParams(params: QuerySearchParams) {
  const pageNum = parseInt(params.page || "1", 10);
  const page = Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;

  const sort =
    params.sort && isValidSortOption(params.sort) ? params.sort : "newest";

  return { page, sort };
}
