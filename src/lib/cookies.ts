import { Cookies } from "@/lib/constants";
import { isValidSortOption } from "@/lib/query";

const MAX_AGE = 365 * 24 * 60 * 60; // 1 year

/**
 * Sets the user's recipe sorting preference in a browser cookie.
 */
export function setSortPreferenceCookie(sortOption: string) {
  try {
    if (!isValidSortOption(sortOption)) {
      throw new Error(`Invalid sort option: ${sortOption}`);
    }

    document.cookie = `${Cookies.SORT_PREFERENCE}=${sortOption}; max-age=${MAX_AGE}; path=/; SameSite=Strict`;
  } catch (error) {
    console.warn(
      `Failed to store ${Cookies.SORT_PREFERENCE} in cookies:`,
      error
    );
  }
}
