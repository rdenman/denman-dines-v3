import { SearchX, UtensilsCrossed } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { InfiniteRecipeList } from "@/components/infinite-recipe-list";
import { RecipeSort } from "@/components/recipe-sort";
import type { QuerySearchParams } from "@/lib/query";
import { parseRecipeSearchParams } from "@/lib/query.server";
import { DEFAULT_RECIPES_PER_PAGE, getPaginatedRecipes } from "@/lib/recipe";

interface RecipeContentProps {
  searchParams: Promise<QuerySearchParams>;
}

export async function RecipeContent({ searchParams }: RecipeContentProps) {
  const { page, size, sort, q } = await parseRecipeSearchParams(
    await searchParams,
  );

  const { recipes, totalCount, totalPages, currentPage } =
    await getPaginatedRecipes({ page, size, sort, q });

  if (recipes.length === 0) {
    return q ? (
      <EmptyState
        icon={SearchX}
        title="No recipes found"
        description={`No recipes match your search for "${q}". Try a different search term.`}
      />
    ) : (
      <EmptyState
        icon={UtensilsCrossed}
        title="No recipes yet"
        description="Be the first to share a recipe!"
      />
    );
  }

  return (
    <>
      {q && (
        <div className="mb-4 sm:mb-6">
          <h2 className="font-serif text-lg font-semibold sm:text-xl">
            Search results for &quot;{q}&quot;
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
            Found {totalCount} recipe{totalCount !== 1 ? "s" : ""}
          </p>
        </div>
      )}
      <div className="mb-3 flex w-full items-center justify-end sm:mb-4 sm:w-auto">
        <RecipeSort currentSort={sort} />
      </div>

      <InfiniteRecipeList
        initialRecipes={recipes}
        initialPage={currentPage}
        initialTotalPages={totalPages}
        sort={sort ?? "createdAt-desc"}
        query={q}
        pageSize={size ?? DEFAULT_RECIPES_PER_PAGE}
      />
    </>
  );
}
