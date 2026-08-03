import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("CookieConsentBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.resetModules();
  });

  async function renderBanner() {
    const { CookieConsentBanner } = await import("@/components/ui/CookieConsentBanner");
    return render(<CookieConsentBanner />);
  }

  it("renders with Accept and Decline controls on first visit", async () => {
    await renderBanner();

    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decline/i })).toBeInTheDocument();
  });

  it("hides and persists the choice when Accept is clicked", async () => {
    const user = userEvent.setup();
    await renderBanner();

    await user.click(screen.getByRole("button", { name: /accept/i }));

    expect(screen.queryByRole("button", { name: /accept/i })).not.toBeInTheDocument();
    expect(window.localStorage.getItem("cookie-consent")).toBe("accepted");
  });

  it("hides and persists the choice when Decline is clicked", async () => {
    const user = userEvent.setup();
    await renderBanner();

    await user.click(screen.getByRole("button", { name: /decline/i }));

    expect(screen.queryByRole("button", { name: /decline/i })).not.toBeInTheDocument();
    expect(localStorage.getItem("cookie-consent")).toBe("declined");
  });
});
