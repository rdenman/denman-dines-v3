"use client";

import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

/**
 * - Narrow viewports: PointerSensor uses delay so mouse in Chrome DevTools “mobile”
 *   mode (usually pointer/mouse, not touch) can long-press then drag.
 * - `md` and up: distance-based pickup on the grip feels snappier with a mouse.
 * TouchSensor always uses long-press for real touch + dnd-kit’s iOS handling.
 */
export function useRecipeSortableSensors(isMdUp: boolean) {
  const longPress = { delay: 225, tolerance: 8 } as const;

  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isMdUp ? { distance: 8 } : longPress,
    }),
    useSensor(TouchSensor, {
      activationConstraint: longPress,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
}
