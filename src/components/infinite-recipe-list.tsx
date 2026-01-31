"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import type { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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

// Cache utilities
const CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes

function getCacheKey(sort: string, query?: string): string {
  return `recipe-list:${sort}:${query || "all"}`;
}

function saveToCache(
  cacheKey: string,
  recipes: Recipe[],
  page: number
): void {
  // Only run in browser environment
  if (typeof window === "undefined") return;
  
  try {
    const cacheData: CachedRecipeListState = {
      recipes,
      page,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    // Silently fail if sessionStorage is full or unavailable
    console.warn("Failed to save to sessionStorage:", error);
  }
}

function loadFromCache(cacheKey: string): CachedRecipeListState | null {
  // Only run in browser environment
  if (typeof window === "undefined") return null;
  
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (!cached) return null;

    const data: CachedRecipeListState = JSON.parse(cached);

    // Check if cache has expired
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
  // Only run in browser environment
  if (typeof window === "undefined") return;
  
  try {
    sessionStorage.removeItem(cacheKey);
  } catch (error) {
    console.warn("Failed to clear sessionStorage:", error);
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
  const cacheKey = getCacheKey(sort, query);
  const previousCacheKeyRef = useRef<string>(cacheKey);
  
  // Always use initialRecipes for SSR/hydration - restore from cache after mount
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(
    initialPage >= initialTotalPages
  );

  const observerTarget = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchParams = useSearchParams();

  // Restore from cache after hydration or save initial state if no cache
  useEffect(() => {
    const cachedState = loadFromCache(cacheKey);
    
    if (cachedState) {
      // Restore cached state
      setRecipes(cachedState.recipes);
      setPage(cachedState.page);
      setHasReachedEnd(cachedState.page >= initialTotalPages);
    } else {
      // No cache, save initial state
      saveToCache(cacheKey, initialRecipes, initialPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  const loadMore = useCallback(async () => {
    if (isLoading || hasReachedEnd) return;

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
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

      // Only update state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        const updatedRecipes = [...recipes, ...data.recipes];
        setRecipes(updatedRecipes);
        setPage(data.currentPage);
        setHasReachedEnd(data.currentPage >= data.totalPages);
        
        // Save to cache
        saveToCache(cacheKey, updatedRecipes, data.currentPage);
      }
    } catch (error) {
      // Ignore abort errors - they're expected when requests are canceled
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }
      console.error("Error loading more recipes:", error);
    } finally {
      // Only clear loading state if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [isLoading, hasReachedEnd, page, pageSize, sort, query, cacheKey, recipes]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoading && !hasReachedEnd) {
          loadMore();
        }
      },
      {
        rootMargin: "300px", // Trigger 300px before reaching the bottom
      }
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

  // Reset when search params change (user performs new search/sort)
  useEffect(() => {
    // Only reset if the cache key has actually changed (different sort/query)
    if (previousCacheKeyRef.current !== cacheKey) {
      // Cancel any in-flight requests when search/sort changes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      // Clear old cache and reset to initial state
      const oldCacheKey = previousCacheKeyRef.current;
      clearCache(oldCacheKey);
      setRecipes(initialRecipes);
      setPage(initialPage);
      setHasReachedEnd(initialPage >= initialTotalPages);
      setIsLoading(false);
      
      // Save initial state to cache for the new search params
      saveToCache(cacheKey, initialRecipes, initialPage);
      
      // Update the ref to track the new cache key
      previousCacheKeyRef.current = cacheKey;
    }
  }, [cacheKey, initialRecipes, initialPage, initialTotalPages]);

  // Cleanup: abort any in-flight requests when component unmounts
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
      >
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${encodeURIComponent(recipe.slug)}`}
            data-testid="recipe-card-link"
          >
            <Card
              data-testid="recipe-card"
              className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer p-0 overflow-hidden"
            >
              {/* Mobile layout: horizontal with image on left */}
              <div className="md:hidden flex">
                <div className="relative w-30 h-30 shrink-0 overflow-hidden">
                  {recipe.photo ? (
                    <Image
                      src={recipe.photo}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <div className="text-muted-foreground text-center">
                        <div className="text-2xl">🍽️</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-2 flex flex-col justify-between">
                  <div>
                    <CardTitle
                      data-testid="recipe-title-mobile"
                      className="text-md mb-1 leading-5"
                    >
                      {recipe.title}
                    </CardTitle>

                    {recipe.description && (
                      <CardDescription className="mb-2">
                        <div
                          className="overflow-hidden text-xs"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {recipe.description}
                        </div>
                      </CardDescription>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      {recipe.servings && (
                        <span className="flex items-center gap-1">
                          <span>👥</span>
                          <span>{recipe.servings}</span>
                        </span>
                      )}
                    </div>

                    {!!recipe.totalTime && (
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{formatTime(recipe.totalTime)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop layout: vertical with image on top */}
              <div className="hidden md:flex flex-col h-full">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-t-lg">
                  {recipe.photo ? (
                    <Image
                      src={recipe.photo}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted">
                      <div className="text-muted-foreground text-center">
                        <div className="text-4xl mb-2">🍽️</div>
                        <div className="text-sm">No image</div>
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="flex-1 flex flex-col px-3 pt-3 pb-2">
                  <CardTitle
                    data-testid="recipe-title-desktop"
                    className="mb-2"
                  >
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {recipe.title}
                    </div>
                  </CardTitle>

                  {recipe.description && (
                    <CardDescription className="mb-4 flex-1">
                      <div
                        className="overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {recipe.description}
                      </div>
                    </CardDescription>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {recipe.servings && (
                        <span className="flex items-center gap-1">
                          <span>👥</span>
                          <span>{recipe.servings} servings</span>
                        </span>
                      )}
                    </div>

                    {recipe.totalTime !== null && (
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{formatTime(recipe.totalTime)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Loading indicator and end message */}
      <div ref={observerTarget} className="mt-8 flex justify-center py-8">
        {isLoading && (
          <div
            data-testid="loading-indicator"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            <span>Loading more recipes...</span>
          </div>
        )}

        {hasReachedEnd && recipes.length > 0 && (
          <div
            data-testid="end-message"
            className="text-center text-muted-foreground"
          >
            <p className="text-lg">You&apos;ve reached the end! 🎉</p>
            <p className="text-sm mt-1">
              You&apos;ve viewed all {recipes.length} recipes
            </p>
          </div>
        )}
      </div>
    </>
  );
}
