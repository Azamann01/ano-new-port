import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import * as framerMotion from "framer-motion";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockUseReducedMotion = vi.mocked(framerMotion.useReducedMotion);

describe("AnimatedCard", () => {
  afterEach(() => {
    mockUseReducedMotion.mockReset();
  });

  it("renders its children", () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(<AnimatedCard>Card content</AnimatedCard>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies an initial hidden/offset style when motion is enabled", () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(<AnimatedCard>Animated</AnimatedCard>);
    const el = screen.getByText("Animated");

    expect(el).toHaveStyle({ opacity: "0" });
  });

  it("skips the animation when the user prefers reduced motion", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<AnimatedCard>Reduced</AnimatedCard>);
    const el = screen.getByText("Reduced");

    expect(el.style.opacity).toBe("");
  });

  it("passes a custom className through to the wrapper", () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(<AnimatedCard className="test-class">Styled</AnimatedCard>);
    expect(screen.getByText("Styled")).toHaveClass("test-class");
  });
});

describe("AnimatedSection", () => {
  afterEach(() => {
    mockUseReducedMotion.mockReset();
  });

  it("renders its children", () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(<AnimatedSection>Section content</AnimatedSection>);
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("skips the animation when the user prefers reduced motion", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<AnimatedSection>Reduced section</AnimatedSection>);
    const el = screen.getByText("Reduced section");

    expect(el.style.opacity).toBe("");
  });
});
