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

export function InfiniteRecipeList({
  initialRecipes,
  initialPage,
  initialTotalPages,
  sort,
  query,
  pageSize,
}: InfiniteRecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(
    initialPage >= initialTotalPages
  );

  const observerTarget = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchParams = useSearchParams();

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
        setRecipes((prev) => [...prev, ...data.recipes]);
        setPage(data.currentPage);
        setHasReachedEnd(data.currentPage >= data.totalPages);
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
  }, [isLoading, hasReachedEnd, page, pageSize, sort, query]);

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
    // Cancel any in-flight requests when search/sort changes
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setRecipes(initialRecipes);
    setPage(initialPage);
    setHasReachedEnd(initialPage >= initialTotalPages);
    setIsLoading(false); // Reset loading state
  }, [initialRecipes, initialPage, initialTotalPages, searchParams]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${encodeURIComponent(recipe.slug)}`}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              {/* Mobile layout: horizontal with image on left */}
              <div className="md:hidden flex">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-l-lg ml-4">
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

                <div className="flex-1 px-4">
                  <CardTitle className="text-md mb-1">{recipe.title}</CardTitle>

                  {recipe.description && (
                    <CardDescription className="mb-1">
                      <div
                        className="overflow-hidden"
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

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      {recipe.servings && (
                        <span className="flex items-center gap-1">
                          <span>👥</span>
                          <span>{recipe.servings}</span>
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
                </div>
              </div>

              {/* Desktop layout: vertical with image on top */}
              <div className="hidden md:block">
                <CardHeader className="pb-3">
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
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
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <CardTitle className="mb-2">
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
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
            <span>Loading more recipes...</span>
          </div>
        )}

        {hasReachedEnd && recipes.length > 0 && (
          <div className="text-center text-muted-foreground">
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
