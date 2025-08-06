"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/lib/recipe";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "cook-time-asc", label: "Cook Time (Shortest)" },
  { value: "cook-time-desc", label: "Cook Time (Longest)" },
  { value: "servings-asc", label: "Servings (Fewest)" },
  { value: "servings-desc", label: "Servings (Most)" },
] as const;

interface RecipeSortProps {
  currentSort?: SortOption;
}

export function RecipeSort({ currentSort = "newest" }: RecipeSortProps) {
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
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
