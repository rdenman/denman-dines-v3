"use client";

import { Check, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { useRecipeProgress } from "@/lib/hooks/use-recipe-progress";
import { cn } from "@/lib/utils";
import type { Instruction } from "../../prisma/generated/client";

interface InstructionSection {
  id: string;
  name: string;
  instructions: Instruction[];
}

interface InteractiveInstructionsProps {
  sections: InstructionSection[];
  recipeSlug: string;
}

export function InteractiveInstructions({
  sections,
  recipeSlug,
}: InteractiveInstructionsProps) {
  const {
    completionState,
    collapsedSections,
    toggleItem,
    toggleSection,
    isSectionCompleted,
    getCompletedCount,
  } = useRecipeProgress(`recipe-instructions-${recipeSlug}`);

  if (sections.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-sm text-muted-foreground">
            No instructions added yet.
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
            data-testid="instruction-section-card"
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
                        {completedCount}/{section.instructions.length}
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
                  <ol className="space-y-3">
                    {section.instructions.map((instruction, index) => {
                      const checked =
                        completionState[section.id]?.[instruction.id] || false;

                      return (
                        <li
                          key={instruction.id}
                          data-testid="instruction-item"
                          className="flex gap-3"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              toggleItem(section.id, instruction.id)
                            }
                            className={cn(
                              "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:size-6",
                              checked
                                ? "border-primary bg-primary"
                                : "border-border hover:border-primary",
                            )}
                            aria-label={`Step ${index + 1}: ${checked ? "completed" : "not completed"}`}
                          >
                            <Checkbox
                              id={`instruction-${instruction.id}`}
                              checked={checked}
                              onCheckedChange={() =>
                                toggleItem(section.id, instruction.id)
                              }
                              className="sr-only"
                              tabIndex={-1}
                            />
                            {checked ? (
                              <Check className="size-3 text-primary-foreground" />
                            ) : (
                              <span className="text-xs font-medium text-muted-foreground">
                                {index + 1}
                              </span>
                            )}
                          </button>
                          <Label
                            htmlFor={`instruction-${instruction.id}`}
                            className={cn(
                              "min-w-0 flex-1 text-sm leading-relaxed",
                              checked && "text-muted-foreground line-through",
                            )}
                          >
                            {checked ? (
                              <span className="line-clamp-1">
                                {instruction.text.split("\n")[0]}
                              </span>
                            ) : (
                              instruction.text
                            )}
                          </Label>
                        </li>
                      );
                    })}
                  </ol>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
