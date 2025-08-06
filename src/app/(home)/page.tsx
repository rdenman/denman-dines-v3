import { SmartPagination } from "@/components/smart-pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPaginatedRecipes } from "@/lib/recipe";
import { formatTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const RECIPES_PER_PAGE = 24;

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
  searchParams: Promise<{ page?: string }>;
}) {
  const page = parseInt((await searchParams).page || "1");
  const { recipes, totalCount, totalPages, currentPage } =
    await getPaginatedRecipes(page);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Denman Dines</h1>
        <p className="text-center text-muted-foreground text-lg">
          The GOAT of recipe sites
        </p>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No recipes yet</h2>
          <p className="text-muted-foreground">
            Be the first to share a recipe!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
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
                </Card>
              </Link>
            ))}
          </div>

          <SmartPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            itemsPerPage={RECIPES_PER_PAGE}
          />
        </>
      )}
    </div>
  );
}
