import { InteractiveIngredients } from "@/components/interactive-ingredients";
import { InteractiveInstructions } from "@/components/interactive-instructions";
import { OwnerEditButton } from "@/components/owner-edit-button";
import { Card, CardContent } from "@/components/ui/card";
import { getRecipeBySlug } from "@/lib/recipe";
import { exists, formatTime } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const recipe = await getRecipeBySlug(decodedSlug);

  if (!recipe) {
    notFound();
  }

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      url: `https://denmandines.com/recipes/${slug}`,
      type: "article",
      images: [
        {
          url: recipe.photo,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.description,
      images: [recipe.photo],
    },
  };
}

export const revalidate = 300;

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const recipe = await getRecipeBySlug(decodedSlug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Recipe Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <OwnerEditButton recipeUserId={recipe.userId} slug={slug} />
        </div>
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
          <InteractiveIngredients
            sections={recipe.ingredientSections}
            recipeSlug={slug}
          />
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Instructions</h2>
          <InteractiveInstructions
            sections={recipe.instructionSections}
            recipeSlug={slug}
          />
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
                    <span className="shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></span>
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
