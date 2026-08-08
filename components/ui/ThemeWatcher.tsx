"use client";

import { useEffect } from "react";
import { applyTimeBasedPreference, msUntilNextThemeBoundary } from "@/lib/theme";

/**
 * Keeps the theme in sync with the visitor's local clock (dark 7pm–7am,
 * light 7am–7pm), as long as they haven't manually overridden it via
 * ThemeToggle. Schedules a single timeout for the exact next boundary
 * crossing rather than polling, then reschedules after each one fires —
 * so a tab left open across 7am/7pm still flips automatically.
 */
export function ThemeWatcher() {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      timeoutId = setTimeout(() => {
        applyTimeBasedPreference();
        scheduleNext();
      }, msUntilNextThemeBoundary());
    }

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
