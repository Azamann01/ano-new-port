"use client";

import { useEffect } from "react";
import { applySystemPreference } from "@/lib/theme";

/**
 * Keeps the theme in sync with the OS-level preference in real time,
 * as long as the visitor hasn't manually overridden it via ThemeToggle.
 */
export function ThemeWatcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => applySystemPreference(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return null;
}
