"use client";

import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

import {
  EVIDENCE,
  LANES,
  TOOL_CATEGORIES,
  artifactNodes,
  incident,
  pipelineNodes,
  sysEdges,
  sysNodeById,
  sysNodes,
  toolNodes,
  type ArtifactNode,
  type EdgeKind,
  type Lane,
  type PipelineNode,
  type SysEdge,
  type SysNode,
  type ToolNode,
} from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "./evidence";
import { EvidenceChip, ProcessDetailBody } from "./ProcessDetail";

const H = "font-mono text-xs text-primary";
const CHIP =
  "rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export const LANE_TAG: Record<Lane, string> = { process: "Step", artifact: "Document", tool: "Tool", pipeline: "Pipeline" };

export const EDGE_KIND: Record<EdgeKind, { label: string; note: string }> = {
  flow: { label: "Hand-over", note: "One step hands its output to the next." },
  loop: { label: "Return loop", note: "Work goes back to an earlier step. The process is not a straight line." },
  produces: { label: "Produces", note: "A step produces a document or data." },
  feeds: { label: "Feeds", note: "A document or data is needed by a later step." },
  uses: { label: "Tool support", note: "A step uses a tool." },
  pipeline: { label: "Pipeline order", note: "Checks run in order, and a failure stops what follows." },
  checks: { label: "Check", note: "An automated check supports a step." },
};

interface Related {
  group: string;
  other: SysNode;
  edge: SysEdge;
}

/** Connections of a node, grouped by what they mean for that node. Process-to-process links are covered by ProcessDetailBody. */
function relatedTo(node: SysNode): Related[] {
  const out: Related[] = [];
  incident(node.id).forEach((edge) => {
    const outgoing = edge.from === node.id;
    const other = sysNodeById.get(outgoing ? edge.to : edge.from)!;
    let group: string | null = null;
    if (node.lane === "process") {
      if (edge.kind === "produces" && outgoing) group = "Produces";
      else if (edge.kind === "feeds" && !outgoing) group = "Needs";
      else if (edge.kind === "uses" && outgoing) group = "Tools used";
      else if (edge.kind === "checks" && !outgoing) group = "Checked by";
    } else if (node.lane === "artifact") {
      if (edge.kind === "produces" && !outgoing) group = "Produced by";
      else if (edge.kind === "feeds" && outgoing) group = "Needed by";
    } else if (node.lane === "tool") {
      if (edge.kind === "uses" && !outgoing) group = "Used in";
    } else {
      if (edge.kind === "pipeline") group = outgoing ? "Leads to" : "Comes after";
      else if (edge.kind === "uses" && !outgoing) group = "Tools";
      else if (edge.kind === "checks" && outgoing) group = "Supports";
    }
    if (group) out.push({ group, other, edge });
  });
  return out;
}

export function Connections({ node, onNode, onEdge }: { node: SysNode; onNode: (id: string) => void; onEdge: (id: string) => void }) {
  const rel = relatedTo(node);
  if (rel.length === 0) return null;
  const groups = Array.from(new Set(rel.map((r) => r.group)));
  return (
    <div className="mt-6 space-y-5 border-t border-foreground/10 pt-5">
      {groups.map((g) => (
        <div key={g}>
          <h4 className="font-mono text-xs text-foreground/55">{g}</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {rel
              .filter((r) => r.group === g)
              .map((r) => (
                <li key={r.edge.id} className="flex items-center gap-1">
                  <button type="button" onClick={() => onNode(r.other.id)} title={`${r.edge.carries}: ${r.edge.why}`} className={CHIP}>
                    <span className="mr-1.5 font-mono text-[10px] uppercase text-foreground/45">{LANE_TAG[r.other.lane]}</span>
                    {r.other.title}
                  </button>
                  <button type="button" onClick={() => onEdge(r.edge.id)} aria-label={`About the link to ${r.other.title}`} className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-foreground/55 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Info aria-hidden="true" className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SeenIn({ items }: { items: { label: string; href: string }[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <h4 className={cn(H, "mt-6")}>See it in my work</h4>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className={cn(CHIP, "inline-flex items-center gap-1")}>
              {s.label}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const Header = ({ lane, extra, evidence, title, summary }: { lane: Lane; extra?: string; evidence: SysNode["evidence"]; title: string; summary: string }) => (
  <>
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">{LANE_TAG[lane]}</span>
      {extra && <span className="font-mono text-[11px] text-foreground/55">{extra}</span>}
      <EvidenceChip evidence={evidence} />
    </div>
    <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground sm:text-3xl">{title}</h3>
    <p className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-foreground/75">{summary}</p>
  </>
);

function ArtifactBody({ node }: { node: ArtifactNode }) {
  return (
    <>
      <Header lane="artifact" extra="Produces data or a document" evidence={node.evidence} title={node.title} summary={node.summary} />
      <h4 className={cn(H, "mt-6")}>What it contains</h4>
      <ul className="mt-2 divide-y divide-foreground/10 border-y border-foreground/10">
        {node.contains.map((c) => (
          <li key={c} className="flex gap-3 py-2 text-sm text-foreground/80">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {c}
          </li>
        ))}
      </ul>
    </>
  );
}

function ToolBody({ node }: { node: ToolNode }) {
  const cat = TOOL_CATEGORIES.find((c) => c.id === node.category);
  return (
    <>
      <Header lane="tool" extra={cat?.title} evidence={node.evidence} title={node.title} summary={node.summary} />
      <p className="mt-4 rounded-md border border-foreground/15 bg-foreground/[0.04] px-3 py-2 text-xs text-foreground/65">
        <span className="font-mono text-foreground/85">{EVIDENCE[node.evidence].label}:</span> {EVIDENCE[node.evidence].note} Listing a tool is not a claim of mastery.
      </p>
    </>
  );
}

function PipelineBody({ node }: { node: PipelineNode }) {
  return (
    <>
      <Header lane="pipeline" extra={`Step ${node.col + 1} of ${pipelineNodes.length}`} evidence={node.evidence} title={node.title} summary={node.summary} />
      {node.command && <pre className="mt-4 overflow-x-auto rounded-md border border-foreground/15 bg-foreground/[0.05] px-3 py-2 font-mono text-xs text-foreground/85">{node.command}</pre>}
      <h4 className={cn(H, "mt-6")}>What it checks</h4>
      <ul className="mt-2 divide-y divide-foreground/10 border-y border-foreground/10">
        {node.checks.map((c) => (
          <li key={c} className="flex gap-3 py-2 text-sm text-foreground/80">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {c}
          </li>
        ))}
      </ul>
    </>
  );
}

/** The body for any node, whatever its lane. */
export function SystemNodeBody({ node, onNode, onEdge }: { node: SysNode; onNode: (id: string) => void; onEdge: (id: string) => void }) {
  return (
    <div>
      {node.lane === "process" && <ProcessDetailBody node={node} onSelect={onNode} />}
      {node.lane === "artifact" && <ArtifactBody node={node} />}
      {node.lane === "tool" && <ToolBody node={node} />}
      {node.lane === "pipeline" && <PipelineBody node={node} />}
      <Connections node={node} onNode={onNode} onEdge={onEdge} />
      {/* process steps already list "See it in my work" inside ProcessDetailBody */}
      {node.lane !== "process" && <SeenIn items={node.seenIn} />}
    </div>
  );
}

/** A link, explained: where it goes, what it carries and why it exists. */
export function EdgeBody({ edge, onNode }: { edge: SysEdge; onNode: (id: string) => void }) {
  const from = sysNodeById.get(edge.from)!;
  const to = sysNodeById.get(edge.to)!;
  const kind = EDGE_KIND[edge.kind];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">Connection</span>
        <span className="rounded-full border border-foreground/20 px-2 py-0.5 font-mono text-[11px] text-foreground/70">{kind.label}</span>
        {edge.label && <span className="font-mono text-[11px] text-foreground/55">{edge.label}</span>}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => onNode(from.id)} className={CHIP}>{from.title}</button>
        <ArrowRight aria-hidden="true" className="h-4 w-4 text-primary" />
        <button type="button" onClick={() => onNode(to.id)} className={CHIP}>{to.title}</button>
      </div>
      <h4 className={cn(H, "mt-6")}>What it carries</h4>
      <p className="mt-2 font-display text-2xl tracking-tight text-foreground">{edge.carries}</p>
      <h4 className={cn(H, "mt-6")}>Why it exists</h4>
      <p className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-foreground/75">{edge.why}</p>
      <p className="mt-5 text-xs text-foreground/55">{kind.note}</p>
    </div>
  );
}

/** Shown when nothing is selected: how to read the map. */
export function IntroBody() {
  return (
    <div>
      <p className={H}>How to read this map</p>
      <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground sm:text-3xl">Click any node, or any line</h3>
      <p className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-foreground/75">
        Four lanes, one system: the steps of the process, the documents they produce, the tools behind them, and the pipeline that checks and ships the work. Select
        something to light up everything connected to it across the lanes.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="font-mono text-xs text-foreground/55">The lanes</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
            {LANES.map((l) => (
              <li key={l.id}><span className="font-medium text-foreground">{l.title}.</span> {l.blurb}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs text-foreground/55">The lines</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
            {(Object.keys(EDGE_KIND) as EdgeKind[]).map((k) => (
              <li key={k}><span className="font-medium text-foreground">{EDGE_KIND[k].label}.</span> {EDGE_KIND[k].note}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="font-mono text-xs text-foreground/55">The dots</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
            {(Object.keys(EVIDENCE) as Array<keyof typeof EVIDENCE>).map((k) => (
              <li key={k} className="flex items-start gap-2.5">
                <EvidenceDot evidence={k} className="mt-1.5" />
                <span><span className="font-medium text-foreground">{EVIDENCE[k].label}.</span> {EVIDENCE[k].note}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs text-foreground/55">The shapes</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground/80">
            <li><span className="font-medium text-foreground">Rounded card.</span> An activity.</li>
            <li><span className="font-medium text-foreground">Dashed card.</span> A document or data set.</li>
            <li><span className="font-medium text-foreground">Notched card.</span> A decision gate.</li>
            <li><span className="font-medium text-foreground">Pill.</span> A tool.</li>
          </ul>
        </div>
      </div>
      <p className="mt-6 text-xs text-foreground/55">
        {sysNodes.length} nodes ({sysNodes.filter((n) => n.lane === "process").length} steps, {artifactNodes.length} documents, {toolNodes.length} tools, {pipelineNodes.length} pipeline steps) and {sysEdges.length} links.
      </p>
    </div>
  );
}

/** Frame around whichever body is showing, with Previous / Next along an active path. */
export function SystemDetailCard({
  children,
  position,
  onPrev,
  onNext,
}: {
  children: React.ReactNode;
  position?: { index: number; total: number; label: string };
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <section aria-live="polite" aria-label="Selected item" className="rounded-2xl border border-foreground/15 bg-card p-5 sm:p-8">
      {position && (
        <p className="mb-4 font-mono text-xs text-foreground/60">
          <span className="text-primary">{position.label}</span> · step {position.index + 1} of {position.total}
        </p>
      )}
      {children}
      {position && (
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-foreground/10 pt-5">
          <button type="button" onClick={onPrev} disabled={!onPrev} className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Previous
          </button>
          <button type="button" onClick={onNext} disabled={!onNext} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Next <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
