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
export const explorerEdges: ExplorerEdge[] = [...sysEdges, ...infraEdges];

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
      return TOOL_CATEGORIES.map((c) => ({ id: c.id, title: c.title, blurb: c.blurb, nodes: toolNodes.filter((t) => t.category === c.id).sort((a, b) => a.row - b.row) as ExplorerNode[] }));
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
  if (side === "top") return c === "process" ? "Documents and checks" : c === "tool" ? "Also used by" : "Related";
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
