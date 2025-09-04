import { useEffect, useState } from "react";

interface CompletionState {
  [sectionId: string]: {
    [itemId: string]: boolean;
  };
}

interface StoredProgress {
  completionState: CompletionState;
  collapsedSections: string[];
}

export function useRecipeProgress(storageKey: string) {
  const [completionState, setCompletionState] = useState<CompletionState>({});
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );

  // Load completion state from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed: StoredProgress = JSON.parse(stored);
        setCompletionState(parsed.completionState || {});
        setCollapsedSections(new Set(parsed.collapsedSections || []));
      } catch (error) {
        console.error(`Failed to parse stored ${storageKey}:`, error);
      }
    }
  }, [storageKey]);

  // Save completion state to sessionStorage whenever it changes
  useEffect(() => {
    const data: StoredProgress = {
      completionState,
      collapsedSections: Array.from(collapsedSections),
    };
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }, [completionState, collapsedSections, storageKey]);

  const toggleItem = (sectionId: string, itemId: string) => {
    setCompletionState((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [itemId]: !prev[sectionId]?.[itemId],
      },
    }));
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const isSectionCompleted = (section: {
    id: string;
    items?: Array<{ id: string }>;
    ingredients?: Array<{ id: string }>;
    instructions?: Array<{ id: string }>;
  }) => {
    const sectionState = completionState[section.id] || {};
    const items =
      section.items || section.ingredients || section.instructions || [];
    return items.every((item) => sectionState[item.id]);
  };

  const getCompletedCount = (section: {
    id: string;
    items?: Array<{ id: string }>;
    ingredients?: Array<{ id: string }>;
    instructions?: Array<{ id: string }>;
  }) => {
    const sectionState = completionState[section.id] || {};
    const items =
      section.items || section.ingredients || section.instructions || [];
    return items.filter((item) => sectionState[item.id]).length;
  };

  return {
    completionState,
    collapsedSections,
    toggleItem,
    toggleSection,
    isSectionCompleted,
    getCompletedCount,
  };
}
