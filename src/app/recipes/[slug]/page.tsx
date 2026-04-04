import { Clock, Lightbulb, Users } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InteractiveIngredients } from "@/components/interactive-ingredients";
import { InteractiveInstructions } from "@/components/interactive-instructions";
import { OwnerEditButton } from "@/components/owner-edit-button";
import { PageContainer } from "@/components/page-container";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { getRecipeBySlug } from "@/lib/recipe";
import {
  exists,
  formatDateTimeISO,
  formatDurationISO,
  formatIngredient,
  formatTime,
} from "@/lib/utils";

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const recipe = await getRecipeBySlug(decodedSlug);

  if (!recipe) {
    notFound();
  }

  const canonicalPath = `/recipes/${slug}`;
  const socialImage = recipe.photo ?? "/logo.webp";
  const description =
    recipe.description ??
    "A simple, ad-free recipe from the Denman Dines collection.";
  const authorName = recipe.user?.name ?? "Denman Dines";

  return {
    title: recipe.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: recipe.title,
      description,
      url: canonicalPath,
      type: "article",
      siteName: "Denman Dines",
      publishedTime: formatDateTimeISO(recipe.createdAt),
      modifiedTime: formatDateTimeISO(recipe.updatedAt),
      authors: [authorName],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description,
      images: [socialImage],
    },
  };
}

export const revalidate = 300;

export async function generateStaticParams() {
  const recipes = await prisma.recipe.findMany({
    select: { slug: true },
  });
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

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

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.photo ? [recipe.photo] : undefined,
    author: recipe.user?.name,
    datePublished: formatDateTimeISO(recipe.createdAt),
    dateModified: formatDateTimeISO(recipe.updatedAt),
    prepTime: formatDurationISO(recipe.prepTime),
    cookTime: formatDurationISO(recipe.cookTime),
    totalTime: formatDurationISO(recipe.totalTime),
    recipeYield: recipe.servings ? [`${recipe.servings} servings`] : undefined,
    recipeIngredient: recipe.ingredientSections.flatMap((section) =>
      section.ingredients.map((ingredient) => formatIngredient(ingredient)),
    ),
    recipeInstructions: recipe.instructionSections.flatMap((section) =>
      section.instructions.map((instruction) => ({
        "@type": "HowToStep",
        text: instruction.text,
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />

      <PageContainer size="narrow">
        {/* Header */}
        <header className="mb-5 sm:mb-8">
          <h1
            data-testid="recipe-title"
            className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
          >
            {recipe.title}
          </h1>
          {recipe.description && (
            <p className="mt-1.5 text-base text-muted-foreground sm:mt-2 sm:text-lg">
              {recipe.description}
            </p>
          )}

          {/* Photo */}
          {recipe.photo && (
            <div className="relative mt-4 aspect-4/3 w-full overflow-hidden rounded-lg sm:mt-6 sm:aspect-video sm:rounded-xl">
              <Image
                src={recipe.photo}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                priority
              />
            </div>
          )}

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs sm:mt-6 sm:gap-x-6 sm:gap-y-2 sm:text-sm">
            {exists(recipe.servings) && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Users className="size-3.5 text-muted-foreground sm:size-4" />
                <span className="font-medium">{recipe.servings}</span>
                <span className="text-muted-foreground">servings</span>
              </div>
            )}
            {exists(recipe.servings) && exists(recipe.prepTime) && (
              <div
                className="hidden h-4 w-px bg-border sm:block sm:h-5"
                aria-hidden="true"
              />
            )}
            {exists(recipe.prepTime) && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="size-3.5 text-muted-foreground sm:size-4" />
                <span className="font-medium">
                  {formatTime(recipe.prepTime)}
                </span>
                <span className="text-muted-foreground">prep</span>
              </div>
            )}
            {exists(recipe.prepTime) && exists(recipe.cookTime) && (
              <div
                className="hidden h-4 w-px bg-border sm:block sm:h-5"
                aria-hidden="true"
              />
            )}
            {exists(recipe.cookTime) && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="size-3.5 text-muted-foreground sm:size-4" />
                <span className="font-medium">
                  {formatTime(recipe.cookTime)}
                </span>
                <span className="text-muted-foreground">cook</span>
              </div>
            )}
          </div>
        </header>

        {/* Content — stacked on mobile, side-by-side on desktop */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <section data-testid="ingredients-section">
            <h2 className="mb-2 font-serif text-xl font-semibold sm:mb-3 sm:text-2xl">
              Ingredients
            </h2>
            <InteractiveIngredients
              sections={recipe.ingredientSections}
              recipeSlug={slug}
            />
          </section>

          <section data-testid="instructions-section">
            <h2 className="mb-2 font-serif text-xl font-semibold sm:mb-3 sm:text-2xl">
              Instructions
            </h2>
            <InteractiveInstructions
              sections={recipe.instructionSections}
              recipeSlug={slug}
            />
          </section>
        </div>

        {/* Tips */}
        {recipe.tips.length > 0 && (
          <section className="mt-6 sm:mt-8">
            <h2 className="mb-2 font-serif text-xl font-semibold sm:mb-3 sm:text-2xl">
              Tips
            </h2>
            <Card className="gap-0 py-3 sm:py-4">
              <CardContent>
                <ul className="space-y-2.5 sm:space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex gap-2.5 sm:gap-3">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm sm:text-base">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Edit Button */}
        <div className="mt-6 flex justify-end sm:mt-8">
          <OwnerEditButton recipeUserId={recipe.userId} slug={slug} />
        </div>
      </PageContainer>
    </>
  );
}
