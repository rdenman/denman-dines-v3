import { Clock, Plus, SquarePen, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
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
    <PageContainer>
      <PageHeader
        title="My Recipes"
        description="Manage and edit your culinary creations"
      >
        <Button asChild className="w-full sm:w-auto">
          <Link href="/recipes/new" className="flex items-center gap-2">
            <Plus className="size-4" />
            Create Recipe
          </Link>
        </Button>
      </PageHeader>

      {recipes.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title="No recipes yet"
          description="You haven't created any recipes yet. Start sharing your culinary creations!"
        >
          <Button asChild>
            <Link href="/recipes/new">Create Your First Recipe</Link>
          </Button>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-2 font-serif">
                    {recipe.title}
                  </CardTitle>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                  >
                    <Link
                      href={`/recipes/${encodeURIComponent(recipe.slug)}/edit`}
                    >
                      <SquarePen className="size-4" />
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
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {recipe.servings && <span>{recipe.servings} servings</span>}
                  {recipe.prepTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {recipe.prepTime}m prep
                    </span>
                  )}
                  {recipe.cookTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {recipe.cookTime}m cook
                    </span>
                  )}
                </div>
                <div className="mt-4 border-t pt-4">
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
    </PageContainer>
  );
}
