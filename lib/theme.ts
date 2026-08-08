type Listener = () => void;
let listeners: Listener[] = [];

export function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

export function getServerSnapshot() {
  return false;
}

function notify() {
  listeners.forEach((listener) => listener());
}

/**
 * localStorage can throw (private browsing lockdowns, strict cookie
 * policies, enterprise policies) — swallow that so a blocked read/write
 * can't take down the toggle or leave the UI desynced from the DOM class.
 */
function readStoredTheme(): string | null {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function writeStoredTheme(value: string) {
  try {
    localStorage.setItem("theme", value);
  } catch {
    // Ignore — the class still toggles below; it just won't persist.
  }
}

/** Manual override — persists across visits and wins over system preference. */
export function setDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  writeStoredTheme(dark ? "dark" : "light");
  notify();
}

/** 7pm–7am local time counts as "night" — matches THEME_INIT_SCRIPT in app/layout.tsx. */
export function isNightTime(date: Date = new Date()): boolean {
  const hour = date.getHours();
  return hour >= 19 || hour < 7;
}

/** Milliseconds until the next 7:00 or 19:00 boundary in local time. */
export function msUntilNextThemeBoundary(date: Date = new Date()): number {
  const hour = date.getHours();
  const next = new Date(date);

  if (hour < 7) {
    next.setHours(7, 0, 0, 0);
  } else if (hour < 19) {
    next.setHours(19, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(7, 0, 0, 0);
  }

  return next.getTime() - date.getTime();
}

/** Live sync with the visitor's local clock, but only while no manual override is stored. */
export function applyTimeBasedPreference() {
  if (readStoredTheme()) return;
  document.documentElement.classList.toggle("dark", isNightTime());
  notify();
}
