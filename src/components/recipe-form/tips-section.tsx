"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Lightbulb, Plus, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useIsMdUp } from "@/lib/hooks/use-is-md-up";
import { cn } from "@/lib/utils";
import type { CreateRecipeInput } from "@/lib/validation";

interface TipsSectionProps {
  control: Control<CreateRecipeInput>;
}

export function TipsSection({ control }: TipsSectionProps) {
  const isMdUp = useIsMdUp();
  const sensors = useRecipeSortableSensors(isMdUp);
  const {
    fields: tips,
    append: appendTip,
    remove: removeTip,
    move: moveTip,
  } = useFieldArray({
    control,
    name: "tips",
  });

  const tipIds = tips.map((f) => f.id);

  const onTipDragEnd = (event: DragEndEvent) => {
    recipeDragEndMove(event, tipIds, moveTip);
  };

  const addTip = () => {
    appendTip({ text: "" });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500" />
            <CardTitle>Tips & Notes</CardTitle>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addTip}>
            <Plus className="size-4" />
            Add Tip
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tips.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tips added yet</p>
            <p className="text-xs">
              Share helpful tips and tricks for this recipe
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onTipDragEnd}
          >
            <SortableContext
              items={tipIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {tips.map((tip, tipIndex) => (
                  <SortableTipRow
                    key={tip.id}
                    control={control}
                    tipFieldId={tip.id}
                    tipIndex={tipIndex}
                    isMdUp={isMdUp}
                    onRemove={() => removeTip(tipIndex)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </CardContent>
    </Card>
  );
}

interface SortableTipRowProps {
  control: Control<CreateRecipeInput>;
  tipFieldId: string;
  tipIndex: number;
  isMdUp: boolean;
  onRemove: () => void;
}

function SortableTipRow({
  control,
  tipFieldId,
  tipIndex,
  isMdUp,
  onRemove,
}: SortableTipRowProps) {
  const sortable = useRecipeSortableItem(tipFieldId, isMdUp);
  const fieldName = `tips.${tipIndex}.text` as const;

  const rowActivation = isMdUp ? {} : sortable.rowDragProps;
  const handleActivation = isMdUp ? sortable.handleDragProps : {};

  return (
    <div
      ref={sortable.setNodeRef}
      style={sortable.style}
      className={cn(
        "flex gap-3 items-start",
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
        <Lightbulb className="size-4 text-yellow-600" aria-hidden />
        <span className="sr-only">Drag tip to reorder</span>
      </button>

      <div className="shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-medium mt-2 md:hidden">
        <Lightbulb className="size-3" />
      </div>

      <div className="flex-1 min-w-0">
        <FormField
          control={control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share a helpful tip or note about this recipe..."
                  className="min-h-16"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRemove}
        className="mt-2 shrink-0"
      >
        <X className="size-3" />
      </Button>
    </div>
  );
}
