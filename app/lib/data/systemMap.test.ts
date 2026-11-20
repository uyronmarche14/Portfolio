import { readFileSync } from "node:fs";
import { join } from "node:path";

import { EVIDENCE } from "./processMap";
import {
  artifactNodes,
  artifactsForPath,
  egoCaptions,
  egoGroups,
  egoLayout,
  focusSet,
  incident,
  layout,
  pipelineNodes,
  processSysNodes,
  scenarios,
  sysEdges,
  sysNodeById,
  sysNodes,
  toolNodes,
  toolsForPath,
  TOOL_CATEGORIES,
} from "./systemMap";
import { projects } from "./projects";
import { hasTech } from "./techStack";

const ids = new Set(sysNodes.map((n) => n.id));

describe("system map graph", () => {
  it("has unique node ids across all four lanes", () => {
    expect(ids.size).toBe(sysNodes.length);
  });

  it("has unique edge ids and every edge connects two real nodes", () => {
    expect(new Set(sysEdges.map((e) => e.id)).size).toBe(sysEdges.length);
    sysEdges.forEach((e) => {
      expect({ id: e.id, from: ids.has(e.from), to: ids.has(e.to) }).toEqual({ id: e.id, from: true, to: true });
    });
  });

  it("every link says what it carries and why", () => {
    sysEdges.forEach((e) => {
      expect(e.carries.length).toBeGreaterThan(2);
      expect(e.why.length).toBeGreaterThan(10);
    });
  });

  it("every process link has a written carries text, not the fallback", () => {
    sysEdges.filter((e) => e.kind === "flow" || e.kind === "loop").forEach((e) => expect(e.carries).not.toBe("The output of the step"));
  });

  it("every node has an evidence level and a title", () => {
    sysNodes.forEach((n) => {
      expect(Object.keys(EVIDENCE)).toContain(n.evidence);
      expect(n.title.length).toBeGreaterThan(1);
    });
  });
});

describe("artifacts", () => {
  it("are produced by at least one real step and only reference real steps", () => {
    const stepIds = new Set(processSysNodes.map((n) => n.id));
    artifactNodes.forEach((a) => {
      expect(a.producedBy.length).toBeGreaterThan(0);
      [...a.producedBy, ...a.usedBy].forEach((s) => expect(stepIds.has(s)).toBe(true));
      expect(a.contains.length).toBeGreaterThan(1);
    });
  });

  it("do not share a slot in a stage column", () => {
    const seen = new Set<string>();
    artifactNodes.forEach((a) => {
      const key = `${a.stage}:${a.row}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
    });
  });
});

describe("tools", () => {
  it("are used somewhere, and only point at real steps or pipeline nodes", () => {
    toolNodes.forEach((t) => {
      expect(t.usedIn.length).toBeGreaterThan(0);
      t.usedIn.forEach((u) => expect(ids.has(u)).toBe(true));
    });
  });

  it("use a known category, have their own row in it, and a known icon key when one is given", () => {
    const cats = new Set(TOOL_CATEGORIES.map((c) => c.id));
    const seen = new Set<string>();
    toolNodes.forEach((t) => {
      expect(cats.has(t.category)).toBe(true);
      const key = `${t.category}:${t.row}`;
      expect(seen.has(key)).toBe(false);
      seen.add(key);
      if (t.tech) expect(hasTech(t.tech)).toBe(true);
    });
  });

  it("every technology listed on a project in projects.ts is on the map", () => {
    const covered = new Set(toolNodes.flatMap((t) => t.techNames ?? []));
    const missing = [...new Set(projects.flatMap((p) => p.technologies))].filter((name) => !covered.has(name));
    expect(missing).toEqual([]);
  });

  it("a tool that names project technologies is really used by a project, and is not marked concept", () => {
    toolNodes.filter((t) => t.techNames).forEach((t) => {
      const used = projects.some((p) => p.technologies.some((x) => t.techNames!.includes(x)));
      expect({ id: t.id, used }).toEqual({ id: t.id, used: true });
      expect(["built", "practiced"]).toContain(t.evidence);
      expect(t.seenIn.length).toBeGreaterThan(0);
    });
  });

  it("proposed or unproven items are labelled concept", () => {
    const byId = new Map(toolNodes.map((t) => [t.id, t]));
    ["t-homelab", "t-mcp", "t-pq", "t-rag", "t-imu", "t-gps", "t-game"].forEach((id) => expect(byId.get(id)?.evidence).toBe("concept"));
  });
});

describe("delivery pipeline", () => {
  it("is a single ordered chain", () => {
    expect(pipelineNodes.map((p) => p.col)).toEqual(pipelineNodes.map((_, i) => i));
    expect(sysEdges.filter((e) => e.kind === "pipeline").length).toBe(pipelineNodes.length - 1);
  });

  it("uses the real commands from the CI workflow", () => {
    const yml = readFileSync(join(process.cwd(), ".github/workflows/quality-check.yml"), "utf8");
    ["bun install --frozen-lockfile", "bun run typecheck", "bun run lint", "bun run format:check", "bun run test:ci", "bun run build"].forEach((cmd) => {
      expect(yml).toContain(cmd);
      expect(pipelineNodes.some((p) => p.command === cmd)).toBe(true);
    });
  });

  it("states where the build settings live instead of implying a config file", () => {
    const host = pipelineNodes.find((p) => p.id === "p-host");
    expect(host?.evidence).toBe("built");
    expect(host?.summary.toLowerCase()).toContain("dashboard");
    expect(host?.summary.toLowerCase()).toContain("not in this repository");
  });
});

describe("layout", () => {
  it("never overlaps two nodes in the same lane", () => {
    const byLane = new Map<string, ReturnType<typeof layout>[]>();
    sysNodes.forEach((n) => byLane.set(n.lane, [...(byLane.get(n.lane) ?? []), layout(n)]));
    byLane.forEach((boxes, lane) => {
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i];
          const b = boxes[j];
          const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
          expect({ lane, i, j, overlap }).toEqual({ lane, i, j, overlap: false });
        }
      }
    });
  });
});

describe("helpers and content guardrails", () => {
  it("focusSet returns the node, its neighbours and the links between them", () => {
    const f = focusSet("s-ac");
    expect(f.nodes.has("s-ac")).toBe(true);
    expect(f.nodes.has("a-kpi")).toBe(true);
    expect(f.edges.size).toBe(incident("s-ac").length);
  });

  it("path helpers return tools and documents for a scenario", () => {
    const kpi = scenarios.find((s) => s.id === "kpi")!;
    expect(toolsForPath(kpi.path).length).toBeGreaterThan(3);
    expect(artifactsForPath(kpi.path).some((a) => a.id === "a-kpi")).toBe(true);
    expect(sysNodeById.get("a-kpi")?.lane).toBe("artifact");
  });

  it("keeps employer application names and the client framework name out of the text", () => {
    const text = JSON.stringify([sysNodes, sysEdges]).toLowerCase();
    ["hris", "iconnect", "cdr", "rove"].forEach((w) => expect(new RegExp(`\\b${w}\\b`).test(text)).toBe(false));
  });
});

describe("ego layout (selected node and its connections)", () => {
  it("places the node and every connected node, once, for every node in the graph", () => {
    sysNodes.forEach((n) => {
      const boxes = egoLayout(n.id);
      const expected = new Set<string>([n.id]);
      incident(n.id).forEach((e) => expected.add(e.from === n.id ? e.to : e.from));
      expect({ id: n.id, ids: [...boxes.keys()].sort() }).toEqual({ id: n.id, ids: [...expected].sort() });
    });
  });

  it("keeps the selected node where it is", () => {
    sysNodes.forEach((n) => expect(egoLayout(n.id).get(n.id)).toEqual(layout(n)));
  });

  it("never overlaps two nodes", () => {
    sysNodes.forEach((n) => {
      const boxes = [...egoLayout(n.id).entries()];
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i][1];
          const b = boxes[j][1];
          const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
          expect({ center: n.id, a: boxes[i][0], b: boxes[j][0], overlap }).toEqual({ center: n.id, a: boxes[i][0], b: boxes[j][0], overlap: false });
        }
      }
    });
  });

  it("puts earlier steps left, later steps right, documents above and tools below a step", () => {
    const g = egoGroups("s-ac");
    expect(g.left.some((x) => x.id === "s-req")).toBe(true);
    expect(g.right.some((x) => x.id === "s-gate")).toBe(true);
    expect(g.top.some((x) => x.id === "a-kpi")).toBe(true);
    expect(g.bottom.some((x) => x.id === "t-excel")).toBe(true);
  });
});

describe("ego captions", () => {
  it("label every non-empty side of a selection, and never sit on top of a node", () => {
    sysNodes.forEach((n) => {
      const boxes = [...egoLayout(n.id).values()];
      const caps = egoCaptions(n.id);
      const groups = egoGroups(n.id);
      const labelled = (["left", "right", "top", "bottom"] as const).filter((k) => groups[k].length > 0).length;
      expect({ id: n.id, captions: caps.length }).toEqual({ id: n.id, captions: labelled });
      caps.forEach((c) => {
        const r = { x: c.x, y: c.y, w: 150, h: 18 };
        boxes.forEach((b) => {
          const overlap = r.x < b.x + b.w && b.x < r.x + r.w && r.y < b.y + b.h && b.y < r.y + r.h;
          expect({ center: n.id, caption: c.id, overlap }).toEqual({ center: n.id, caption: c.id, overlap: false });
        });
      });
    });
  });
});
