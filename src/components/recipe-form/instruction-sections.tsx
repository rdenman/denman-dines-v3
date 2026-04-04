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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMdUp } from "@/lib/hooks/use-is-md-up";
import { cn } from "@/lib/utils";
import type { CreateRecipeInput } from "@/lib/validation";

interface InstructionSectionsProps {
  control: Control<CreateRecipeInput>;
}

export function InstructionSections({ control }: InstructionSectionsProps) {
  const isMdUp = useIsMdUp();
  const sensors = useRecipeSortableSensors(isMdUp);
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
    move: moveSection,
  } = useFieldArray({
    control,
    name: "instructionSections",
  });

  const sectionIds = sections.map((s) => s.id);

  const onSectionDragEnd = (event: DragEndEvent) => {
    recipeDragEndMove(event, sectionIds, moveSection);
  };

  const addSection = () => {
    appendSection({
      name: "",
      instructions: [{ text: "" }],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Instructions</CardTitle>
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
              <InstructionSection
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

interface InstructionSectionProps {
  control: Control<CreateRecipeInput>;
  sectionFieldId: string;
  sectionIndex: number;
  isMdUp: boolean;
  onRemove: () => void;
  showRemove: boolean;
}

function InstructionSection({
  control,
  sectionFieldId,
  sectionIndex,
  isMdUp,
  onRemove,
  showRemove,
}: InstructionSectionProps) {
  const sectionSortable = useRecipeSortableItem(sectionFieldId, isMdUp);
  const stepSensors = useRecipeSortableSensors(isMdUp);
  const instructionsName =
    `instructionSections.${sectionIndex}.instructions` as const;

  const {
    fields: steps,
    append: appendStep,
    remove: removeStep,
    move: moveStep,
  } = useFieldArray({
    control,
    name: instructionsName,
  });

  const stepIds = steps.map((f) => f.id);

  const onStepDragEnd = (event: DragEndEvent) => {
    recipeDragEndMove(event, stepIds, moveStep);
  };

  const addInstruction = () => {
    appendStep({ text: "" });
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
          title="Hold, then drag to reorder this instruction section"
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
          title="Drag to reorder this instruction section"
          {...sectionHandleProps}
        >
          <GripVertical className="size-4" aria-hidden />
          <span className="sr-only">Drag section to reorder</span>
        </button>
        <FormField
          control={control}
          name={`instructionSections.${sectionIndex}.name`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Section name (e.g., Prepare the dough)"
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
        sensors={stepSensors}
        collisionDetection={closestCenter}
        onDragEnd={onStepDragEnd}
      >
        <SortableContext items={stepIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {steps.map((step, stepIndex) => (
              <SortableInstructionStep
                key={step.id}
                control={control}
                stepFieldId={step.id}
                sectionIndex={sectionIndex}
                stepIndex={stepIndex}
                isMdUp={isMdUp}
                showRemove={steps.length > 1}
                onRemove={() => removeStep(stepIndex)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addInstruction}
        className="w-full"
      >
        <Plus className="size-4" />
        Add Step
      </Button>
    </div>
  );
}

interface SortableInstructionStepProps {
  control: Control<CreateRecipeInput>;
  stepFieldId: string;
  sectionIndex: number;
  stepIndex: number;
  isMdUp: boolean;
  showRemove: boolean;
  onRemove: () => void;
}

function SortableInstructionStep({
  control,
  stepFieldId,
  sectionIndex,
  stepIndex,
  isMdUp,
  showRemove,
  onRemove,
}: SortableInstructionStepProps) {
  const sortable = useRecipeSortableItem(stepFieldId, isMdUp);
  const fieldName =
    `instructionSections.${sectionIndex}.instructions.${stepIndex}.text` as const;

  const rowActivation = isMdUp ? {} : sortable.rowDragProps;
  const handleActivation = isMdUp ? sortable.handleDragProps : {};

  return (
    <div
      ref={sortable.setNodeRef}
      style={sortable.style}
      className={cn(
        "flex gap-2 items-start",
        sortable.isDragging && "opacity-90",
        !isMdUp &&
          "touch-none rounded-md border border-transparent py-1 -mx-1 px-1",
      )}
      {...rowActivation}
    >
      <button
        type="button"
        className={cn(
          "hidden md:inline-flex shrink-0 rounded-md p-1 mt-2 text-muted-foreground touch-none hover:bg-muted",
          "cursor-grab active:cursor-grabbing",
        )}
        {...handleActivation}
      >
        <GripVertical className="size-4" aria-hidden />
        <span className="sr-only">Drag step to reorder</span>
      </button>

      <div className="shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-2">
        {stepIndex + 1}
      </div>

      <div className="flex-1 min-w-0">
        <FormField
          control={control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Describe this step in detail..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {showRemove && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="mt-2 shrink-0"
        >
          <X className="size-3" />
        </Button>
      )}
    </div>
  );
}
