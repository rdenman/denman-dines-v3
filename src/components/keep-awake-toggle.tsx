"use client";

import { Monitor, MonitorOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScreenWakeLock } from "@/lib/hooks/use-screen-wake-lock";

export function KeepAwakeToggle() {
  const { supported, enabled, setEnabled } = useScreenWakeLock();

  if (!supported) {
    return null;
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="shrink-0"
      aria-pressed={enabled}
      aria-label={enabled ? "Keep screen awake, on" : "Keep screen awake, off"}
      data-testid="keep-awake-toggle"
      onClick={() => setEnabled(!enabled)}
    >
      {enabled ? (
        <Monitor className="size-4" />
      ) : (
        <MonitorOff className="size-4" />
      )}
    </Button>
  );
}
