"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { C, MONO, SANS } from "@/components/features/experience/ExperienceVisualKit";

/**
 * The shared kit for the project scenes. Every scene is a short story in a few beats on one fixed canvas (560 x 380, 24px safe area).
 * Colours come from the theme tokens in `C`; the accent is the project's own `--primary`. A scene plays once when it scrolls into view,
 * rests on its finished frame, and can be replayed. Under reduced motion, or on a card, it only ever shows the finished frame.
 */

export const W = 560;
export const H = 380;
export const SAFE = 24;

/** "page" plays and can be replayed; "card" shows the resting frame only (cheap on the home page). */
export const SceneMode = createContext<"page" | "card">("page");

interface SceneState {
  beat: number;
  last: number;
  /** true while the beats are advancing */
  running: boolean;
  run: number;
  reduce: boolean;
}
const SceneContext = createContext<SceneState>({ beat: 99, last: 99, running: false, run: 0, reduce: true });
export const useBeat = () => useContext(SceneContext);

const EASE = [0.32, 0.72, 0, 1] as const;

export function SceneFrame({ beats, ms = 1500, label, children }: { beats: number; ms?: number; label: string; children: ReactNode }) {
  const mode = useContext(SceneMode);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { amount: 0.2, once: true });
  const prefersReduced = Boolean(useReducedMotion());
  const still = prefersReduced || mode === "card";
  const last = beats - 1;
  const [beat, setBeat] = useState(last);
  const [running, setRunning] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (still || (!inView && run === 0)) return;
    let i = 0;
    let done: number | undefined;
    setBeat(0);
    setRunning(true);
    const timer = window.setInterval(() => {
      i += 1;
      setBeat(i);
      if (i >= last) {
        window.clearInterval(timer);
        done = window.setTimeout(() => setRunning(false), ms);
      }
    }, ms);
    return () => {
      window.clearInterval(timer);
      if (done) window.clearTimeout(done);
    };
  }, [inView, run, still, last, ms]);

  return (
    <SceneContext.Provider value={{ beat: still ? last : beat, last, running: running && !still, run, reduce: still }}>
      <div ref={wrap} className="relative h-full w-full overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label} focusable="false">
          {children}
        </svg>
        {!still && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            aria-label="Replay the animation"
            className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background/80 px-2.5 py-1 font-mono text-[11px] text-foreground/65 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw aria-hidden="true" className="h-3 w-3" />
            Replay
          </button>
        )}
      </div>
    </SceneContext.Provider>
  );
}

// ------------------------------------------------------------------------------------------------------------------ primitives
export function Card({ x, y, w, h, r = 12, active = false }: { x: number; y: number; w: number; h: number; r?: number; active?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={C.paper} stroke={active ? C.accent : C.line} strokeWidth={active ? 1.5 : 1} />;
}

interface TextProps {
  x: number;
  y: number;
  children: ReactNode;
  size?: 11 | 13 | 15;
  mono?: boolean;
  anchor?: "start" | "middle" | "end";
  o?: number;
  bold?: boolean;
  fill?: string;
}
/** The three-size type scale: 11 mono labels, 13 body, 15 titles. */
export const T = ({ x, y, children, size = 13, mono = false, anchor = "start", o = 0.8, bold = false, fill = C.ink }: TextProps) => (
  <text x={x} y={y} fontSize={size} fontFamily={mono ? MONO : SANS} fontWeight={bold || size === 15 ? 600 : 400} textAnchor={anchor} fill={fill} opacity={o}>
    {children}
  </text>
);

export const Label = ({ x, y, children, anchor }: { x: number; y: number; children: ReactNode; anchor?: "start" | "middle" | "end" }) => (
  <T x={x} y={y} size={11} mono o={0.5} anchor={anchor}>{children}</T>
);

/** Fades and lifts in when the scene reaches beat `at`. */
export function Reveal({ at = 0, y = 6, children }: { at?: number; y?: number; children: ReactNode }) {
  const { beat } = useBeat();
  const on = beat >= at;
  return (
    <motion.g initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : y }} transition={{ duration: 0.4, ease: EASE }}>
      {children}
    </motion.g>
  );
}

/** Opacity follows a range of beats: visible from `from` up to and including `to`. */
export function Between({ from, to, children }: { from: number; to: number; children: ReactNode }) {
  const { beat } = useBeat();
  return (
    <motion.g initial={false} animate={{ opacity: beat >= from && beat <= to ? 1 : 0 }} transition={{ duration: 0.3 }}>
      {children}
    </motion.g>
  );
}

/** A soft highlight that is on only while the scene is on beat `at` (or a range). */
export function Highlight({ x, y, w, h, r = 8, from, to = from }: { x: number; y: number; w: number; h: number; r?: number; from: number; to?: number }) {
  return (
    <Between from={from} to={to}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={C.accentSoft} />
    </Between>
  );
}

export function Chip({ x, y, children, at = 0, active = false, w }: { x: number; y: number; children: string; at?: number; active?: boolean; w?: number }) {
  const width = w ?? children.length * 6.6 + 22;
  return (
    <Reveal at={at}>
      <rect x={x} y={y} width={width} height={22} rx={11} fill={active ? C.accent : C.faint} stroke={active ? "none" : C.line} />
      <T x={x + width / 2} y={y + 15} size={11} mono anchor="middle" o={1} fill={active ? C.onAccent : C.ink}>{children}</T>
    </Reveal>
  );
}

/** A line that fills in with the accent, with a small pulse travelling along it, when the scene reaches beat `at`. */
export function Beam({ d, at = 1 }: { d: string; at?: number }) {
  const { beat, running, run, reduce } = useBeat();
  const on = beat >= at;
  return (
    <g>
      <path d={d} fill="none" stroke={C.line} strokeWidth={2} strokeLinecap="round" />
      <motion.path d={d} fill="none" stroke={C.accent} strokeWidth={2} strokeLinecap="round" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.7, ease: EASE }} />
      {running && !reduce && beat === at && (
        <circle key={`${run}-${at}`} r={3.5} fill={C.accent}>
          <animateMotion dur="0.8s" path={d} fill="freeze" />
        </circle>
      )}
    </g>
  );
}

/** A check mark that draws itself when the scene reaches beat `at`. */
export function Tick({ x, y, at = 0, size = 10, stroke = C.onAccent }: { x: number; y: number; at?: number; size?: number; stroke?: string }) {
  const { beat } = useBeat();
  const on = beat >= at;
  const d = `M${x - size * 0.5} ${y} l${size * 0.35} ${size * 0.4} l${size * 0.65} ${-size * 0.8}`;
  return <motion.path d={d} fill="none" stroke={stroke} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.35, ease: EASE }} />;
}

/** A dot that fills with the accent once the scene reaches beat `at`. */
export function Dot({ cx, cy, r = 7, at = 0, ring = false }: { cx: number; cy: number; r?: number; at?: number; ring?: boolean }) {
  const { beat } = useBeat();
  const on = beat >= at;
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={C.paper} stroke={C.line} strokeWidth={1.5} />
      <motion.circle cx={cx} cy={cy} r={r} fill={C.accent} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }} style={{ transformBox: "fill-box", transformOrigin: "center" }} transition={{ duration: 0.35, ease: EASE }} />
      {ring && <Between from={at} to={at}><circle cx={cx} cy={cy} r={r + 5} fill="none" stroke={C.accent} strokeOpacity={0.45} /></Between>}
    </>
  );
}

/** A horizontal bar that fills to `pct` (0 to 1) at beat `at`. */
export function Fill({ x, y, w, h = 6, pct, at = 0 }: { x: number; y: number; w: number; h?: number; pct: number; at?: number }) {
  const { beat } = useBeat();
  const on = beat >= at;
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={C.faint} />
      <motion.rect x={x} y={y} height={h} rx={h / 2} fill={C.accent} initial={false} animate={{ width: on ? Math.max(h, w * pct) : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.7, ease: EASE }} />
    </>
  );
}
