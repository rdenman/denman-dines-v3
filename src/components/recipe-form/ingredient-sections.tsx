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
import { useIsMdUp } from "@/lib/hooks/use-is-md-up";
import { cn } from "@/lib/utils";
import type { CreateRecipeInput } from "@/lib/validation";

interface IngredientSectionsProps {
  control: Control<CreateRecipeInput>;
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
    appendSection({
      name: "",
      ingredients: [{ name: "", amount: "", preparation: "" }],
    });
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
  control: Control<CreateRecipeInput>;
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
  const ingredientSensors = useRecipeSortableSensors(isMdUp);
  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
    move: moveIngredient,
  } = useFieldArray({
    control,
    name: `ingredientSections.${sectionIndex}.ingredients`,
  });

  const ingredientIds = ingredients.map((f) => f.id);

  const onIngredientDragEnd = (event: DragEndEvent) => {
    recipeDragEndMove(event, ingredientIds, moveIngredient);
  };

  const addIngredient = () => {
    appendIngredient({ name: "", amount: "", preparation: "" });
  };

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

      <DndContext
        sensors={ingredientSensors}
        collisionDetection={closestCenter}
        onDragEnd={onIngredientDragEnd}
      >
        <SortableContext
          items={ingredientIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {ingredients.map((ingredient, ingredientIndex) => (
              <SortableIngredientRow
                key={ingredient.id}
                control={control}
                ingredientFieldId={ingredient.id}
                sectionIndex={sectionIndex}
                ingredientIndex={ingredientIndex}
                isMdUp={isMdUp}
                showRemove={ingredients.length > 1}
                onRemove={() => removeIngredient(ingredientIndex)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addIngredient}
        className="w-full"
      >
        <Plus className="size-4" />
        Add Ingredient
      </Button>
    </div>
  );
}

interface SortableIngredientRowProps {
  control: Control<CreateRecipeInput>;
  ingredientFieldId: string;
  sectionIndex: number;
  ingredientIndex: number;
  isMdUp: boolean;
  showRemove: boolean;
  onRemove: () => void;
}

function SortableIngredientRow({
  control,
  ingredientFieldId,
  sectionIndex,
  ingredientIndex,
  isMdUp,
  showRemove,
  onRemove,
}: SortableIngredientRowProps) {
  const sortable = useRecipeSortableItem(ingredientFieldId, isMdUp);

  const rowActivation = isMdUp ? {} : sortable.rowDragProps;
  const handleActivation = isMdUp ? sortable.handleDragProps : {};

  return (
    <div
      ref={sortable.setNodeRef}
      style={sortable.style}
      className={cn(
        "flex gap-2 items-end",
        sortable.isDragging && "opacity-90",
        !isMdUp &&
          "touch-none rounded-md border border-transparent py-1 -mx-1 px-1",
      )}
      {...rowActivation}
    >
      <button
        type="button"
        className={cn(
          "hidden md:inline-flex shrink-0 rounded-md p-1 mb-2 text-muted-foreground touch-none hover:bg-muted",
          "cursor-grab active:cursor-grabbing",
        )}
        {...handleActivation}
      >
        <GripVertical className="size-4" aria-hidden />
        <span className="sr-only">Drag ingredient to reorder</span>
      </button>
      <div className="grid grid-cols-12 gap-2 flex-1 items-end">
        <div className="col-span-12 sm:col-span-5">
          <FormField
            control={control}
            name={`ingredientSections.${sectionIndex}.ingredients.${ingredientIndex}.name`}
            render={({ field }) => (
              <FormItem>
                {ingredientIndex === 0 && (
                  <FormLabel className="text-sm">Ingredient</FormLabel>
                )}
                <FormControl>
                  <Input placeholder="flour" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <FormField
            control={control}
            name={`ingredientSections.${sectionIndex}.ingredients.${ingredientIndex}.amount`}
            render={({ field }) => (
              <FormItem>
                {ingredientIndex === 0 && (
                  <FormLabel className="text-sm">Amount</FormLabel>
                )}
                <FormControl>
                  <Input placeholder="2 cups" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <FormField
            control={control}
            name={`ingredientSections.${sectionIndex}.ingredients.${ingredientIndex}.preparation`}
            render={({ field }) => (
              <FormItem>
                {ingredientIndex === 0 && (
                  <FormLabel className="text-sm">Preparation</FormLabel>
                )}
                <FormControl>
                  <Input placeholder="diced" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="col-span-12 sm:col-span-1 flex justify-end sm:justify-center">
          {showRemove && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
            >
              <X className="size-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
