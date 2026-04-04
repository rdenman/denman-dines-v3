import type { DragEndEvent } from "@dnd-kit/core";

export function recipeDragEndMove(
  event: DragEndEvent,
  itemIds: string[],
  move: (fromIndex: number, toIndex: number) => void,
): void {
  const { active, over } = event;
  if (!over || active.id === over.id) {
    return;
  }
  const oldIndex = itemIds.indexOf(String(active.id));
  const newIndex = itemIds.indexOf(String(over.id));
  if (oldIndex < 0 || newIndex < 0) {
    return;
  }
  move(oldIndex, newIndex);
}
