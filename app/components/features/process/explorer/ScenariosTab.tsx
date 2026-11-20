"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { explorerNodeById } from "@/lib/data/explorerMap";
import { stages } from "@/lib/data/processMap";
import { scenarioContent } from "@/lib/data/systemContent";
import { artifactsForPath, scenarios, toolsForPath } from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "../evidence";

const LABEL = "font-mono text-[11px] uppercase tracking-wider text-foreground/45";

/** The situations, each read as a path through the phases: steps are grouped under their phase and open as pages. */
export default function ScenariosTab({ onOpen }: { onOpen: (id: string) => void }) {
  const [id, setId] = useState(scenarios[0].id);
  const s = scenarios.find((x) => x.id === id)!;
  const c = scenarioContent[id];
  const tools = toolsForPath(s.path);
  const docs = artifactsForPath(s.path);

  // consecutive steps of the same phase share one heading
  const phases: { stage: string; steps: string[] }[] = [];
  s.path.forEach((nid) => {
    const n = explorerNodeById.get(nid);
    const stage = n && n.lane === "process" ? n.stage : "";
    const last = phases[phases.length - 1];
    if (last && last.stage === stage) last.steps.push(nid);
    else phases.push({ stage, steps: [nid] });
  });
  let counter = 0;

  return (
    <div>
      <div role="tablist" aria-label="Situation" className="flex gap-6 overflow-x-auto border-b border-foreground/10">
        {scenarios.map((x) => {
          const on = x.id === id;
          return (
            <button
              key={x.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setId(x.id)}
              className={cn("relative shrink-0 pb-3 text-[15px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", on ? "font-medium text-foreground" : "text-foreground/55 hover:text-foreground/85")}
            >
              {x.label}
              {on && <motion.span layoutId="scenario-underline" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" transition={{ type: "spring", damping: 30, stiffness: 400 }} />}
            </button>
          );
        })}
      </div>

      <div key={id} className="sheet-rise mt-6">
        <p className="max-w-[68ch] text-[15px] leading-relaxed text-foreground/75">{s.description}</p>
        <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className={LABEL}>When</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground/80">{c.whenToUse}</dd>
          </div>
          <div>
            <dt className={LABEL}>Outcome</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground/80">{c.outcome}</dd>
          </div>
        </dl>

        <ol className="mt-10 space-y-8">
          {phases.map((ph) => {
            const stageIdx = stages.findIndex((x) => x.id === ph.stage);
            const stage = stages[stageIdx];
            return (
              <li key={`${ph.stage}-${ph.steps[0]}`}>
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary">{stageIdx >= 0 ? String(stageIdx + 1).padStart(2, "0") : "--"}</span>
                  <span className="font-display text-lg tracking-tight text-foreground">{stage?.title ?? "Other"}</span>
                </p>
                <ul className="mt-3 border-l border-foreground/15">
                  {ph.steps.map((nid) => {
                    const n = explorerNodeById.get(nid)!;
                    counter += 1;
                    return (
                      <li key={nid} className="relative">
                        <span aria-hidden="true" className="absolute -left-[5px] top-[22px] h-2.5 w-2.5 rounded-full border border-foreground/30 bg-background" />
                        <button type="button" onClick={() => onOpen(nid)} className="group ml-5 block w-[calc(100%-1.25rem)] rounded-lg px-3 py-3 text-left transition-colors hover:bg-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <span className="flex items-center gap-2.5">
                            <span className="font-mono text-[11px] text-foreground/40">{counter}</span>
                            <span className="min-w-0 flex-1 text-[15px] font-medium text-foreground group-hover:text-primary">{n.title}</span>
                            <EvidenceDot evidence={n.evidence} />
                          </span>
                          <span className="mt-1 block max-w-[68ch] pl-[26px] text-[13px] leading-relaxed text-foreground/60">{c.notes[nid]}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-8 border-t border-foreground/10 pt-6 sm:grid-cols-2">
          {[
            { title: "Documents", items: docs },
            { title: "Tools", items: tools },
          ].map((g) => (
            <div key={g.title}>
              <h3 className={LABEL}>{g.title} on this path · {g.items.length}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => onOpen(n.id)} className="rounded-full border border-foreground/15 px-2.5 py-1 text-xs text-foreground/75 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {n.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
