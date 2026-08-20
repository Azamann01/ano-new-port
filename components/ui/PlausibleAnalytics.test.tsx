import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";

// next/script defers actual DOM insertion to Next's runtime script loader,
// which doesn't run in jsdom — mock it so the test verifies our own
// consent-gating logic and props, not Next's script-loading internals.
vi.mock("next/script", () => ({
  default: (props: Record<string, unknown>) => <script data-testid="plausible-script" {...props} />,
}));

describe("PlausibleAnalytics", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.resetModules();
  });

  async function renderAnalytics() {
    const { PlausibleAnalytics } = await import("@/components/ui/PlausibleAnalytics");
    return render(<PlausibleAnalytics />);
  }

  it("renders nothing when no consent choice has been made", async () => {
    const { container } = await renderAnalytics();

    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing when the visitor declined", async () => {
    window.localStorage.setItem("cookie-consent", "declined");

    const { container } = await renderAnalytics();

    expect(container).toBeEmptyDOMElement();
  });

  it("loads the Plausible script once the visitor accepted", async () => {
    window.localStorage.setItem("cookie-consent", "accepted");

    await renderAnalytics();

    // React hoists the async src="..." script to document.head as a
    // resource, so it won't show up inside the render container — query the
    // whole document instead.
    const scripts = document.querySelectorAll('[data-testid="plausible-script"]');
    expect(scripts).toHaveLength(2);
    expect(
      Array.from(scripts).some(
        (s) => s.getAttribute("src") === "https://plausible.io/js/pa-0fR4zxGA8QGKM4bJEWuLk.js"
      )
    ).toBe(true);
    expect(
      Array.from(scripts).some((s) => s.textContent?.includes("plausible.init()"))
    ).toBe(true);
  });
});
