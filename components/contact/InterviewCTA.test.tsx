import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InterviewCTA } from "@/components/contact/InterviewCTA";

describe("InterviewCTA", () => {
  it("renders nothing while calendlyUrl is still a placeholder", () => {
    const { container } = render(<InterviewCTA />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText(/prefer to talk instead/i)).not.toBeInTheDocument();
  });
});
