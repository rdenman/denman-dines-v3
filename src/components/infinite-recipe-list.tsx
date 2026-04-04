"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { RecipeCard } from "@/components/recipe-card";
import type { Recipe } from "../../prisma/generated/client";

interface InfiniteRecipeListProps {
  initialRecipes: Recipe[];
  initialPage: number;
  initialTotalPages: number;
  sort: string;
  query?: string;
  pageSize: number;
}

interface CachedRecipeListState {
  recipes: Recipe[];
  page: number;
  timestamp: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000;

function getCacheKey(sort: string, query?: string): string {
  return `recipe-list:${sort}:${query || "all"}`;
}

function saveToCache(cacheKey: string, recipes: Recipe[], page: number): void {
  if (typeof window === "undefined") return;

  try {
    const cacheData: CachedRecipeListState = {
      recipes,
      page,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Failed to save to sessionStorage:", error);
  }
}

function loadFromCache(cacheKey: string): CachedRecipeListState | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (!cached) return null;

    const data: CachedRecipeListState = JSON.parse(cached);

    if (Date.now() - data.timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch (error) {
    console.warn("Failed to load from sessionStorage:", error);
    return null;
  }
}

function clearCache(cacheKey: string): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(cacheKey);
  } catch (error) {
    console.warn("Failed to clear sessionStorage:", error);
  }
}

const CACHE_KEY_PREFIX = "recipe-list:";
const STALE_MARKER_KEY = "recipe-list-stale";

/**
 * Clear all sessionStorage recipe list caches and mark the list as stale.
 * The stale marker tells the component to call router.refresh() on next mount
 * so the client Router Cache is bypassed.
 */
export function clearAllRecipeListCaches(): void {
  if (typeof window === "undefined") return;

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(CACHE_KEY_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      sessionStorage.removeItem(key);
    }
    sessionStorage.setItem(STALE_MARKER_KEY, "1");
  } catch (error) {
    console.warn("Failed to clear recipe list caches:", error);
  }
}

export function InfiniteRecipeList({
  initialRecipes,
  initialPage,
  initialTotalPages,
  sort,
  query,
  pageSize,
}: InfiniteRecipeListProps) {
  const router = useRouter();
  const cacheKey = getCacheKey(sort, query);
  const previousCacheKeyRef = useRef<string>(cacheKey);
  const prevInitialRecipeIdsRef = useRef(
    initialRecipes.map((r) => r.id).join(","),
  );

  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(
    initialPage >= initialTotalPages,
  );

  const observerTarget = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const _searchParams = useSearchParams();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STALE_MARKER_KEY)) {
        sessionStorage.removeItem(STALE_MARKER_KEY);
        router.refresh();
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [router.refresh]);

  useEffect(() => {
    const newIds = initialRecipes.map((r) => r.id).join(",");
    if (prevInitialRecipeIdsRef.current !== newIds) {
      prevInitialRecipeIdsRef.current = newIds;
      setRecipes(initialRecipes);
      setPage(initialPage);
      setHasReachedEnd(initialPage >= initialTotalPages);
      clearCache(cacheKey);
      saveToCache(cacheKey, initialRecipes, initialPage);
    }
  }, [initialRecipes, initialPage, initialTotalPages, cacheKey]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only run on mount — the sync effect above handles prop changes
  useEffect(() => {
    const cachedState = loadFromCache(cacheKey);

    if (cachedState && cachedState.page > initialPage) {
      const cachedFirstPage = cachedState.recipes.slice(
        0,
        initialRecipes.length,
      );
      const firstPageMatch =
        cachedFirstPage.length === initialRecipes.length &&
        cachedFirstPage.every((r, i) => r.id === initialRecipes[i]?.id);

      if (firstPageMatch) {
        setRecipes(cachedState.recipes);
        setPage(cachedState.page);
        setHasReachedEnd(cachedState.page >= initialTotalPages);
        return;
      }
    }

    clearCache(cacheKey);
    saveToCache(cacheKey, initialRecipes, initialPage);
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || hasReachedEnd) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const params = new URLSearchParams();
      params.set("page", nextPage.toString());
      params.set("size", pageSize.toString());
      params.set("sort", sort);
      if (query) {
        params.set("q", query);
      }

      const response = await fetch(`/api/recipes/list?${params.toString()}`, {
        signal: abortController.signal,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      if (!abortController.signal.aborted) {
        const updatedRecipes = [...recipes, ...data.recipes];
        setRecipes(updatedRecipes);
        setPage(data.currentPage);
        setHasReachedEnd(data.currentPage >= data.totalPages);
        saveToCache(cacheKey, updatedRecipes, data.currentPage);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Error loading more recipes:", error);
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [
    isLoading,
    hasReachedEnd,
    page,
    pageSize,
    sort,
    query,
    cacheKey,
    recipes,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoading && !hasReachedEnd) {
          loadMore();
        }
      },
      { rootMargin: "300px" },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, isLoading, hasReachedEnd]);

  useEffect(() => {
    if (previousCacheKeyRef.current !== cacheKey) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      const oldCacheKey = previousCacheKeyRef.current;
      clearCache(oldCacheKey);
      setRecipes(initialRecipes);
      setPage(initialPage);
      setHasReachedEnd(initialPage >= initialTotalPages);
      setIsLoading(false);

      saveToCache(cacheKey, initialRecipes, initialPage);
      previousCacheKeyRef.current = cacheKey;
    }
  }, [cacheKey, initialRecipes, initialPage, initialTotalPages]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <>
      <div
        data-testid="recipe-grid"
        className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4"
      >
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div
        ref={observerTarget}
        className="mt-6 flex justify-center py-6 sm:mt-8 sm:py-8"
      >
        {isLoading && (
          <div
            data-testid="loading-indicator"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <div className="size-5 animate-spin rounded-full border-2 border-border border-t-primary" />
            <span className="text-sm">Loading more recipes...</span>
          </div>
        )}

        {hasReachedEnd && recipes.length > 0 && (
          <p
            data-testid="end-message"
            className="text-center text-sm text-muted-foreground"
          >
            You&apos;ve viewed all {recipes.length} recipes
          </p>
        )}
      </div>
    </>
  );
}
