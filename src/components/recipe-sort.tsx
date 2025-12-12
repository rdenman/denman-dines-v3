"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, SortOption } from "@/lib/query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface RecipeSortProps {
  currentSort?: SortOption;
}

export function RecipeSort({
  currentSort = "createdAt-desc",
}: RecipeSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", value);
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
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
