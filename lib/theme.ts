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

/** Manual override — persists across visits and wins over system preference. */
export function setDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
  notify();
}

/** Live sync with the OS preference, but only while no manual override is stored. */
export function applySystemPreference(prefersDark: boolean) {
  if (localStorage.getItem("theme")) return;
  document.documentElement.classList.toggle("dark", prefersDark);
  notify();
}
