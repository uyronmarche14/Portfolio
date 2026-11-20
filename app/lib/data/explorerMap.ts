import { buildInfraEdges, infraGroups, infraNodeById, infraNodes, type InfraNode } from "./infraMap";
import {
  TOOL_CATEGORIES,
  artifactNodes,
  pipelineNodes,
  processSysNodes,
  scenarios,
  stages,
  sysEdges,
  sysNodeById,
  sysNodes,
  toolNodes,
  type EdgeKind,
  type Evidence,
  type Scenario,
  type SeenIn,
  type SysNode,
} from "./systemMap";
import { scenarioContent } from "./systemContent";
import { toolNotes } from "./toolContent";

/**
 * The explorer graph: the four map lanes (steps, documents, tools, this site's pipeline) plus the production lanes (request path,
 * release flow, operations). Everything the tabbed page and its sheet need to know about any item: which tab it lives in, what it
 * connects to, and which scenarios it appears in.
 */

export type TabId = "process" | "scenarios" | "documents" | "tools" | "request" | "delivery" | "operations" | "map";
export type ExplorerNode = SysNode | InfraNode;
export type ExplorerEdgeKind = EdgeKind | "journey" | "chain" | "relates";

export interface ExplorerEdge {
  id: string;
  from: string;
  to: string;
  kind: ExplorerEdgeKind;
  label?: string;
  carries: string;
  why: string;
}

export const explorerNodes: ExplorerNode[] = [...sysNodes, ...infraNodes];
export const explorerNodeById = new Map<string, ExplorerNode>(explorerNodes.map((n) => [n.id, n]));

const infraEdges: ExplorerEdge[] = buildInfraEdges();
// tools that were used together, from the notes written for each tool (one edge per pair)
const toolEdges: ExplorerEdge[] = (() => {
  const seen = new Set<string>();
  const out: ExplorerEdge[] = [];
  Object.entries(toolNotes).forEach(([a, note]) =>
    note.with.forEach(([b, how]) => {
      const key = [a, b].sort().join("~");
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ id: `${a}~${b}`, from: a, to: b, kind: "relates", carries: "Used together", why: how });
    })
  );
  return out;
})();

export const explorerEdges: ExplorerEdge[] = [...sysEdges, ...infraEdges, ...toolEdges];

export const explorerIncident = (id: string): ExplorerEdge[] => explorerEdges.filter((e) => e.from === id || e.to === id);

export const TABS: { id: TabId; label: string; production?: boolean }[] = [
  { id: "process", label: "Process" },
  { id: "scenarios", label: "Scenarios" },
  { id: "documents", label: "Documents" },
  { id: "tools", label: "Tools" },
  { id: "request", label: "Request path", production: true },
  { id: "delivery", label: "Delivery", production: true },
  { id: "operations", label: "Operations", production: true },
  { id: "map", label: "Map" },
];

/** Which tab an item lives in. */
export function tabOf(n: ExplorerNode): TabId {
  switch (n.lane) {
    case "process":
      return "process";
    case "artifact":
      return "documents";
    case "tool":
      return "tools";
    case "pipeline":
      return "delivery";
    case "journey":
      return "request";
    case "release":
      return "delivery";
    case "ops":
      return "operations";
    case "code":
      return "tools";
  }
}

export interface TabGroup {
  id: string;
  title: string;
  blurb?: string;
  nodes: ExplorerNode[];
}

/** The grouped index shown in each list tab. */
export function tabGroups(tab: TabId): TabGroup[] {
  switch (tab) {
    case "process":
      return stages.map((s, i) => ({ id: s.id, title: `${String(i + 1).padStart(2, "0")}  ${s.title}`, blurb: s.blurb, nodes: processSysNodes.filter((n) => n.stage === s.id).sort((a, b) => a.row - b.row) }));
    case "documents":
      return stages
        .map((s, i) => ({ id: s.id, title: `${String(i + 1).padStart(2, "0")}  ${s.title}`, nodes: artifactNodes.filter((a) => a.stage === s.id).sort((a, b) => a.row - b.row) as ExplorerNode[] }))
        .filter((g) => g.nodes.length > 0);
    case "tools":
      return [
        ...TOOL_CATEGORIES.map((c) => ({ id: c.id, title: c.title, blurb: c.blurb, nodes: toolNodes.filter((t) => t.category === c.id).sort((a, b) => a.row - b.row) as ExplorerNode[] })),
        // the engineering practices sit with the tech stack they are done in
        ...infraGroups.filter((g) => g.lane === "code").map((g) => ({ id: `practice-${g.id}`, title: `In practice: ${g.title}`, blurb: g.blurb, nodes: infraNodes.filter((x) => x.group === g.id) as ExplorerNode[] })),
      ];
    case "request":
    case "operations": {
      const lane = tab === "request" ? "journey" : "ops";
      return infraGroups.filter((g) => g.lane === lane).map((g) => ({ id: g.id, title: g.title, blurb: g.blurb, nodes: infraNodes.filter((x) => x.group === g.id).sort((a, b) => a.order - b.order) as ExplorerNode[] }));
    }
    case "delivery":
      return [
        { id: "site", title: "This site's pipeline", blurb: "The CI workflow of this repository. Hosting is a target; nothing is deployed from here yet.", nodes: pipelineNodes as ExplorerNode[] },
        ...infraGroups.filter((g) => g.lane === "release").map((g) => ({ id: g.id, title: `A full release: ${g.title.toLowerCase()}`, blurb: g.blurb, nodes: infraNodes.filter((x) => x.group === g.id).sort((a, b) => a.order - b.order) as ExplorerNode[] })),
      ];
    default:
      return [];
  }
}

export type Side = "left" | "right" | "top" | "bottom";

/** The connected items of `id`, grouped by side for the neighbourhood diagram: before, after, related steps and documents, tools. */
export function neighborhoodGroups(id: string): Record<Side, { node: ExplorerNode; edge: ExplorerEdge }[]> {
  const center = explorerNodeById.get(id)!;
  const out: Record<Side, { node: ExplorerNode; edge: ExplorerEdge }[]> = { left: [], right: [], top: [], bottom: [] };
  const seen = new Set<string>([id]);
  explorerIncident(id).forEach((edge) => {
    const outgoing = edge.from === id;
    const other = explorerNodeById.get(outgoing ? edge.to : edge.from)!;
    if (seen.has(other.id)) return;
    seen.add(other.id);
    let side: Side;
    if (other.lane === "tool") side = center.lane === "tool" ? "top" : "bottom";
    else if (center.lane === "tool") side = "left";
    else if (edge.kind === "relates") side = "top";
    else if (center.lane === "process" && other.lane !== "process") side = "top";
    else side = outgoing ? "right" : "left";
    out[side].push({ node: other, edge });
  });
  return out;
}

export const sideCaption = (center: ExplorerNode, side: Side): string => {
  const c = center.lane;
  if (side === "left") return c === "artifact" ? "Produced by" : c === "tool" ? "Used in" : "Comes before";
  if (side === "right") return c === "artifact" ? "Needed by" : "Leads to";
  if (side === "top") return c === "process" ? "Documents and checks" : c === "tool" ? "Used together with" : "Related";
  return "Tools";
};

/** The process steps an item is tied to, used to find the scenarios it takes part in. */
export function relatedStepIds(id: string): string[] {
  const n = explorerNodeById.get(id);
  if (!n) return [];
  if (n.lane === "process") return [id];
  const ids = new Set<string>();
  if (n.lane === "artifact") [...n.producedBy, ...n.usedBy].forEach((x) => ids.add(x));
  if (n.lane === "tool") n.usedIn.forEach((x) => ids.add(x));
  explorerIncident(id).forEach((e) => {
    const other = e.from === id ? e.to : e.from;
    if (explorerNodeById.get(other)?.lane === "process") ids.add(other);
  });
  return [...ids].filter((x) => explorerNodeById.get(x)?.lane === "process");
}

export interface ScenarioAppearance {
  scenario: Scenario;
  /** the steps of this scenario's path that tie to the item, in path order */
  steps: string[];
  /** true when the item itself is on the path */
  direct: boolean;
  note: string;
}

/** Every scenario an item appears in, directly or through the steps it is tied to, with the note for that step in that scenario. */
export function scenariosFor(id: string): ScenarioAppearance[] {
  const rel = relatedStepIds(id);
  const out: ScenarioAppearance[] = [];
  scenarios.forEach((s) => {
    const steps = s.path.filter((p) => rel.includes(p));
    if (!steps.length) return;
    const direct = s.path.includes(id);
    const notes = scenarioContent[s.id]?.notes ?? {};
    out.push({ scenario: s, steps, direct, note: notes[direct ? id : steps[0]] ?? "" });
  });
  return out;
}

export const evidenceOf = (n: ExplorerNode): Evidence => n.evidence;
export const seenInOf = (n: ExplorerNode): SeenIn[] => n.seenIn;
export { infraNodeById, sysNodeById };

export interface RoadmapPoint {
  id: string;
  label: string;
  /** where clicking the point goes */
  href: string;
  /** this point is where the item lives or is used */
  lit: boolean;
  /** this point is the item itself (or the phase of the step itself) */
  current: boolean;
  /** the related steps or items that make the point lit, shown under it */
  items: { id: string; title: string }[];
}

export interface Roadmap {
  title: string;
  caption: string;
  /** the item applies to the whole flow rather than one point */
  across: boolean;
  points: RoadmapPoint[];
}

const chainOf = (groupIds: string[]) =>
  infraGroups
    .filter((g) => groupIds.includes(g.id))
    .sort((a, b) => groupIds.indexOf(a.id) - groupIds.indexOf(b.id))
    .flatMap((g) => infraNodes.filter((x) => x.group === g.id).sort((a, b) => a.order - b.order));

const REQUEST_CHAIN = ["visit"];
const RELEASE_CHAIN = ["integrate", "ship"];

function chainRoadmap(id: string, groups: string[], title: string, caption: string): Roadmap {
  const n = explorerNodeById.get(id)!;
  const chain = chainOf(groups);
  const linked = new Set(explorerIncident(id).map((e) => (e.from === id ? e.to : e.from)));
  const points = chain.map((c) => ({ id: c.id, label: c.title, href: `/process/${c.id}`, lit: c.id === id || linked.has(c.id), current: c.id === id, items: [] as { id: string; title: string }[] }));
  // an item that sits beside the chain (monitoring, caching, security headers) applies to the whole flow rather than one point
  return { title, caption: points.some((p) => p.lit) ? caption : `${caption} ${n.title} applies across the whole flow.`, across: !points.some((p) => p.lit), points };
}

/**
 * A sample roadmap for one item: the seven phases for steps and documents (lit where the item shows up), or the request path /
 * release chain for production items, hosting tools and pipeline items (lit where the item sits or what it is linked to).
 */
export function roadmapFor(id: string): Roadmap | null {
  const n = explorerNodeById.get(id);
  if (!n) return null;

  if (n.lane === "journey") return chainRoadmap(id, REQUEST_CHAIN, "Where it sits on the request path", "A visitor's request, from the browser to the data.");
  if (n.lane === "release" || n.lane === "ops") return chainRoadmap(id, RELEASE_CHAIN, "Where it sits in a release", "A change, from pull request to production.");

  const rel = new Set(relatedStepIds(id));
  const phases: Roadmap = {
    title: n.lane === "process" ? "Where it sits in the process" : "Where it shows up in the process",
    caption: "The seven phases of how a request becomes a trusted change.",
    across: false,
    points: stages.map((s) => {
      const steps = processSysNodes.filter((p) => p.stage === s.id && rel.has(p.id));
      return { id: s.id, label: s.title, href: `/process#grp-${s.id}`, lit: steps.length > 0, current: n.lane === "process" && n.stage === s.id, items: steps.map((p) => ({ id: p.id, title: p.title })) };
    }),
  };
  if (phases.points.some((p) => p.lit)) return phases;

  // hosting tools and CI-only pipeline items are not tied to a phase: show them on the production chain they belong to
  const linked = explorerIncident(id).map((e) => (e.from === id ? e.to : e.from));
  const onRequest = linked.filter((x) => chainOf(REQUEST_CHAIN).some((c) => c.id === x)).length;
  const onRelease = linked.filter((x) => chainOf(RELEASE_CHAIN).some((c) => c.id === x)).length;
  return onRequest > onRelease
    ? chainRoadmap(id, REQUEST_CHAIN, "Where it shows up on the request path", "A visitor's request, from the browser to the data.")
    : chainRoadmap(id, RELEASE_CHAIN, "Where it shows up in a release", "A change, from pull request to production.");
}
