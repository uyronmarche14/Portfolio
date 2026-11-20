"use client";

import { ArrowRight, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import {
  explorerIncident,
  explorerNodeById,
  neighborhoodGroups,
  scenariosFor,
  sideCaption,
  tabOf,
  type ExplorerNode,
  type Side,
} from "@/lib/data/explorerMap";
import { EVIDENCE } from "@/lib/data/processMap";
import { artifactExamples, scenarioContent, stepContent } from "@/lib/data/systemContent";
import { toolNotes } from "@/lib/data/toolContent";
import type { InfraNode } from "@/lib/data/infraMap";
import { projects } from "@/lib/data/projects";
import { TOOL_CATEGORIES, artifactsForPath, scenarios, toolsForPath } from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "../evidence";
import NeighborhoodDiagram from "./NeighborhoodDiagram";
import ScenarioStrip from "./ScenarioStrip";


const LANE_TAG: Record<ExplorerNode["lane"], string> = { process: "Step", artifact: "Document", tool: "Tool", pipeline: "Pipeline", journey: "Request path", release: "Release", ops: "Operations", code: "Practice" };
const isInfra = (n: ExplorerNode): n is InfraNode => n.lane === "journey" || n.lane === "release" || n.lane === "ops" || n.lane === "code";
const H = "font-mono text-[11px] uppercase tracking-wider text-foreground/45";
const CHIP =
  "rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const List = ({ items }: { items: string[] }) => (
  <ul className="mt-2 divide-y divide-foreground/[0.07]">
    {items.map((d, i) => (
      <li key={d} style={{ animationDelay: `${i * 45}ms` }} className="sheet-rise flex gap-3 py-1.5 text-[13px] leading-relaxed text-foreground/75">
        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/35" />
        {d}
      </li>
    ))}
  </ul>
);

const Callout = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="sheet-rise mt-5 border-l-2 border-primary/50 pl-4">
    <p className={H}>{label}</p>
    <p className="mt-1 max-w-[70ch] text-sm leading-relaxed text-foreground/80">{children}</p>
  </div>
);

// ------------------------------------------------------------------------------------------------------------------ overview
export function Overview({ node, onSelect }: { node: ExplorerNode; onSelect: (id: string) => void }) {
  const usedBy = useMemo(() => {
    if (node.lane !== "tool") return [];
    return explorerIncident(node.id).map((e) => explorerNodeById.get(e.from === node.id ? e.to : e.from)!).filter((x) => Boolean(x) && x.lane !== "tool");
  }, [node]);
  const note = node.lane === "tool" ? toolNotes[node.id] : undefined;
  const content = node.lane === "process" ? stepContent[node.id] : undefined;
  const category = node.lane === "tool" ? TOOL_CATEGORIES.find((c) => c.id === node.category)?.title : undefined;

  return (
    <div>
      <p className="max-w-[70ch] text-[15px] leading-relaxed text-foreground/75">{node.summary}</p>

      {content && <Callout label="Why it matters">{content.why}</Callout>}
      {isInfra(node) && <Callout label="Why it matters">{node.why}</Callout>}
      {content && <Callout label="Example">{content.example}</Callout>}
      {isInfra(node) && node.example && <Callout label="Example">{node.example}</Callout>}
      {note && <Callout label="How I used it">{note.how}</Callout>}
      {node.lane === "artifact" && artifactExamples[node.id] && <Callout label="Example">{artifactExamples[node.id]}</Callout>}

      {isInfra(node) && (
        <>
          <h4 className={cn(H, "mt-6")}>How it works</h4>
          <List items={node.how} />
        </>
      )}
      {node.lane === "process" && node.details.length > 0 && (
        <>
          <h4 className={cn(H, "mt-6")}>What happens</h4>
          <List items={node.details} />
        </>
      )}
      {node.lane === "process" && (node.inputs.length > 0 || node.artifacts.length > 0) && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {node.inputs.length > 0 && (
            <div>
              <h4 className={H}>Goes in</h4>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {node.inputs.map((i) => (
                  <li key={i} className="rounded-md border border-foreground/15 bg-foreground/[0.04] px-2 py-1 text-xs text-foreground/80">{i}</li>
                ))}
              </ul>
            </div>
          )}
          {node.artifacts.length > 0 && (
            <div>
              <h4 className={H}>Comes out</h4>
              <ul className="mt-2 space-y-1.5">
                {node.artifacts.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm text-foreground/80"><span aria-hidden="true" className="h-px w-4 bg-primary" />{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {node.lane === "process" && node.questions.length > 0 && (
        <>
          <h4 className={cn(H, "mt-6")}>Questions I ask here</h4>
          <ul className="mt-2 space-y-1.5">
            {node.questions.map((q) => (
              <li key={q} className="text-sm italic leading-relaxed text-foreground/75">&ldquo;{q}&rdquo;</li>
            ))}
          </ul>
        </>
      )}
      {node.lane === "artifact" && (
        <>
          <h4 className={cn(H, "mt-6")}>What it contains</h4>
          <List items={node.contains} />
        </>
      )}
      {node.lane === "pipeline" && (
        <>
          {node.command && <pre className="mt-5 overflow-x-auto rounded-md border border-foreground/15 bg-foreground/[0.05] px-3 py-2 font-mono text-xs text-foreground/85">{node.command}</pre>}
          <h4 className={cn(H, "mt-6")}>What it checks</h4>
          <List items={node.checks} />
        </>
      )}
      {node.lane === "tool" && (
        <>
          {category && <p className="mt-5 font-mono text-xs text-foreground/55">{category}</p>}
          {usedBy.length > 0 && (
            <>
              <h4 className={cn(H, "mt-6")}>Where it is used</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {usedBy.map((u) => (
                  <li key={u.id}>
                    <button type="button" onClick={() => onSelect(u.id)} className={CHIP}>
                      <span className="mr-1.5 font-mono text-[10px] uppercase text-foreground/45">{LANE_TAG[u.lane]}</span>
                      {u.title}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {note && note.used.length > 0 && (
            <>
              <h4 className={cn(H, "mt-6")}>What I used it for</h4>
              <List items={note.used} />
            </>
          )}
          {note && note.with.length > 0 && (
            <>
              <h4 className={cn(H, "mt-6")}>Connected to</h4>
              <ul className="mt-2 divide-y divide-foreground/[0.07]">
                {note.with.map(([id, how]) => {
                  const other = explorerNodeById.get(id);
                  if (!other) return null;
                  return (
                    <li key={id} className="py-2">
                      <button type="button" onClick={() => onSelect(id)} className="group flex w-full flex-col items-start gap-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <span className="flex items-center gap-2 text-[13px] font-medium text-foreground group-hover:text-primary">
                          <EvidenceDot evidence={other.evidence} />
                          {other.title}
                        </span>
                        <span className="pl-4 text-xs leading-relaxed text-foreground/55">{how}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      )}

      <p className="mt-6 flex items-start gap-2 text-xs text-foreground/50">
        <EvidenceDot evidence={node.evidence} className="mt-1" />
        <span>
          <span className="font-mono text-foreground/85">{EVIDENCE[node.evidence].label}:</span> {EVIDENCE[node.evidence].note} Listing something is not a claim of mastery.
        </span>
      </p>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------------------------ connections
export function Connections({ node, onSelect }: { node: ExplorerNode; onSelect: (id: string) => void }) {
  const groups = neighborhoodGroups(node.id);
  const sides: Side[] = ["left", "right", "top", "bottom"];
  const total = sides.reduce((n, s) => n + groups[s].length, 0);
  if (total === 0) return <p className="text-sm text-foreground/60">Nothing else is connected to this yet.</p>;
  return (
    <div>
      <p className="text-sm text-foreground/60">{total} connections. Click anything to open it.</p>
      <div className="mx-auto mt-3 max-w-xl">
        <NeighborhoodDiagram key={node.id} center={node} onSelect={onSelect} />
      </div>
      {sides
        .filter((s) => groups[s].length > 0)
        .map((s) => (
          <section key={s} className="mt-7">
            <h4 className={H}>{sideCaption(node, s)}</h4>
            <ul className="mt-2 space-y-2">
              {groups[s].map(({ node: other, edge }, i) => (
                <li key={other.id} style={{ animationDelay: `${i * 40}ms` }} className="sheet-rise border-b border-foreground/[0.07] py-2">
                  <button type="button" onClick={() => onSelect(other.id)} className="flex w-full items-center gap-2 text-left text-[13px] font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <EvidenceDot evidence={other.evidence} />
                    <span className="min-w-0 flex-1 truncate">{other.title}</span>
                    <span className="shrink-0 font-mono text-[10px] uppercase text-foreground/40">{LANE_TAG[other.lane]}</span>
                  </button>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                    <span className="font-mono text-foreground/75">{edge.carries}.</span> {edge.why}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}

// ------------------------------------------------------------------------------------------------------------------ scenarios
export function Scenarios({ node, onSelect }: { node: ExplorerNode; onSelect: (id: string) => void }) {
  const list = useMemo(() => scenariosFor(node.id), [node.id]);
  if (list.length === 0) return <p className="text-sm text-foreground/60">This does not appear in any of the situations yet.</p>;
  return (
    <div className="space-y-8">
      <p className="text-sm text-foreground/60">Appears in {list.length} of {scenarios.length} situations. Pick a step to jump to it.</p>
      {list.map(({ scenario, steps, direct, note }) => {
        const c = scenarioContent[scenario.id];
        const tools = toolsForPath(scenario.path);
        const docs = artifactsForPath(scenario.path);
        return (
          <section key={scenario.id} className="sheet-rise border-t border-foreground/10 pt-4">
            <h4 className="font-display text-base tracking-tight text-foreground">{scenario.label}</h4>
            <p className="mt-1 text-[13px] text-foreground/60">{c.whenToUse}</p>
            <div className="mt-3">
              <ScenarioStrip path={scenario.path} highlight={steps} onSelect={onSelect} />
            </div>
            {note && (
              <Callout label={direct ? "In this situation" : `Through ${explorerNodeById.get(steps[0])?.title ?? "a related step"}`}>{note}</Callout>
            )}
            <p className="mt-4 text-sm text-foreground/65"><span className="font-mono text-xs text-primary">Outcome.</span> {c.outcome}</p>
            <p className="mt-3 font-mono text-[11px] text-foreground/45">{tools.length} tools and {docs.length} documents are used along this path</p>
          </section>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------------------------------------------------------ in my work
export function Work({ node, onOpenMap }: { node: ExplorerNode; onOpenMap: (id: string) => void }) {
  const onMap = node.lane === "process" || node.lane === "artifact" || node.lane === "tool" || node.lane === "pipeline";
  return (
    <div>
      {node.seenIn.length > 0 ? (
        <>
          <h4 className={H}>Where I have used it</h4>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {node.seenIn.map((s) => {
              const id = s.href.startsWith("/projects/") ? s.href.replace("/projects/", "") : null;
              const project = id ? projects.find((p) => p.id === id) : null;
              return (
                <li key={s.href}>
                  <Link href={s.href} className="group block h-full rounded-xl border border-foreground/15 p-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span className="flex items-center justify-between gap-2 text-[15px] font-medium text-foreground group-hover:text-primary">
                      {project?.title ?? s.label}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </span>
                    {project && (
                      <>
                        <span className="mt-1.5 line-clamp-3 block text-[13px] leading-relaxed text-foreground/60">{project.description}</span>
                        <span className="mt-3 flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((t) => (
                            <span key={t} className="rounded-full border border-foreground/12 px-2 py-0.5 font-mono text-[10px] text-foreground/55">{t}</span>
                          ))}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-sm text-foreground/60">No specific role or project on this site is linked to it yet.</p>
      )}
      {onMap && (
        <button type="button" onClick={() => onOpenMap(node.id)} className={cn(CHIP, "mt-6 inline-flex items-center gap-2")}>
          <MapIcon aria-hidden="true" className="h-4 w-4" />
          Show it on the map
        </button>
      )}
    </div>
  );
}
