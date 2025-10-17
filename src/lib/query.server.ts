import { getSortPreferenceFromCookie } from "@/lib/cookies.server";
import {
  isValidSortOption,
  PaginatedQueryParams,
  QuerySearchParams,
  SortOption,
} from "@/lib/query";
import { DEFAULT_RECIPES_PER_PAGE } from "@/lib/recipe";

/**
 * Server-side function to parse recipe search parameters
 * Uses cookies for sort preference when no URL parameter exists
 */
export async function parseRecipeSearchParams(
  params: QuerySearchParams
): Promise<PaginatedQueryParams<SortOption>> {
  const pageNum = parseInt(params.page || "1", 10);
  const page = Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;

  const sizeNum = parseInt(params.size || `${DEFAULT_RECIPES_PER_PAGE}`, 10);
  const size =
    Number.isNaN(sizeNum) || sizeNum < 1 ? DEFAULT_RECIPES_PER_PAGE : sizeNum;

  // Check URL params first (highest priority)
  let sort: SortOption;
  if (params.sort && isValidSortOption(params.sort)) {
    sort = params.sort as SortOption;
  } else {
    // Fall back to stored preference from cookies
    sort = await getSortPreferenceFromCookie();
  }

  const q = params.q?.trim() || "";

  return { page, size, sort, q };
}
