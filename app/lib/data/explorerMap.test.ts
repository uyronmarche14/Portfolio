import { EVIDENCE } from "./processMap";
import { explorerEdges, explorerIncident, explorerNodeById, explorerNodes, neighborhoodGroups, roadmapFor, scenariosFor, tabGroups, tabOf, type TabId } from "./explorerMap";
import { infraGroups, infraNodes } from "./infraMap";
import { artifactExamples, scenarioContent, stepContent } from "./systemContent";
import { toolNotes } from "./toolContent";
import { artifactNodes, processSysNodes, scenarios, sysNodes, toolNodes } from "./systemMap";

const LIST_TABS: TabId[] = ["process", "documents", "tools", "request", "delivery", "operations"];

describe("infrastructure map", () => {
  it("has unique ids that do not clash with the map graph", () => {
    const ids = [...sysNodes.map((n) => n.id), ...infraNodes.map((n) => n.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every node has evidence, why, how and a known group", () => {
    const groups = new Set(infraGroups.map((g) => g.id));
    infraNodes.forEach((n) => {
      expect(Object.keys(EVIDENCE)).toContain(n.evidence);
      expect(groups.has(n.group)).toBe(true);
      expect(n.why.length).toBeGreaterThan(20);
      expect(n.how.length).toBeGreaterThan(0);
    });
  });

  it("every link points at a real item, with a reason", () => {
    infraNodes.forEach((n) => n.links.forEach(([id, why]) => {
      expect({ from: n.id, to: id, ok: explorerNodeById.has(id) }).toEqual({ from: n.id, to: id, ok: true });
      expect(why.length).toBeGreaterThan(8);
    }));
  });

  it("chains are contiguous in order", () => {
    infraGroups.filter((g) => g.chain).forEach((g) => {
      const orders = infraNodes.filter((n) => n.group === g.id).map((n) => n.order).sort((a, b) => a - b);
      expect(orders).toEqual(orders.map((_, i) => i));
    });
  });

  it("everything with no evidence of use is labelled concept", () => {
    ["j-proxy", "j-cache", "r-registry", "o-monitor", "o-backup", "o-restore", "j-waf", "j-private", "o-trace", "o-rpo", "o-incident"].forEach((id) => expect(explorerNodeById.get(id)?.evidence).toBe("concept"));
  });

  it("never claims Kubernetes, Terraform or Helm, and names no employer applications", () => {
    const text = JSON.stringify(infraNodes).toLowerCase();
    ["kubernetes", "terraform", "helm"].forEach((w) => {
      infraNodes.forEach((n) => expect(n.title.toLowerCase().includes(w)).toBe(false));
      if (text.includes(w)) expect(text).toContain("not used");
    });
    ["iopex", "iopexforms", "admin_iopex", "hris", "iconnect", "cdr"].forEach((w) => expect(new RegExp(`\\b${w}\\b`).test(text)).toBe(false));
  });
});

describe("written content", () => {
  it("every process step has a why and an example", () => {
    processSysNodes.forEach((n) => {
      expect(stepContent[n.id]?.why.length).toBeGreaterThan(30);
      expect(stepContent[n.id]?.example.length).toBeGreaterThan(20);
    });
  });

  it("every document has an example", () => {
    artifactNodes.forEach((a) => expect(artifactExamples[a.id]?.length).toBeGreaterThan(15));
  });

  it("every step on every scenario path has a note, and nothing extra", () => {
    scenarios.forEach((s) => {
      const c = scenarioContent[s.id];
      expect(c.whenToUse.length).toBeGreaterThan(15);
      expect(c.outcome.length).toBeGreaterThan(15);
      expect(Object.keys(c.notes).sort()).toEqual([...s.path].sort());
    });
  });

  it("copy keeps employer names and the client framework name out", () => {
    const text = JSON.stringify([stepContent, artifactExamples, scenarioContent]).toLowerCase();
    ["iopex", "hris", "iconnect", "cdr", "rove"].forEach((w) => expect(new RegExp(`\\b${w}\\b`).test(text)).toBe(false));
  });
});

describe("explorer graph", () => {
  it("every edge connects two real items, and ids are unique", () => {
    expect(new Set(explorerEdges.map((e) => e.id)).size).toBe(explorerEdges.length);
    explorerEdges.forEach((e) => {
      expect({ id: e.id, from: explorerNodeById.has(e.from), to: explorerNodeById.has(e.to) }).toEqual({ id: e.id, from: true, to: true });
      expect(e.carries.length).toBeGreaterThan(2);
      expect(e.why.length).toBeGreaterThan(8);
    });
  });

  it("every item shows up in exactly one list tab", () => {
    const seen = new Map<string, number>();
    LIST_TABS.forEach((t) => tabGroups(t).forEach((g) => g.nodes.forEach((n) => seen.set(n.id, (seen.get(n.id) ?? 0) + 1))));
    explorerNodes.forEach((n) => expect({ id: n.id, count: seen.get(n.id) }).toEqual({ id: n.id, count: 1 }));
    explorerNodes.forEach((n) => expect(LIST_TABS).toContain(tabOf(n)));
  });

  it("the neighbourhood lists every connected item exactly once", () => {
    explorerNodes.forEach((n) => {
      const g = neighborhoodGroups(n.id);
      const listed = [...g.left, ...g.right, ...g.top, ...g.bottom].map((x) => x.node.id).sort();
      const expected = [...new Set(explorerIncident(n.id).map((e) => (e.from === n.id ? e.to : e.from)))].filter((x) => x !== n.id).sort();
      expect({ id: n.id, listed }).toEqual({ id: n.id, listed: expected });
    });
  });

  it("every step on a scenario path reports that scenario, with its note", () => {
    scenarios.forEach((s) => s.path.forEach((id) => {
      const hit = scenariosFor(id).find((a) => a.scenario.id === s.id);
      expect({ id, scenario: s.id, hit: Boolean(hit), direct: hit?.direct }).toEqual({ id, scenario: s.id, hit: true, direct: true });
      expect(hit!.note.length).toBeGreaterThan(10);
    }));
  });

  it("a tool or document reports the scenarios of the steps it is tied to", () => {
    const kpi = scenariosFor("a-kpi");
    expect(kpi.some((a) => a.scenario.id === "kpi")).toBe(true);
    expect(scenariosFor("t-excel").length).toBeGreaterThan(0);
  });
});

describe("roadmap", () => {
  it("every item has a roadmap, with a lit point or an across-the-flow marker", () => {
    explorerNodes.forEach((n) => {
      const r = roadmapFor(n.id);
      expect({ id: n.id, ok: Boolean(r) }).toEqual({ id: n.id, ok: true });
      expect({ id: n.id, lit: r!.points.some((p) => p.lit) || r!.across }).toEqual({ id: n.id, lit: true });
    });
  });

  it("a process step lights its own phase and marks it current", () => {
    const r = roadmapFor("m-workflow")!;
    expect(r.points).toHaveLength(7);
    const cur = r.points.filter((p) => p.current);
    expect(cur).toHaveLength(1);
    expect(cur[0].label).toBe("Model");
    expect(cur[0].items.map((i) => i.id)).toContain("m-workflow");
  });

  it("a production item sits on its own chain", () => {
    const r = roadmapFor("j-dns")!;
    expect(r.points.find((p) => p.current)?.id).toBe("j-dns");
    expect(roadmapFor("r-staging")!.points.find((p) => p.current)?.id).toBe("r-staging");
    expect(roadmapFor("o-health")!.points.some((p) => p.current)).toBe(false);
    expect(roadmapFor("o-logs")!.across).toBe(true);
  });
});

describe("tab groups", () => {
  it("group ids are unique inside each tab, so every section has its own anchor", () => {
    (["process", "documents", "tools", "request", "delivery", "operations"] as const).forEach((t) => {
      const ids = tabGroups(t).map((g) => g.id);
      expect({ tab: t, unique: new Set(ids).size === ids.length }).toEqual({ tab: t, unique: true });
    });
  });
});

describe("tool notes", () => {
  it("every tool says how it was used, what for, and what it connects to", () => {
    toolNodes.forEach((t) => {
      const n = toolNotes[t.id];
      expect({ id: t.id, has: Boolean(n) }).toEqual({ id: t.id, has: true });
      expect(n.how.length).toBeGreaterThan(40);
      expect(n.used.length).toBeGreaterThan(0);
      expect(n.with.length).toBeGreaterThan(0);
    });
  });

  it("every connected tool is real, is not the tool itself, and has a reason", () => {
    Object.entries(toolNotes).forEach(([id, n]) =>
      n.with.forEach(([other, how]) => {
        expect({ id, other, real: explorerNodeById.get(other)?.lane === "tool" }).toEqual({ id, other, real: true });
        expect(other).not.toBe(id);
        expect(how.length).toBeGreaterThan(10);
      })
    );
  });

  it("tools that were only explored or proposed say so instead of describing use", () => {
    toolNodes.filter((t) => t.evidence === "concept").forEach((t) => {
      expect({ id: t.id, honest: /explor|propos|not |only|experiment|unverified/i.test(toolNotes[t.id].how) }).toEqual({ id: t.id, honest: true });
    });
  });

  it("the notes keep employer application names out", () => {
    const text = JSON.stringify(toolNotes).toLowerCase();
    ["iopex", "hris", "iconnect", "cdr", "rove", "techskolar"].forEach((w) => expect(new RegExp(`\\b${w}\\b`).test(text)).toBe(false));
  });
});
