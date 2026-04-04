"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { useRecipeProgress } from "@/lib/hooks/use-recipe-progress";
import { cn, formatIngredient } from "@/lib/utils";
import type {
  Ingredient,
  IngredientSection,
} from "../../prisma/generated/client";

type InteractiveIngredientsSection = IngredientSection & {
  ingredients: Ingredient[];
};

interface InteractiveIngredientsProps {
  sections: InteractiveIngredientsSection[];
  recipeSlug: string;
}

export function InteractiveIngredients({
  sections,
  recipeSlug,
}: InteractiveIngredientsProps) {
  const {
    completionState,
    collapsedSections,
    toggleItem,
    toggleSection,
    isSectionCompleted,
    getCompletedCount,
  } = useRecipeProgress(`recipe-ingredients-${recipeSlug}`);

  if (sections.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-sm text-muted-foreground">
            No ingredients added yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {sections.map((section) => {
        const isCompleted = isSectionCompleted(section);
        const completedCount = getCompletedCount(section);
        const isCollapsed = collapsedSections.has(section.id);

        return (
          <Card
            key={section.id}
            data-testid="ingredient-section-card"
            className={cn(
              "gap-0 py-0",
              isCompleted && "border-primary/20 bg-primary/5",
            )}
          >
            <Collapsible
              open={!isCollapsed}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-semibold">
                        {section.name}
                      </CardTitle>
                      <span className="text-xs text-muted-foreground">
                        {completedCount}/{section.ingredients.length}
                      </span>
                    </div>
                    {isCollapsed ? (
                      <ChevronRight className="size-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="px-4 pb-4">
                  <ul className="space-y-2.5">
                    {section.ingredients.map((ingredient) => {
                      const checked =
                        completionState[section.id]?.[ingredient.id] || false;

                      return (
                        <li
                          key={ingredient.id}
                          data-testid="ingredient-item"
                          className="flex gap-2.5"
                        >
                          <Checkbox
                            id={`ingredient-${ingredient.id}`}
                            checked={checked}
                            onCheckedChange={() =>
                              toggleItem(section.id, ingredient.id)
                            }
                            className="mt-0.5 size-5 sm:size-4"
                          />
                          <Label
                            htmlFor={`ingredient-${ingredient.id}`}
                            className={cn(
                              "text-sm leading-relaxed",
                              checked && "text-muted-foreground line-through",
                            )}
                          >
                            {formatIngredient(ingredient)}
                          </Label>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
