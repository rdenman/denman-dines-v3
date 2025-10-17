import { Cookies } from "@/lib/constants";
import { SortOption, isValidSortOption } from "@/lib/query";
import { cookies } from "next/headers";

/**
 * Server-side function to get sort preference from cookies
 */
export async function getSortPreferenceFromCookie(): Promise<SortOption> {
  try {
    const cookieStore = await cookies();
    const sortPreference = cookieStore.get(Cookies.SORT_PREFERENCE)?.value;

    if (sortPreference && isValidSortOption(sortPreference)) {
      return sortPreference;
    }
  } catch (error) {
    console.warn(
      `Failed to read ${Cookies.SORT_PREFERENCE} from cookies:`,
      error
    );
  }

  return "newest";
}
