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

    const { getByTestId } = await renderAnalytics();

    const script = getByTestId("plausible-script");
    expect(script).toHaveAttribute("src", "https://plausible.io/js/script.js");
    expect(script).toHaveAttribute("data-domain");
  });
});
