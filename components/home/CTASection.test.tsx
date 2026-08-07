import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTASection } from "@/components/home/CTASection";
import { siteConfig } from "@/lib/site-config";

describe("CTASection", () => {
  it("links to Calendly now that a real calendlyUrl is configured", () => {
    render(<CTASection />);

    const link = screen.getByRole("link", { name: /book a call/i });
    expect(link).toHaveAttribute("href", siteConfig.calendlyUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
