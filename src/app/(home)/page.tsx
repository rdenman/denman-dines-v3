import { RecipeSearch } from "@/components/recipe-search";
import { RecipeSort } from "@/components/recipe-sort";
import { SmartPagination } from "@/components/smart-pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseRecipeSearchParams, QuerySearchParams } from "@/lib/query";
import { DEFAULT_RECIPES_PER_PAGE, getPaginatedRecipes } from "@/lib/recipe";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function getTotalTime(
  prepTime: number | null,
  cookTime: number | null
): string {
  const total = (prepTime ?? 0) + (cookTime ?? 0);
  return formatTime(total);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<QuerySearchParams>;
}) {
  const { page, sort, query } = parseRecipeSearchParams(await searchParams);

  const { recipes, totalCount, totalPages, currentPage } =
    await getPaginatedRecipes(page, DEFAULT_RECIPES_PER_PAGE, sort, query);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Denman Dines</h1>
        <p className="text-center text-muted-foreground text-lg mb-6">
          The GOAT of recipe sites
        </p>
        <div className="max-w-2xl mx-auto">
          <RecipeSearch />
        </div>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          {query ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">No recipes found</h2>
              <p className="text-muted-foreground">
                No recipes match your search for &quot;{query}&quot;. Try a
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
          {query && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Search results for &quot;{query}&quot;
              </h2>
              <p className="text-muted-foreground">
                Found {totalCount} recipe{totalCount !== 1 ? "s" : ""}
              </p>
            </div>
          )}
          <div className="flex justify-end items-center mb-6 w-full sm:w-auto">
            <RecipeSort currentSort={sort} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  {/* Mobile layout: horizontal with image on left */}
                  <div className="md:hidden flex">
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-l-lg ml-4">
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

                    <div className="flex-1 py-2 px-4">
                      <CardTitle className="mb-2 text-md">
                        {recipe.title}
                      </CardTitle>

                      {recipe.description && (
                        <CardDescription className="mb-3">
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

                        <div className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>
                            {getTotalTime(recipe.prepTime, recipe.cookTime)}
                          </span>
                        </div>
                      </div>

                      {recipe.user.name && (
                        <div className="text-xs text-muted-foreground mt-2">
                          by {recipe.user.name}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop layout: vertical with image on top */}
                  <div className="hidden md:block">
                    <CardHeader className="pb-3">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
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

                        <div className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>
                            {getTotalTime(recipe.prepTime, recipe.cookTime)}
                          </span>
                        </div>
                      </div>

                      {recipe.user.name && (
                        <div className="text-xs text-muted-foreground mt-2">
                          by {recipe.user.name}
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <SmartPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            itemsPerPage={DEFAULT_RECIPES_PER_PAGE}
          />
        </>
      )}
    </div>
  );
}
