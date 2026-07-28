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

/** Live sync with the OS preference, but only while no manual override is stored. */
export function applySystemPreference(prefersDark: boolean) {
  if (readStoredTheme()) return;
  document.documentElement.classList.toggle("dark", prefersDark);
  notify();
}
