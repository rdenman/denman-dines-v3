"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface RecipeSearchProps {
  placeholder?: string;
  className?: string;
}

export function RecipeSearch({
  placeholder = "Search for a recipe",
  className = "",
}: RecipeSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update local state when URL search params change
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      const params = new URLSearchParams(searchParams);

      if (searchQuery.trim()) {
        params.set("q", searchQuery.trim());
        params.delete("page"); // Reset to first page when searching
      } else {
        params.delete("q");
        params.delete("page");
      }

      const newUrl = params.toString() ? `?${params.toString()}` : "/";
      router.push(newUrl);
    },
    [router, searchParams]
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
        // Only search if query has at least 3 characters or is empty (to clear search)
        if (searchQuery.trim().length >= 3 || searchQuery.trim().length === 0) {
          handleSearch(searchQuery);
        }
      }, 500); // 500ms delay
    },
    [handleSearch]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear any pending debounced search and search immediately
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    // Only search if query has at least 3 characters or is empty (to clear search)
    if (query.trim().length >= 3 || query.trim().length === 0) {
      handleSearch(query);
    }
    // Blur the input to hide mobile keyboard
    const target = e.target as HTMLFormElement;
    const input = target.querySelector("input");
    if (input) {
      input.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  const handleClear = () => {
    setQuery("");
    handleSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="pl-10 pr-10 py-2 w-full"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors h-4 w-4 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
}
