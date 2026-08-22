import { describe, it, expect } from "vitest";
import { isNightTime, msUntilNextThemeBoundary } from "@/lib/theme";

describe("isNightTime", () => {
  it.each([
    [0, true],
    [6, true],
    [7, false],
    [12, false],
    [18, false],
    [19, true],
    [23, true],
  ])("hour %i -> night: %s", (hour, expected) => {
    const date = new Date(2026, 0, 1, hour, 0, 0);
    expect(isNightTime(date)).toBe(expected);
  });
});

describe("msUntilNextThemeBoundary", () => {
  it("counts forward to 7am when it's before 7am", () => {
    const date = new Date(2026, 0, 1, 3, 0, 0);
    expect(msUntilNextThemeBoundary(date)).toBe(4 * 60 * 60 * 1000);
  });

  it("counts forward to 7pm when it's between 7am and 7pm", () => {
    const date = new Date(2026, 0, 1, 12, 30, 0);
    expect(msUntilNextThemeBoundary(date)).toBe(6.5 * 60 * 60 * 1000);
  });

  it("rolls over to 7am the next day when it's after 7pm", () => {
    const date = new Date(2026, 0, 1, 23, 0, 0);
    const result = msUntilNextThemeBoundary(date);
    const expectedBoundary = new Date(2026, 0, 2, 7, 0, 0);
    expect(result).toBe(expectedBoundary.getTime() - date.getTime());
  });
});
