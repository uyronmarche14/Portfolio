"use client";

import { motion, useInView, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { createContext, useContext, useRef, type ReactNode } from "react";

/** Theme-token colors shared by every experience illustration. */
export const C = {
  ink: "rgb(var(--foreground))",
  line: "rgb(var(--foreground) / 0.1)",
  bar: "rgb(var(--foreground) / 0.2)",
  faint: "rgb(var(--foreground) / 0.07)",
  paper: "rgb(var(--card))",
  accent: "rgb(var(--primary))",
  accentSoft: "rgb(var(--primary) / 0.16)",
  onAccent: "rgb(var(--primary-foreground))",
} as const;

export const MONO = "var(--font-mono), monospace";
export const SANS = "var(--font-sans), sans-serif";

const PlayContext = createContext(false);

/** True while the illustration is on screen and motion is allowed. */
export const usePlay = () => useContext(PlayContext);

/**
 * SVG root. Provides the shared shadow filters and a `play` flag that is only
 * true while the drawing is visible and the user has not asked for reduced motion.
 */
export function VisualFrame({ children }: { children: ReactNode }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  return (
    <PlayContext.Provider value={inView && !reduce}>
      <svg
        ref={ref}
        viewBox="20 30 520 380"
        className="h-full w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="ev-sh1" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="rgb(var(--primary))" floodOpacity="0.22" />
          </filter>
          <filter id="ev-sh2" x="-25%" y="-20%" width="150%" height="160%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="rgb(var(--primary))" floodOpacity="0.34" />
          </filter>
        </defs>
        {children}
      </svg>
    </PlayContext.Provider>
  );
}

interface SurfaceProps {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  /** 0 flat, 1 raised, 2 floating */
  e?: 0 | 1 | 2;
  fill?: string;
}

/** Rounded surface with a hairline ring and a tinted elevation shadow. Floating surfaces drift gently. */
export function Surface({ x, y, w, h, r = 14, e = 1, fill = C.paper }: SurfaceProps) {
  const play = usePlay();
  return (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={C.line}
      filter={e ? `url(#ev-sh${e})` : undefined}
      animate={play && e === 2 ? { y: [y, y - 4, y] } : undefined}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

interface LoopProps {
  /** keyframe pose(s) played on a loop while visible */
  a: TargetAndTransition;
  d?: number;
  times?: number[];
  delay?: number;
  ease?: "linear" | "easeInOut" | "easeOut";
  /** transform origin inside the element's own box (scale animations) */
  origin?: string;
  children: ReactNode;
}

/**
 * Loops `a` while the drawing is visible. When not playing it renders the
 * element's resting pose, so reduced-motion users see a complete drawing.
 */
export function Loop({ a, d = 8, times, delay = 0, ease = "easeInOut", origin = "center", children }: LoopProps) {
  const play = usePlay();
  return (
    <motion.g
      animate={play ? a : undefined}
      transition={{ duration: d, times, ease, delay, repeat: Infinity }}
      style={{ transformBox: "fill-box", transformOrigin: origin }}
    >
      {children}
    </motion.g>
  );
}

export const Text = ({
  x,
  y,
  size = 12,
  fill = C.ink,
  opacity = 1,
  anchor = "start",
  mono = true,
  weight = 400,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  fill?: string;
  opacity?: number;
  anchor?: "start" | "middle" | "end";
  mono?: boolean;
  weight?: number;
  children: ReactNode;
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={fill}
    opacity={opacity}
    textAnchor={anchor}
    fontWeight={weight}
    fontFamily={mono ? MONO : SANS}
  >
    {children}
  </text>
);

const PANEL_W = 488;

/**
 * The single flat panel every role illustration is drawn in: a header strip (title left, tag right) and an aligned content area.
 * Children use LOCAL coordinates: x 22..466 is the content width, y 64.. is below the header. The panel is centered vertically in the frame.
 */
export function Panel({ title, tag, h, children }: { title: string; tag?: string; h: number; children: ReactNode }) {
  const y0 = 30 + (380 - h) / 2;
  return (
    <g transform={`translate(36 ${y0})`}>
      <rect x={0} y={0} width={PANEL_W} height={h} rx={16} fill={C.paper} stroke={C.bar} />
      <Text x={22} y={31} size={11} opacity={0.55}>{title}</Text>
      {tag && <Text x={PANEL_W - 22} y={31} size={11} anchor="end" fill={C.accent}>{tag}</Text>}
      <path d={`M0 46h${PANEL_W}`} stroke={C.line} />
      {children}
    </g>
  );
}

interface GrowProps {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  fill: string;
  /** grow along x from the left edge, or along y from the bottom edge */
  axis: "x" | "y";
  /** fraction of full size at each keyframe, for example [0, 0.7, 0.7, 0] */
  to: number[];
  times?: number[];
  d?: number;
}

/**
 * A bar that grows and shrinks by animating its own width/height (and y), not a CSS scale.
 * Scaling grouped SVG shapes uses the wrong origin here and throws them off to the side. At rest it is drawn full size.
 */
export function Grow({ x, y, w, h, rx = 0, fill, axis, to, times, d = 9 }: GrowProps) {
  const play = usePlay();
  const animate = play
    ? axis === "x"
      ? { width: to.map((f) => w * f) }
      : { height: to.map((f) => h * f), attrY: to.map((f) => y + h * (1 - f)) }
    : undefined;
  return <motion.rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} animate={animate} transition={{ duration: d, times, ease: "easeInOut", repeat: Infinity }} />;
}

/** A stroked path that draws itself in, using the path's own pathLength. Fully drawn at rest. */
export function DrawPath({ d: path, stroke, strokeWidth = 2.4, dur = 9, times }: { d: string; stroke: string; strokeWidth?: number; dur?: number; times?: number[] }) {
  const play = usePlay();
  return (
    <motion.path
      d={path}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={play ? { pathLength: [0, 1, 1, 1], opacity: [1, 1, 1, 0] } : undefined}
      transition={{ duration: dur, times: times ?? [0, 0.5, 0.92, 1], ease: "easeInOut", repeat: Infinity }}
    />
  );
}
