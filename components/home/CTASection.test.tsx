import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTASection } from "@/components/home/CTASection";

describe("CTASection", () => {
  it("falls back to Get in touch / contact while calendlyUrl is still a placeholder", () => {
    render(<CTASection />);

    const link = screen.getByRole("link", { name: /get in touch/i });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link).not.toHaveAttribute("target");
  });
});
