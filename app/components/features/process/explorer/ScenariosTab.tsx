"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { explorerNodeById } from "@/lib/data/explorerMap";
import { scenarioContent } from "@/lib/data/systemContent";
import { artifactsForPath, scenarios, toolsForPath } from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "../evidence";

/** The four situations. Pick one to read it as a stepper: each step says what it looks like in that situation and opens in the sheet. */
export default function ScenariosTab({ onOpen }: { onOpen: (id: string, walk?: string) => void }) {
  const [id, setId] = useState(scenarios[0].id);
  const s = scenarios.find((x) => x.id === id)!;
  const c = scenarioContent[id];
  const tools = toolsForPath(s.path);
  const docs = artifactsForPath(s.path);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div role="tablist" aria-label="Situation" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {scenarios.map((x) => {
          const on = x.id === id;
          return (
            <button
              key={x.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setId(x.id)}
              className={cn("shrink-0 rounded-xl border p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:shrink", on ? "border-primary bg-primary/[0.06]" : "border-foreground/15 bg-card")}
            >
              <span className="block font-display text-lg tracking-tight text-foreground">{x.label}</span>
              <span className="mt-1 hidden text-sm leading-snug text-foreground/60 lg:block">{scenarioContent[x.id].whenToUse}</span>
              <span className="mt-2 block font-mono text-[11px] text-foreground/45">{x.path.length} steps</span>
            </button>
          );
        })}
      </div>

      <div>
        <p className="max-w-[68ch] text-[16px] leading-relaxed text-foreground/80">{s.description}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <p className="rounded-xl border border-foreground/12 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground/80"><span className="font-mono text-xs text-primary">When.</span> {c.whenToUse}</p>
          <p className="rounded-xl border border-foreground/12 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground/80"><span className="font-mono text-xs text-primary">Outcome.</span> {c.outcome}</p>
        </div>
        <button type="button" onClick={() => onOpen(s.path[0], s.id)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Play aria-hidden="true" className="h-3.5 w-3.5" />
          Walk through it
        </button>

        <ol className="relative mt-8 space-y-3 border-l border-foreground/15 pl-6">
          {s.path.map((nid, i) => {
            const n = explorerNodeById.get(nid)!;
            return (
              <li key={nid} className="relative">
                <span aria-hidden="true" className="absolute -left-[31px] top-4 flex h-5 w-5 items-center justify-center rounded-full border border-foreground/25 bg-background font-mono text-[10px] text-foreground/70">{i + 1}</span>
                <button type="button" onClick={() => onOpen(nid, s.id)} className="w-full rounded-xl border border-foreground/15 bg-card p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="flex items-center gap-2.5">
                    <span className="min-w-0 flex-1 text-[15px] font-medium text-foreground">{n.title}</span>
                    <EvidenceDot evidence={n.evidence} />
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-foreground/65">{c.notes[nid]}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {[
            { title: "Documents on this path", items: docs },
            { title: "Tools on this path", items: tools },
          ].map((g) => (
            <div key={g.title}>
              <h3 className="font-mono text-xs text-foreground/55">{g.title} · {g.items.length}</h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {g.items.map((n) => (
                  <li key={n.id}>
                    <button type="button" onClick={() => onOpen(n.id)} className="rounded-md border border-foreground/15 bg-foreground/[0.04] px-2 py-1 text-xs text-foreground/80 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
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
