import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InterviewCTA } from "@/components/contact/InterviewCTA";
import { siteConfig } from "@/lib/site-config";

describe("InterviewCTA", () => {
  it("links to Calendly now that a real calendlyUrl is configured", () => {
    render(<InterviewCTA />);

    const link = screen.getByRole("link", { name: /book free consultation/i });
    expect(link).toHaveAttribute("href", siteConfig.calendlyUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
