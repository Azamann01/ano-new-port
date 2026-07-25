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
