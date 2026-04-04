"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function useRecipeSortableItem(id: string, isMdUp: boolean) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { zIndex: 10 as const } : {}),
  };

  const handleDragProps = isMdUp
    ? { ...attributes, ...listeners }
    : ({} as typeof attributes & typeof listeners);
  const rowDragProps = !isMdUp
    ? { ...attributes, ...listeners }
    : ({} as typeof attributes & typeof listeners);

  return {
    setNodeRef,
    style,
    handleDragProps,
    rowDragProps,
    isDragging,
  };
}
