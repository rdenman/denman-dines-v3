import { Plus, SquarePen } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth.server";
import prisma from "@/lib/prisma";

export default async function MyRecipesPage() {
  const session = await getSession();
  if (!session?.user) {
    unauthorized();
  }

  const recipes = await prisma.recipe.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      servings: true,
      prepTime: true,
      cookTime: true,
      _count: {
        select: {
          ingredientSections: true,
          instructionSections: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">My Recipes</h1>
          <p className="text-lg text-muted-foreground">
            Manage and edit your culinary creations
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/recipes/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Recipe
          </Link>
        </Button>
      </div>

      {recipes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              You haven&apos;t created any recipes yet.
            </p>
            <Button asChild>
              <Link href="/recipes/new">Create Your First Recipe</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/recipes/${encodeURIComponent(recipe.slug)}/edit`}
                    >
                      <SquarePen className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {recipe.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {recipe.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {recipe.servings && <p>Servings: {recipe.servings}</p>}
                  {recipe.prepTime && <p>Prep: {recipe.prepTime} min</p>}
                  {recipe.cookTime && <p>Cook: {recipe.cookTime} min</p>}
                  <p>
                    {recipe._count.ingredientSections} ingredient
                    {recipe._count.ingredientSections !== 1
                      ? " sections"
                      : " section"}
                  </p>
                  <p>
                    {recipe._count.instructionSections} step
                    {recipe._count.instructionSections !== 1
                      ? " sections"
                      : " section"}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href={`/recipes/${encodeURIComponent(recipe.slug)}`}>
                      View Recipe
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
