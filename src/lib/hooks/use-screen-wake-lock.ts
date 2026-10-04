"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "denman-dines:keep-awake";

function isWakeLockSupported(): boolean {
  return typeof navigator !== "undefined" && "wakeLock" in navigator;
}

function readPreference(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return true;
    }
    return stored === "true";
  } catch {
    return true;
  }
}

function writePreference(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function useScreenWakeLock(): {
  supported: boolean;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
} {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabledState] = useState(true);
  const sentinelRef = useRef<WakeLockSentinel | null>(null);
  const enabledRef = useRef(true);
  const retryOnGestureRef = useRef(false);

  const releaseLock = useCallback(async (): Promise<void> => {
    const sentinel = sentinelRef.current;
    sentinelRef.current = null;
    if (sentinel && !sentinel.released) {
      try {
        await sentinel.release();
      } catch {
        // Already released by the browser.
      }
    }
  }, []);

  const requestLock = useCallback(async (): Promise<void> => {
    if (!isWakeLockSupported() || !enabledRef.current) {
      return;
    }
    if (document.visibilityState !== "visible") {
      return;
    }
    if (sentinelRef.current && !sentinelRef.current.released) {
      return;
    }

    try {
      const sentinel = await navigator.wakeLock.request("screen");
      sentinelRef.current = sentinel;
      retryOnGestureRef.current = false;
      sentinel.addEventListener("release", () => {
        if (sentinelRef.current === sentinel) {
          sentinelRef.current = null;
        }
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        retryOnGestureRef.current = true;
      }
    }
  }, []);

  const setEnabled = useCallback(
    (next: boolean): void => {
      enabledRef.current = next;
      setEnabledState(next);
      writePreference(next);
      if (next) {
        void requestLock();
      } else {
        retryOnGestureRef.current = false;
        void releaseLock();
      }
    },
    [requestLock, releaseLock],
  );

  useEffect(() => {
    setSupported(isWakeLockSupported());
    const preference = readPreference();
    enabledRef.current = preference;
    setEnabledState(preference);
  }, []);

  useEffect(() => {
    if (!supported || !enabled) {
      void releaseLock();
      return;
    }

    void requestLock();

    const onVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        void requestLock();
      }
    };

    const onUserGesture = (): void => {
      if (retryOnGestureRef.current && enabledRef.current) {
        void requestLock();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("pointerdown", onUserGesture);
    document.addEventListener("keydown", onUserGesture);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("pointerdown", onUserGesture);
      document.removeEventListener("keydown", onUserGesture);
      void releaseLock();
    };
  }, [supported, enabled, requestLock, releaseLock]);

  return { supported, enabled, setEnabled };
}
