import { DATASET, SOURCES, WEEKS } from "./dataset";
import { UPDATE_TARGET_HOURS, computeKpis } from "./kpis";

describe("analytics KPIs", () => {
  test("dataset is deterministic", () => {
    expect(DATASET.applications.length).toBeGreaterThan(400);
    expect(DATASET.applications[0].id).toBe("DEMO-APP-0001");
    expect(DATASET.applications.every((a) => a.id.startsWith("DEMO-"))).toBe(true);
  });

  test("received matches an independent count for the filter", () => {
    const k = computeKpis({ weeks: 8, source: "Referral" });
    const expected = DATASET.applications.filter((a) => a.week >= WEEKS - 8 && a.source === "Referral").length;
    expect(k.received).toBe(expected);
  });

  test("source rows add up to the card total", () => {
    const k = computeKpis({ weeks: 26, source: "all" });
    expect(k.bySource.reduce((s, r) => s + r.received, 0)).toBe(k.received);
    expect(k.bySource.map((r) => r.source)).toEqual([...SOURCES]);
  });

  test("missing update evidence is never counted as compliant", () => {
    const k = computeKpis({ weeks: 26, source: "all" });
    expect(k.withoutEvidence).toBeGreaterThan(0);
    expect(k.withEvidence + k.withoutEvidence).toBe(k.received);
    const manual = k.applications.filter((a) => a.hoursSinceUpdate !== null && a.hoursSinceUpdate <= UPDATE_TARGET_HOURS).length;
    expect(k.compliant).toBe(manual);
  });

  test("show-up excludes upcoming and unreadable waits stay in arrivals", () => {
    const k = computeKpis({ weeks: 26, source: "all" });
    expect(k.upcoming).toBeGreaterThan(0);
    expect(k.showUp).toBeCloseTo((k.arrived / (k.arrived + k.noEvidence)) * 100, 6);
    const banded = k.waitBands.reduce((s, b) => s + b.value, 0);
    expect(banded + k.unreadableWait).toBe(k.arrived);
  });

  test("funnel never increases and starts at the received count", () => {
    const k = computeKpis({ weeks: 13, source: "all" });
    expect(k.funnel[0].reached).toBe(k.received);
    for (let i = 1; i < k.funnel.length; i++) expect(k.funnel[i].reached).toBeLessThanOrEqual(k.funnel[i - 1].reached);
  });
});
