"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSortPreference } from "@/lib/hooks/use-sort-preference";
import { SORT_OPTIONS, SortOption } from "@/lib/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface RecipeSortProps {
  currentSort?: SortOption;
}

export function RecipeSort({ currentSort = "newest" }: RecipeSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setPreference } = useSortPreference();

  const handleSortChange = useCallback(
    (value: string) => {
      // Store the user's preference when they explicitly change the sort
      setPreference(value as SortOption);

      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", value);
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams, setPreference]
  );

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger
        id="sort-select"
        className="w-full sm:w-[200px]"
        aria-label="Sort recipes by"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
