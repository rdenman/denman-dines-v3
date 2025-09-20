"use client";

import { Cookies } from "@/lib/constants";
import { SortOption } from "@/lib/query";
import { useCallback } from "react";

/**
 * Custom hook to manage sort preference storage using cookies
 * Stores user's sort preference in cookies on a per-device basis
 */
export function useSortPreference() {
  // Store preference in cookies
  const setPreference = useCallback((sortOption: SortOption) => {
    try {
      // Set cookie to last for 150 years using max-age (effectively forever for user preferences)
      const maxAge = 150 * 365 * 24 * 60 * 60; // 150 years in seconds

      document.cookie = `${Cookies.SORT_PREFERENCE}=${sortOption}; max-age=${maxAge}; path=/; SameSite=Lax`;
    } catch (error) {
      console.warn("Failed to store sort preference in cookies:", error);
    }
  }, []);

  return {
    setPreference,
  };
}
