"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import * as React from "react";

import type { ModelEntity, ModelRelation, ProjectDeepDive as DeepDive, Side } from "@/lib/data/projectDeepDive";

const BOX_W = 200;
const HEAD = 30;
const ROW = 20;
const entityHeight = (e: ModelEntity) => HEAD + e.fields.length * ROW + 8;

function anchor(e: ModelEntity, side: Side): [number, number] {
  const h = entityHeight(e);
  if (side === "top") return [e.x + BOX_W / 2, e.y];
  if (side === "bottom") return [e.x + BOX_W / 2, e.y + h];
  if (side === "left") return [e.x, e.y + h / 2];
  return [e.x + BOX_W, e.y + h / 2];
}

const vertical = (s: Side) => s === "top" || s === "bottom";

/** Orthogonal route between two anchors. */
function route(a: [number, number], as: Side, b: [number, number], bs: Side): string {
  if (vertical(as) && vertical(bs)) {
    const mid = (a[1] + b[1]) / 2;
    return `M${a[0]},${a[1]} V${mid} H${b[0]} V${b[1]}`;
  }
  if (!vertical(as) && !vertical(bs)) {
    const mid = (a[0] + b[0]) / 2;
    return `M${a[0]},${a[1]} H${mid} V${b[1]} H${b[0]}`;
  }
  if (vertical(as)) return `M${a[0]},${a[1]} V${b[1]} H${b[0]}`;
  return `M${a[0]},${a[1]} H${b[0]} V${b[1]}`;
}

function labelPos(p: [number, number], side: Side): { x: number; y: number; anchor: "start" | "end" } {
  if (side === "top") return { x: p[0] + 6, y: p[1] - 6, anchor: "start" };
  if (side === "bottom") return { x: p[0] + 6, y: p[1] + 15, anchor: "start" };
  if (side === "left") return { x: p[0] - 6, y: p[1] - 7, anchor: "end" };
  return { x: p[0] + 6, y: p[1] - 7, anchor: "start" };
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reduced-motion preference that matches on the server and on the first client render (always false), then updates after mount.
 * framer-motion's own hook is empty on the server and true on the client for these visitors, which causes a hydration mismatch.
 */
function useReduce(): boolean {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted && Boolean(prefers);
}

/** Fades and lifts a block into place the first time it scrolls into view. Static when the visitor prefers reduced motion. */
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReduce();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** The link between two tiers: a thin line with a small packet travelling along it, and a label. */
function Connector({ label }: { label: string }) {
  const reduce = useReduce();
  return (
    <div className="flex items-center justify-center gap-3 py-1" aria-hidden="true">
      <span className="relative block h-9 w-px bg-foreground/20">
        <motion.span
          className="absolute -left-[3px] block h-[7px] w-[7px] rounded-full bg-primary"
          initial={{ top: 0, opacity: reduce ? 1 : 0 }}
          animate={reduce ? { top: "50%", opacity: 1 } : { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
      </span>
      <span className="font-mono text-[11px] text-foreground/60">{label}</span>
    </div>
  );
}

/** Steps as a timeline that plays itself while it is on screen. Click a step to read it; the play button resumes the loop. */
function Lifecycle({ steps }: { steps: DeepDive["flow"] }) {
  const reduce = useReduce();
  const ref = React.useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (reduce || !playing || !inView) return;
    const timer = window.setInterval(() => setActive((i) => (i + 1) % steps.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduce, playing, inView, steps.length]);

  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;

  return (
    <div>
      {!reduce && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-foreground/60">
            Step {active + 1} of {steps.length}
          </p>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1 font-mono text-xs text-foreground/80 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {playing ? <Pause aria-hidden="true" className="h-3 w-3" /> : <Play aria-hidden="true" className="h-3 w-3" />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      )}
      <ol ref={ref} className="relative">
        {/* rail, and the part of it already travelled */}
        <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-foreground/15" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[13px] top-3 w-px origin-top bg-primary"
          style={{ bottom: 12 }}
          animate={{ scaleY: reduce ? 1 : progress }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        />
        {steps.map((step, i) => {
          const isActive = reduce || i === active;
          const done = reduce || i <= active;
          return (
            <li key={step.title} className="relative">
              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
                aria-current={i === active ? "step" : undefined}
                className="group grid w-full grid-cols-[28px_minmax(0,1fr)] gap-4 py-2.5 text-left focus-visible:outline-none"
              >
                <span
                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-ring ${
                    done ? "border-primary bg-primary text-primary-foreground" : "border-foreground/25 bg-background text-foreground/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[15px] font-medium transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/55 group-hover:text-foreground/80"}`}>
                    {step.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        key="text"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block pb-1 pt-1 text-sm leading-relaxed text-foreground/70">{step.text}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function DataModel({ model }: { model: DeepDive["model"] }) {
  const reduce = useReduce();
  const [focus, setFocus] = React.useState<string | null>(null);
  const byId = new Map(model.entities.map((e) => [e.id, e]));
  const linked = (id: string) => focus === null || focus === id || model.relations.some((r) => (r.from === focus && r.to === id) || (r.to === focus && r.from === id));
  const touches = (r: ModelRelation) => focus === null || r.from === focus || r.to === focus;
  const rel = (r: ModelRelation) => ({ a: byId.get(r.from)!, b: byId.get(r.to)!, r });
  return (
    <div className="overflow-x-auto rounded-2xl border border-foreground/15 bg-card p-3 sm:p-4">
      <svg
        viewBox={`0 0 ${model.width} ${model.height}`}
        role="img"
        aria-label={`Data model: ${model.entities.map((e) => e.name).join(", ")}`}
        className="mx-auto h-auto min-w-[640px] w-full"
        fontFamily="var(--font-mono), ui-monospace, monospace"
      >
        {model.relations.map((r, i) => {
          const { a, b } = rel(r);
          const pa = anchor(a, r.fromSide);
          const pb = anchor(b, r.toSide);
          const la = labelPos(pa, r.fromSide);
          const lb = labelPos(pb, r.toSide);
          const on = touches(r);
          return (
            <g key={i} style={{ opacity: on ? 1 : 0.12, transition: "opacity 200ms" }}>
              <motion.path
                d={route(pa, r.fromSide, pb, r.toSide)}
                fill="none"
                stroke={focus !== null && on ? "rgb(var(--primary))" : "rgb(var(--foreground) / 0.4)"}
                strokeWidth={focus !== null && on ? 2 : 1.5}
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.07, ease: "easeOut" }}
              />
              <motion.g
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.07 }}
              >
                <text x={la.x} y={la.y} textAnchor={la.anchor} fontSize={12} fontWeight={700} fill="rgb(var(--primary))">{r.one}</text>
                <text x={lb.x} y={lb.y} textAnchor={lb.anchor} fontSize={12} fontWeight={700} fill="rgb(var(--primary))">{r.many}</text>
              </motion.g>
            </g>
          );
        })}
        {model.entities.map((e, idx) => (
          <motion.g
            key={e.id}
            tabIndex={0}
            role="group"
            aria-label={`${e.name}: ${e.fields.map((f) => f.name).join(", ")}`}
            onMouseEnter={() => setFocus(e.id)}
            onMouseLeave={() => setFocus(null)}
            onFocus={() => setFocus(e.id)}
            onBlur={() => setFocus(null)}
            style={{ opacity: linked(e.id) ? 1 : 0.28, transition: "opacity 200ms", outline: "none", cursor: "default" }}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: linked(e.id) ? 1 : 0.28 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
          >
            <rect x={e.x} y={e.y} width={BOX_W} height={entityHeight(e)} rx={10} fill="rgb(var(--background))" stroke="rgb(var(--foreground) / 0.45)" strokeWidth={1.5} />
            <path d={`M${e.x},${e.y + HEAD} V${e.y + 10} a10,10 0 0 1 10,-10 H${e.x + BOX_W - 10} a10,10 0 0 1 10,10 V${e.y + HEAD} Z`} fill="rgb(var(--primary) / 0.16)" />
            <text x={e.x + 12} y={e.y + 20} fontSize={13} fontWeight={700} fill="rgb(var(--foreground))">{e.name}</text>
            {e.fields.map((f, i) => (
              <g key={f.name}>
                <text x={e.x + 12} y={e.y + HEAD + 15 + i * ROW} fontSize={12} fill="rgb(var(--foreground) / 0.82)">{f.name}</text>
                {f.key && (
                  <text x={e.x + BOX_W - 12} y={e.y + HEAD + 15 + i * ROW} textAnchor="end" fontSize={10} fontWeight={700} fill="rgb(var(--primary))">{f.key.toUpperCase()}</text>
                )}
              </g>
            ))}
          </motion.g>
        ))}
      </svg>
      <ul className="sr-only">
        {model.relations.map((r, i) => (
          <li key={i}>{`One ${byId.get(r.from)?.name} to many ${byId.get(r.to)?.name}`}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-foreground/60">
        <span className="font-mono text-primary">1</span> / <span className="font-mono text-primary">*</span> mark one-to-many links. PK is a primary key, FK a foreign key. Hover or focus a table to trace its links. {model.note}
      </p>
    </div>
  );
}

const H3 = "mt-14 font-mono text-xs text-primary";

/** "How it works": who it is for, the layered system, one request end to end, and the data model. */
export function ProjectDeepDiveSection({ dive }: { dive: DeepDive }) {
  return (
    <section id="how-it-works" className="scroll-mt-28 pt-14">
      <Reveal>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">How it works</h2>
        <p className="mt-4 max-w-[66ch] text-[17px] leading-[1.75] text-foreground/80">{dive.intro}</p>
      </Reveal>

      <h3 className={H3}>Who uses it</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {dive.users.map((u, i) => (
          <Reveal key={u.role} delay={i * 0.06} className="rounded-xl bg-foreground/[0.04] p-4">
            <dt className="font-display text-lg text-foreground">{u.role}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground/70">{u.needs}</dd>
          </Reveal>
        ))}
      </dl>

      <h3 className={H3}>System architecture</h3>
      <div className="mt-4 flex flex-col items-stretch">
        {dive.tiers.map((tier, i) => (
          <React.Fragment key={tier.title}>
            <Reveal delay={0.05} className="rounded-2xl border border-foreground/15 bg-card p-4 sm:p-5">
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg text-foreground">{tier.title}</span>
                <span className="font-mono text-[11px] text-foreground/55">{tier.subtitle}</span>
              </p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {tier.items.map((item) => (
                  <li key={item.name} className="rounded-lg bg-foreground/[0.04] px-3 py-2.5">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-foreground/65">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            {i < dive.tiers.length - 1 && <Connector label={dive.links[i]} />}
          </React.Fragment>
        ))}
      </div>

      <h3 className={H3}>{dive.flowTitle}</h3>
      <div className="mt-4 rounded-2xl border border-foreground/15 bg-card p-4 sm:p-5">
        <Lifecycle steps={dive.flow} />
      </div>

      <h3 className={H3}>Data model</h3>
      <div className="mt-4">
        <DataModel model={dive.model} />
      </div>
      <ul className="mt-5 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/80">
        {dive.model.principles.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <p className="mt-6 rounded-md border border-foreground/15 bg-foreground/[0.04] px-3 py-2 text-xs text-foreground/65">{dive.basis}</p>
    </section>
  );
}
