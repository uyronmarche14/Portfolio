import { axisRange, formatDuration, monthsBetween, toMonthIndex } from "./tenure";

describe("tenure helpers", () => {
  it("counts months inclusively", () => {
    expect(monthsBetween({ start: "2025-01", end: "2025-06" }, "2026-05")).toBe(6);
    expect(monthsBetween({ start: "2025-09", end: "2025-11" }, "2026-05")).toBe(3);
  });

  it("runs open-ended ranges until now", () => {
    expect(monthsBetween({ start: "2024-01", end: null }, "2026-05")).toBe(29);
  });

  it("formats durations", () => {
    expect(formatDuration(3)).toBe("3 mo");
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(29)).toBe("2 yrs 5 mo");
  });

  it("builds the axis from the earliest start to the latest end", () => {
    const axis = axisRange(
      [
        { start: "2024-01", end: null },
        { start: "2025-01", end: "2026-12" },
      ],
      "2026-05"
    );
    expect(axis.max - axis.min).toBe(35);
  });

  it("rejects invalid input", () => {
    expect(() => toMonthIndex("2025-13")).toThrow();
    expect(() => toMonthIndex("nope")).toThrow();
  });
});
