export type ConsentStatus = "accepted" | "declined" | null;

type Listener = () => void;
let listeners: Listener[] = [];
let currentStatus: ConsentStatus = null;
let initialized = false;

export function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

/**
 * localStorage can throw (private browsing lockdowns, strict cookie
 * policies, enterprise policies) — swallow that so a blocked read/write
 * can't take down the banner or leave the UI stuck open.
 */
function readStoredConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem("cookie-consent");
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function writeStoredConsent(value: ConsentStatus) {
  try {
    if (value) localStorage.setItem("cookie-consent", value);
  } catch {
    // Ignore — the in-memory status below still updates; it just won't persist.
  }
}

export function getSnapshot(): ConsentStatus {
  if (!initialized) {
    currentStatus = readStoredConsent();
    initialized = true;
  }
  return currentStatus;
}

export function getServerSnapshot(): ConsentStatus {
  return null;
}

export function setConsent(status: "accepted" | "declined") {
  currentStatus = status;
  initialized = true;
  writeStoredConsent(status);
  notify();
}
