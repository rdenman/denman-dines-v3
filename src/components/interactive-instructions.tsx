"use client";

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
import type { Instruction } from "@prisma/client";
import { Check, ChevronDown, ChevronRight } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Instructions */}
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
                            ({completedCount}/{section.instructions.length})
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
                      <ol className="space-y-3">
                        {section.instructions.map((instruction, index) => {
                          const isCompleted =
                            completionState[section.id]?.[instruction.id] ||
                            false;

                          return (
                            <li
                              key={instruction.id}
                              className="flex gap-3 group"
                            >
                              <div className="flex-shrink-0 w-8 h-8 p-0 rounded-full border-2 hover:border-primary transition-colors flex items-center justify-center">
                                <Checkbox
                                  id={`instruction-${instruction.id}`}
                                  checked={isCompleted}
                                  onCheckedChange={() =>
                                    toggleItem(section.id, instruction.id)
                                  }
                                  className="sr-only"
                                />
                                {isCompleted ? (
                                  <Check className="h-4 w-4 text-primary" />
                                ) : (
                                  <span className="text-sm font-medium text-muted-foreground">
                                    {index + 1}
                                  </span>
                                )}
                              </div>
                              <Label
                                htmlFor={`instruction-${instruction.id}`}
                                className={cn(
                                  "min-w-0 text-md",
                                  { "pt-1": !isCompleted },
                                  {
                                    "line-through text-muted-foreground":
                                      isCompleted,
                                  }
                                )}
                              >
                                {isCompleted ? (
                                  <div className="truncate">
                                    {instruction.text.split("\n")[0]}
                                  </div>
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
  );
}
