import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("dark"),
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
  writable: true,
  value: () => ({
    x: 0,
    y: 0,
    width: 800,
    height: 520,
    top: 0,
    left: 0,
    right: 800,
    bottom: 520,
    toJSON: () => ({}),
  }),
});
