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
    <div className="space-y-2">
      {/* Instructions */}
      {sections.length > 0 ? (
        <div className="space-y-2">
          {sections.map((section) => {
            const isCompleted = isSectionCompleted(section);
            const completedCount = getCompletedCount(section);
            const isCollapsed = collapsedSections.has(section.id);

            return (
              <Card
                key={section.id}
                data-testid="instruction-section-card"
                className={cn(
                  "p-2 gap-2",
                  isCompleted ? "border-primary/20 bg-primary/5" : ""
                )}
              >
                <Collapsible
                  open={!isCollapsed}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer gap-0 p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
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
                    <CardContent className="p-2">
                      <ol className="space-y-2">
                        {section.instructions.map((instruction, index) => {
                          const isCompleted =
                            completionState[section.id]?.[instruction.id] ||
                            false;

                          return (
                            <li
                              key={instruction.id}
                              data-testid="instruction-item"
                              className="flex gap-2 group"
                            >
                              <div className="shrink-0 w-6 h-6 rounded-full border-2 hover:border-primary transition-colors flex items-center justify-center self-start mt-[0.125rem]">
                                <Checkbox
                                  id={`instruction-${instruction.id}`}
                                  checked={isCompleted}
                                  onCheckedChange={() =>
                                    toggleItem(section.id, instruction.id)
                                  }
                                  className="sr-only"
                                />
                                {isCompleted ? (
                                  <Check className="h-3 w-3 text-primary" />
                                ) : (
                                  <span className="text-xs font-medium text-muted-foreground">
                                    {index + 1}
                                  </span>
                                )}
                              </div>
                              <Label
                                htmlFor={`instruction-${instruction.id}`}
                                className={cn(
                                  "min-w-0 text-md flex-1 mt-0.25",
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
        <Card className="p-2">
          <CardContent className="p-2">
            <p className="text-center text-muted-foreground">
              No instructions added yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
