import { Clock, Users, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { formatTime } from "@/lib/utils";
import type { Recipe } from "../../prisma/generated/client";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${encodeURIComponent(recipe.slug)}`}
      data-testid="recipe-card-link"
    >
      <Card
        data-testid="recipe-card"
        className="group h-full overflow-hidden p-0 transition-shadow duration-200 active:shadow-md hover:shadow-lg"
      >
        {/* Mobile: horizontal layout — taller card for better touch targets */}
        <div className="flex md:hidden">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden">
            {recipe.photo ? (
              <Image
                src={recipe.photo}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-muted">
                <UtensilsCrossed className="size-5 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
            <div className="min-w-0">
              <CardTitle
                data-testid="recipe-title-mobile"
                className="text-[15px] leading-snug"
              >
                <span className="line-clamp-2">{recipe.title}</span>
              </CardTitle>
              {recipe.description && (
                <CardDescription className="mt-1">
                  <span className="line-clamp-2 text-xs leading-relaxed">
                    {recipe.description}
                  </span>
                </CardDescription>
              )}
            </div>

            <RecipeMeta recipe={recipe} />
          </div>
        </div>

        {/* Desktop: vertical layout */}
        <div className="hidden h-full flex-col md:flex">
          <div className="relative aspect-4/3 w-full overflow-hidden">
            {recipe.photo ? (
              <Image
                src={recipe.photo}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-muted">
                <UtensilsCrossed className="size-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <CardContent className="flex flex-1 flex-col px-4 pb-3 pt-3">
            <CardTitle data-testid="recipe-title-desktop" className="mb-1.5">
              <span className="line-clamp-1">{recipe.title}</span>
            </CardTitle>

            {recipe.description && (
              <CardDescription className="mb-3 flex-1">
                <span className="line-clamp-2">{recipe.description}</span>
              </CardDescription>
            )}

            <RecipeMeta recipe={recipe} compact={false} />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}

function RecipeMeta({
  recipe,
  compact = true,
}: {
  recipe: Recipe;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-muted-foreground">
      <div className="flex items-center gap-3">
        {recipe.servings && (
          <span className="flex items-center gap-1">
            <Users className="size-3" />
            <span>
              {recipe.servings}
              {!compact && " servings"}
            </span>
          </span>
        )}
      </div>
      {!!recipe.totalTime && (
        <span className="flex items-center gap-1">
          <Clock className="size-3" />
          <span>{formatTime(recipe.totalTime)}</span>
        </span>
      )}
    </div>
  );
}
