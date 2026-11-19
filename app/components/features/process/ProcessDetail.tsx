"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { EVIDENCE, edges, nodeById, stages, type ResolvedNode } from "@/lib/data/processMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "./evidence";

const TONE_CLASS: Record<string, string> = {
  violet: "text-tone-violet border-tone-violet/40 bg-tone-violet/10",
  teal: "text-tone-teal border-tone-teal/40 bg-tone-teal/10",
  amber: "text-tone-amber border-tone-amber/40 bg-tone-amber/10",
  rose: "text-tone-rose border-tone-rose/40 bg-tone-rose/10",
};

export function EvidenceChip({ evidence, className }: { evidence: ResolvedNode["evidence"]; className?: string }) {
  return (
    <span title={EVIDENCE[evidence].note} className={cn("inline-flex items-center gap-1.5 rounded-full border border-foreground/20 px-2 py-0.5 font-mono text-[11px] text-foreground/70", className)}>
      <EvidenceDot evidence={evidence} className="h-1.5 w-1.5" />
      {EVIDENCE[evidence].label}
    </span>
  );
}

const H = "font-mono text-xs text-primary";

/** The full write-up of one node: what happens, what goes in and out, the questions I ask, where it shows up, and how it connects. */
export function ProcessDetailBody({ node, onSelect }: { node: ResolvedNode; onSelect: (id: string) => void }) {
  const stage = stages.find((s) => s.id === node.stage);
  const before = edges.filter((e) => e.to === node.id && !e.loop).map((e) => nodeById.get(e.from)!);
  const after = edges.filter((e) => e.from === node.id).map((e) => ({ node: nodeById.get(e.to)!, label: e.label, loop: e.loop }));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {stage && <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[11px]", TONE_CLASS[stage.tone])}>{stage.title}</span>}
        <EvidenceChip evidence={node.evidence} />
        <span className="font-mono text-[11px] text-foreground/50">{node.kind === "gate" ? "Decision gate" : node.kind === "artifact" ? "Produces a document" : "Activity"}</span>
      </div>
      <h3 className="mt-3 font-display text-2xl tracking-tight text-foreground sm:text-3xl">{node.title}</h3>
      <p className="mt-2 max-w-[66ch] text-[16px] leading-relaxed text-foreground/75">{node.summary}</p>

      {node.details.length > 0 && (
        <>
          <h4 className={cn(H, "mt-6")}>What happens</h4>
          <ul className="mt-2 divide-y divide-foreground/10 border-y border-foreground/10">
            {node.details.map((d) => (
              <li key={d} className="flex gap-3 py-2 text-sm leading-relaxed text-foreground/80">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {d}
              </li>
            ))}
          </ul>
        </>
      )}

      {(node.inputs.length > 0 || node.artifacts.length > 0) && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
                  <li key={a} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span aria-hidden="true" className="h-px w-4 bg-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {node.questions.length > 0 && (
        <>
          <h4 className={cn(H, "mt-6")}>Questions I ask here</h4>
          <ul className="mt-2 space-y-1.5">
            {node.questions.map((q) => (
              <li key={q} className="text-sm italic leading-relaxed text-foreground/75">&ldquo;{q}&rdquo;</li>
            ))}
          </ul>
        </>
      )}

      {node.seenIn.length > 0 && (
        <>
          <h4 className={cn(H, "mt-6")}>See it in my work</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {node.seenIn.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-flex items-center gap-1 rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {s.label}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {(before.length > 0 || after.length > 0) && (
        <div className="mt-6 grid gap-5 border-t border-foreground/10 pt-5 sm:grid-cols-2">
          <div>
            <h4 className="font-mono text-xs text-foreground/55">Comes after</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {before.length ? before.map((n) => (
                <button key={n.id} type="button" onClick={() => onSelect(n.id)} className="rounded-full border border-foreground/15 px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {n.title}
                </button>
              )) : <span className="text-sm text-foreground/50">A starting point</span>}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs text-foreground/55">Leads to</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {after.length ? after.map((a) => (
                <button key={a.node.id + (a.label ?? "")} type="button" onClick={() => onSelect(a.node.id)} className={cn("rounded-full border px-3 py-1 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", a.loop ? "border-dashed border-foreground/30" : "border-foreground/15")}>
                  {a.label ? <span className="mr-1.5 font-mono text-[11px] text-foreground/55">{a.label}:</span> : null}
                  {a.node.title}
                </button>
              )) : <span className="text-sm text-foreground/50">The end of the line</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Inline card with Previous / Next along the active path. */
export function ProcessDetailCard({
  node,
  position,
  onSelect,
  onPrev,
  onNext,
}: {
  node: ResolvedNode;
  position?: { index: number; total: number; label: string };
  onSelect: (id: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <section aria-live="polite" aria-label="Selected step" className="rounded-2xl border border-foreground/15 bg-card p-5 sm:p-8">
      {position && (
        <p className="mb-4 font-mono text-xs text-foreground/60">
          <span className="text-primary">{position.label}</span> · step {position.index + 1} of {position.total}
        </p>
      )}
      <ProcessDetailBody node={node} onSelect={onSelect} />
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
