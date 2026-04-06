"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GripVertical, Plus, X } from "lucide-react";
import { type Control, useFieldArray } from "react-hook-form";
import { recipeDragEndMove } from "@/components/recipe-form/sortable/recipe-drag-end-move";
import { useRecipeSortableSensors } from "@/components/recipe-form/sortable/recipe-sortable-sensors";
import { useRecipeSortableItem } from "@/components/recipe-form/sortable/use-recipe-sortable-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMdUp } from "@/lib/hooks/use-is-md-up";
import { cn } from "@/lib/utils";
import type { RecipeFormInput } from "@/lib/validation";

interface IngredientSectionsProps {
  control: Control<RecipeFormInput>;
}

export function IngredientSections({ control }: IngredientSectionsProps) {
  const isMdUp = useIsMdUp();
  const sensors = useRecipeSortableSensors(isMdUp);
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
    move: moveSection,
  } = useFieldArray({
    control,
    name: "ingredientSections",
  });

  const sectionIds = sections.map((s) => s.id);

  const onSectionDragEnd = (event: DragEndEvent) => {
    recipeDragEndMove(event, sectionIds, moveSection);
  };

  const addSection = () => {
    appendSection({ name: "", ingredientText: "" });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Ingredients</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSection}
          >
            <Plus className="size-4" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onSectionDragEnd}
        >
          <SortableContext
            items={sectionIds}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section, sectionIndex) => (
              <IngredientSection
                key={section.id}
                control={control}
                sectionFieldId={section.id}
                sectionIndex={sectionIndex}
                isMdUp={isMdUp}
                onRemove={() => removeSection(sectionIndex)}
                showRemove={sections.length > 1}
              />
            ))}
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}

interface IngredientSectionProps {
  control: Control<RecipeFormInput>;
  sectionFieldId: string;
  sectionIndex: number;
  isMdUp: boolean;
  onRemove: () => void;
  showRemove: boolean;
}

function IngredientSection({
  control,
  sectionFieldId,
  sectionIndex,
  isMdUp,
  onRemove,
  showRemove,
}: IngredientSectionProps) {
  const sectionSortable = useRecipeSortableItem(sectionFieldId, isMdUp);
  const sectionHandleProps = isMdUp ? sectionSortable.handleDragProps : {};

  return (
    <div
      ref={sectionSortable.setNodeRef}
      style={sectionSortable.style}
      className={cn(
        "border rounded-lg p-4 space-y-4",
        sectionSortable.isDragging && "opacity-90 shadow-md",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted-foreground md:hidden",
            "cursor-grab touch-none active:cursor-grabbing",
          )}
          title="Hold, then drag to reorder this ingredient section"
          {...(!isMdUp ? sectionSortable.rowDragProps : {})}
        >
          <GripVertical className="size-4" aria-hidden />
          <span className="sr-only">
            Drag section to reorder (hold on mobile, then drag)
          </span>
        </span>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 rounded-md p-1 text-muted-foreground touch-none hover:bg-muted",
            "hidden md:inline-flex",
            "cursor-grab active:cursor-grabbing",
          )}
          title="Drag to reorder this ingredient section"
          {...sectionHandleProps}
        >
          <GripVertical className="size-4" aria-hidden />
          <span className="sr-only">Drag section to reorder</span>
        </button>
        <FormField
          control={control}
          name={`ingredientSections.${sectionIndex}.name`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Section name (e.g., For the dough)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showRemove && (
          <Button type="button" variant="outline" size="sm" onClick={onRemove}>
            <X className="size-4" />
          </Button>
        )}
      </div>

      <FormField
        control={control}
        name={`ingredientSections.${sectionIndex}.ingredientText`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm">Ingredients</FormLabel>
            <FormControl>
              <Textarea
                placeholder={
                  "Enter one ingredient per line, e.g.\n2 cups flour\n3 cloves garlic, minced\n1 lb chicken breast\nSalt & pepper to taste"
                }
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
