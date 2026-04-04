import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { resetSearchRequestLog } from "./mocks/handlers";
import { server } from "./mocks/server";

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];

  disconnect() {}

  observe() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {}
}

class ResizeObserverMock implements ResizeObserver {
  disconnect() {}

  observe() {}

  unobserve() {}
}

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });

  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
  vi.stubGlobal("PointerEvent", MouseEvent);

  Object.defineProperty(window, "open", {
    writable: true,
    value: vi.fn(),
  });

  HTMLElement.prototype.scrollIntoView = vi.fn();

  if (!globalThis.crypto?.randomUUID) {
    vi.stubGlobal("crypto", {
      ...globalThis.crypto,
      randomUUID: () => "test-random-uuid",
    });
  }
});

beforeEach(() => {
  localStorage.clear();
  resetSearchRequestLog();
  window.history.pushState({}, "", "/");
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
