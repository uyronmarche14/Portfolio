"use client";

import { explorerNodeById } from "@/lib/data/explorerMap";
import { cn } from "@/lib/utils";

/** A scenario's path as a wrapped row of numbered pills. Pills for the highlighted steps stand out; every pill opens that step. */
export default function ScenarioStrip({ path, highlight, onSelect }: { path: string[]; highlight: string[]; onSelect: (id: string) => void }) {
  return (
    <ol className="flex flex-wrap gap-1.5" aria-label="Steps in this situation">
      {path.map((id, i) => {
        const n = explorerNodeById.get(id);
        const on = highlight.includes(id);
        return (
          <li key={id}>
            <button
              type="button"
              onClick={() => onSelect(id)}
              title={n?.title}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                on ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground/60"
              )}
            >
              <span className="font-mono text-[10px] opacity-70">{i + 1}</span>
              <span className="max-w-[11ch] truncate">{n?.title ?? id}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
