import "@testing-library/jest-dom/vitest";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

// Framer Motion's `whileInView` relies on IntersectionObserver, which jsdom
// doesn't implement. Stub it so components mount without crashing in tests.
global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Node's own experimental `localStorage` global (unconfigured without
// --localstorage-file) shadows jsdom's implementation in this environment,
// leaving `window.localStorage` undefined. Polyfill it with an in-memory
// Storage so code that reads/writes localStorage (lib/theme.ts,
// lib/cookie-consent.ts) can be exercised in tests; real browsers are
// unaffected since they always provide a working localStorage natively.
if (typeof window !== "undefined" && !window.localStorage) {
  class MemoryStorage implements Storage {
    private store = new Map<string, string>();

    get length() {
      return this.store.size;
    }

    clear() {
      this.store.clear();
    }

    getItem(key: string) {
      return this.store.has(key) ? this.store.get(key)! : null;
    }

    key(index: number) {
      return Array.from(this.store.keys())[index] ?? null;
    }

    removeItem(key: string) {
      this.store.delete(key);
    }

    setItem(key: string, value: string) {
      this.store.set(key, String(value));
    }
  }

  Object.defineProperty(window, "localStorage", {
    value: new MemoryStorage(),
    configurable: true,
  });
}
