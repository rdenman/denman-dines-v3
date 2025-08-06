import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRecipeBySlug } from "@/lib/recipe";
import { exists, formatTime } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        {recipe.description && (
          <p className="text-lg text-muted-foreground mb-6">
            {recipe.description}
          </p>
        )}

        {/* Recipe Photo */}
        {recipe.photo && (
          <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={recipe.photo}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        )}

        {/* Recipe Meta Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {exists(recipe.servings) && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{recipe.servings}</div>
              <div className="text-sm text-muted-foreground">Servings</div>
            </div>
          )}
          {exists(recipe.prepTime) && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {formatTime(recipe.prepTime)}
              </div>
              <div className="text-sm text-muted-foreground">Prep Time</div>
            </div>
          )}
          {exists(recipe.cookTime) && (
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {formatTime(recipe.cookTime)}
              </div>
              <div className="text-sm text-muted-foreground">Cook Time</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
          {recipe.ingredientSections.length > 0 ? (
            <div className="space-y-6">
              {recipe.ingredientSections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.ingredients.map((ingredient) => (
                        <li
                          key={ingredient.id}
                          className="flex items-start gap-2"
                        >
                          {ingredient.amount && (
                            <span className="font-medium text-muted-foreground min-w-0">
                              {ingredient.amount}
                            </span>
                          )}
                          <span className="flex-1">
                            {ingredient.name}
                            {ingredient.preparation && (
                              <span className="text-muted-foreground text-sm ml-2">
                                ({ingredient.preparation})
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  No ingredients added yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Instructions</h2>
          {recipe.instructionSections.length > 0 ? (
            <div className="space-y-6">
              {recipe.instructionSections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-4">
                      {section.instructions.map((instruction, index) => (
                        <li key={instruction.id} className="flex gap-4">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="flex-1 pt-1">
                            {instruction.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  No instructions added yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Tips */}
      {recipe.tips.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Tips</h2>
          <Card>
            <CardContent className="py-6">
              <ul className="space-y-3">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
