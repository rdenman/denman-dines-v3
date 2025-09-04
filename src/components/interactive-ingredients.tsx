"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRecipeProgress } from "@/lib/hooks/use-recipe-progress";
import { cn, formatIngredient } from "@/lib/utils";
import type { Ingredient, IngredientSection } from "@prisma/client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Label } from "./ui/label";

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

  return (
    <div className="space-y-6">
      {/* Ingredients */}
      {sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((section) => {
            const isCompleted = isSectionCompleted(section);
            const completedCount = getCompletedCount(section);
            const isCollapsed = collapsedSections.has(section.id);

            return (
              <Card
                key={section.id}
                className={isCompleted ? "border-primary/20 bg-primary/5" : ""}
              >
                <Collapsible
                  open={!isCollapsed}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer gap-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-lg">
                            {section.name}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">
                            ({completedCount}/{section.ingredients.length})
                          </div>
                        </div>
                        {isCollapsed ? (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-4">
                      <ul className="space-y-3">
                        {section.ingredients.map((ingredient) => {
                          const isCompleted =
                            completionState[section.id]?.[ingredient.id] ||
                            false;

                          return (
                            <li
                              key={ingredient.id}
                              className="flex gap-3 group"
                            >
                              <Checkbox
                                id={`ingredient-${ingredient.id}`}
                                checked={isCompleted}
                                onCheckedChange={() =>
                                  toggleItem(section.id, ingredient.id)
                                }
                                className="mt-1"
                              />
                              <Label
                                htmlFor={`ingredient-${ingredient.id}`}
                                className={cn("text-md", {
                                  "line-through text-muted-foreground":
                                    isCompleted,
                                })}
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
  );
}
