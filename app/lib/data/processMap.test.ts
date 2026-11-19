import { edges, nodes, resolvedNodes, scenarios, stages } from "./processMap";
import { processSteps } from "./process";

const ids = new Set(nodes.map((n) => n.id));
const hasEdge = (a: string, b: string) => edges.some((x) => x.from === a && x.to === b);

describe("process map data", () => {
  it("has unique node ids and known stages", () => {
    expect(ids.size).toBe(nodes.length);
    const stageIds = new Set(stages.map((s) => s.id));
    nodes.forEach((n) => expect(stageIds.has(n.stage)).toBe(true));
  });

  it("every edge connects two real nodes, and ids are unique", () => {
    edges.forEach((e) => {
      expect(ids.has(e.from)).toBe(true);
      expect(ids.has(e.to)).toBe(true);
    });
    expect(new Set(edges.map((e) => e.id)).size).toBe(edges.length);
  });

  it("every node is connected to the map", () => {
    nodes.forEach((n) => expect(edges.some((e) => e.from === n.id || e.to === n.id)).toBe(true));
  });

  it("each of the 12 planning phases is mapped exactly once", () => {
    const used = nodes.flatMap((n) => (n.stepId ? [n.stepId] : []));
    expect([...used].sort((a, b) => Number(a) - Number(b))).toEqual(processSteps.map((s) => s.id));
  });

  it("every scenario path walks real edges", () => {
    scenarios.forEach((s) => {
      expect(s.path.length).toBeGreaterThan(2);
      s.path.forEach((id) => expect(ids.has(id)).toBe(true));
      for (let i = 1; i < s.path.length; i++) {
        expect({ s: s.id, edge: hasEdge(s.path[i - 1], s.path[i]) }).toEqual({ s: s.id, edge: true });
      }
    });
  });

  it("no two nodes share a slot in the same stage column", () => {
    const seen = new Set<string>();
    nodes.forEach((n) => {
      const key = `${n.stage}:${n.row}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    });
  });

  it("resolved nodes all have a title, a summary and at least one detail", () => {
    resolvedNodes.forEach((n) => {
      expect(n.title.length).toBeGreaterThan(0);
      expect(n.summary.length).toBeGreaterThan(0);
      expect(n.details.length).toBeGreaterThan(0);
    });
  });

  it("keeps employer app names and client names out of the text", () => {
    const text = JSON.stringify(resolvedNodes).toLowerCase();
    ["hris", "iconnect", "cdr", "rove"].forEach((word) => expect(new RegExp(`\\b${word}\\b`).test(text)).toBe(false));
  });
});
