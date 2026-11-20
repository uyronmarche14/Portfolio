"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { roadmapFor } from "@/lib/data/explorerMap";
import { cn } from "@/lib/utils";

/**
 * A sample roadmap for one item: a line of points with the ones that matter lit, a pulse on the item's own spot and a
 * "You are here" flag. Steps and documents use the seven phases; production items use the request path or the release chain.
 */
export default function Roadmap({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const reduce = useReducedMotion();
  const r = roadmapFor(id);
  if (!r) return null;

  const n = r.points.length;
  const lit = r.points.map((p, i) => (p.lit ? i : -1)).filter((i) => i >= 0);
  const from = r.across ? 0 : lit[0] ?? 0;
  const to = r.across ? n - 1 : lit[lit.length - 1] ?? 0;
  const pct = (i: number) => ((i + 0.5) / n) * 100;

  return (
    <div>
      <p className="text-sm text-foreground/60">{r.caption}</p>
      <div className="-mx-2 mt-6 overflow-x-auto px-2 pb-2">
        <div className="relative" style={{ minWidth: Math.max(n * 104, 560) }}>
          {/* the line: faint all the way, lit between the first and last point that matter */}
          <span aria-hidden="true" className="absolute top-[34px] h-px bg-foreground/15" style={{ left: `${pct(0)}%`, right: `${100 - pct(n - 1)}%` }} />
          {to > from && (
            <motion.span
              aria-hidden="true"
              className="absolute top-[33px] h-0.5 origin-left rounded-full"
              style={{ background: "linear-gradient(90deg, rgb(var(--accent-2)), rgb(var(--primary)))", left: `${pct(from)}%`, width: `${pct(to) - pct(from)}%` }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
            />
          )}

          <ol className="relative flex">
            {r.points.map((p, i) => {
              const on = p.lit || r.across;
              return (
                <li key={p.id} className="sheet-rise flex min-w-0 flex-1 flex-col items-center px-1 text-center" style={{ animationDelay: `${i * 55}ms` }}>
                  <span className="mb-1 h-5 font-mono text-[10px] uppercase tracking-wider text-primary">{p.current ? "You are here" : ""}</span>
                  <Link
                    href={p.href}
                    aria-label={`${p.label}${p.current ? " (this item)" : p.lit ? " (related)" : ""}`}
                    aria-current={p.current ? "step" : undefined}
                    className="group flex flex-col items-center focus-visible:outline-none"
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      {p.current && <span aria-hidden="true" className="rm-ping absolute inset-0 rounded-full bg-primary/60" />}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative rounded-full border-2 transition-transform duration-200 group-hover:scale-125 group-focus-visible:ring-2 group-focus-visible:ring-ring",
                          p.current ? "h-5 w-5 border-primary bg-primary shadow-[0_0_14px_rgb(var(--primary)/0.7)]" : on ? "h-3.5 w-3.5 border-primary bg-primary/80" : "h-3 w-3 border-foreground/25 bg-background"
                        )}
                      />
                    </span>
                    <span className={cn("mt-3 line-clamp-2 text-xs leading-snug", on ? "font-medium text-foreground" : "text-foreground/45 group-hover:text-foreground/80")}>{p.label}</span>
                  </Link>
                  {p.items.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {p.items.slice(0, 3).map((it) => (
                        <li key={it.id}>
                          <button type="button" onClick={() => onSelect(it.id)} className={cn("line-clamp-2 text-[11px] leading-snug underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", it.id === id ? "text-primary" : "text-foreground/55")}>
                            {it.title}
                          </button>
                        </li>
                      ))}
                      {p.items.length > 3 && <li className="text-[11px] text-foreground/40">+{p.items.length - 3} more</li>}
                    </ul>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
