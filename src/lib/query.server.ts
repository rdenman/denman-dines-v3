import { getSortPreferenceFromCookie } from "@/lib/cookies";
import { isValidSortOption, QuerySearchParams, SortOption } from "@/lib/query";

/**
 * Server-side function to parse recipe search parameters
 * Uses cookies for sort preference when no URL parameter exists
 */
export async function parseRecipeSearchParams(params: QuerySearchParams) {
  const pageNum = parseInt(params.page || "1", 10);
  const page = Number.isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;

  // Check URL params first (highest priority)
  let sort: SortOption;
  if (params.sort && isValidSortOption(params.sort)) {
    sort = params.sort as SortOption;
  } else {
    // Fall back to stored preference from cookies
    sort = await getSortPreferenceFromCookie();
  }

  const query = params.q?.trim() || "";

  return { page, sort, query };
}
