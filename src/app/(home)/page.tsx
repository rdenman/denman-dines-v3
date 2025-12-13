import { InfiniteRecipeList } from "@/components/infinite-recipe-list";
import { RecipeSort } from "@/components/recipe-sort";
import { QuerySearchParams } from "@/lib/query";
import { parseRecipeSearchParams } from "@/lib/query.server";
import { DEFAULT_RECIPES_PER_PAGE, getPaginatedRecipes } from "@/lib/recipe";

export const revalidate = 120;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<QuerySearchParams>;
}) {
  const { page, size, sort, q } = await parseRecipeSearchParams(
    await searchParams
  );

  const { recipes, totalCount, totalPages, currentPage } =
    await getPaginatedRecipes({ page, size, sort, q });

  return (
    <div className="container mx-auto px-4 py-4">
      {recipes.length === 0 ? (
        <div className="text-center py-12">
          {q ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">No recipes found</h2>
              <p className="text-muted-foreground">
                No recipes match your search for &quot;{q}&quot;. Try a
                different search term.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">No recipes yet</h2>
              <p className="text-muted-foreground">
                Be the first to share a recipe!
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          {q && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Search results for &quot;{q}&quot;
              </h2>
              <p className="text-muted-foreground">
                Found {totalCount} recipe{totalCount !== 1 ? "s" : ""}
              </p>
            </div>
          )}
          <div className="flex justify-end items-center mb-4 w-full sm:w-auto">
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
      )}
    </div>
  );
}
