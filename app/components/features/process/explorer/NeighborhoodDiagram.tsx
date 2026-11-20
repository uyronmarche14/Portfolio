"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { neighborhoodGroups, sideCaption, type ExplorerNode, type Side } from "@/lib/data/explorerMap";

const W = 132;
const H = 40;
const CW = 168;
const CH = 52;
const GAP_X = 40;
const GAP_Y = 34;
const PER_ROW = 3;
const MAX_PER_SIDE = 9;

interface Placed {
  node: ExplorerNode;
  x: number;
  y: number;
  w: number;
  h: number;
}

const short = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);

/**
 * A small, static picture of an item and its neighbours: what comes before it on the left, what comes after on the right, related steps and
 * documents above, tools below. Plain SVG (no canvas, no animation), clickable, and capped so it stays readable; the full lists sit under it.
 */
export default function NeighborhoodDiagram({ center, onSelect }: { center: ExplorerNode; onSelect: (id: string) => void }) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  // clicking a node grows it into the centre while everything else fades, then opens it
  const pick = (id: string) => {
    if (reduce) return onSelect(id);
    if (picked) return;
    setPicked(id);
    // start the navigation while the node is still growing, so the next page is ready as the animation lands
    timer.current = window.setTimeout(() => onSelect(id), 200);
  };
  const groups = neighborhoodGroups(center.id);
  const placed: Record<Side, Placed[]> = { left: [], right: [], top: [], bottom: [] };
  const hidden: Record<Side, number> = { left: 0, right: 0, top: 0, bottom: 0 };
  (Object.keys(groups) as Side[]).forEach((s) => {
    hidden[s] = Math.max(0, groups[s].length - MAX_PER_SIDE);
  });

  // columns left and right of the centre, stacked and centred on it
  const col = (side: "left" | "right") => {
    const list = groups[side].slice(0, MAX_PER_SIDE);
    const total = list.length * H + (list.length - 1) * 10;
    return list.map((g, i) => ({ node: g.node, x: side === "left" ? -(GAP_X + W) : CW + GAP_X, y: CH / 2 - total / 2 + i * (H + 10), w: W, h: H }));
  };
  placed.left = col("left");
  placed.right = col("right");
  const colTop = Math.min(0, ...placed.left.map((p) => p.y), ...placed.right.map((p) => p.y));
  const colBottom = Math.max(CH, ...placed.left.map((p) => p.y + p.h), ...placed.right.map((p) => p.y + p.h));

  const row = (side: "top" | "bottom") => {
    const list = groups[side].slice(0, MAX_PER_SIDE);
    const out: Placed[] = [];
    let edge = side === "top" ? colTop - GAP_Y : colBottom + GAP_Y;
    for (let i = 0; i < list.length; i += PER_ROW) {
      const line = list.slice(i, i + PER_ROW);
      const totalW = line.length * W + (line.length - 1) * 10;
      const y = side === "top" ? edge - H : edge;
      line.forEach((g, j) => out.push({ node: g.node, x: CW / 2 - totalW / 2 + j * (W + 10), y, w: W, h: H }));
      edge = side === "top" ? y - 10 : y + H + 10;
    }
    return out;
  };
  placed.top = row("top");
  placed.bottom = row("bottom");

  const all = [...placed.left, ...placed.right, ...placed.top, ...placed.bottom];
  const minX = Math.min(0, ...all.map((p) => p.x)) - 12;
  const maxX = Math.max(CW, ...all.map((p) => p.x + p.w)) + 12;
  const minY = Math.min(0, ...all.map((p) => p.y)) - 26;
  const maxY = Math.max(CH, ...all.map((p) => p.y + p.h)) + 12;

  const caption = (side: Side, list: Placed[]) => {
    if (!list.length) return null;
    const x = Math.min(...list.map((p) => p.x));
    const y = Math.min(...list.map((p) => p.y)) - 9;
    return (
      <text key={`cap-${side}`} x={x} y={y} fontSize={9} letterSpacing={1.2} fill="rgb(var(--foreground) / 0.45)" fontFamily="var(--font-mono), monospace">
        {sideCaption(center, side).toUpperCase()}
        {hidden[side] > 0 ? `  +${hidden[side]}` : ""}
      </text>
    );
  };

  const link = (p: Placed, side: Side) => {
    const cx = CW / 2;
    const cy = CH / 2;
    const px = p.x + p.w / 2;
    const py = p.y + p.h / 2;
    let d: string;
    if (side === "left") d = `M${p.x + p.w},${py} C${p.x + p.w + 20},${py} ${-20},${cy} 0,${cy}`;
    else if (side === "right") d = `M${CW},${cy} C${CW + 20},${cy} ${p.x - 20},${py} ${p.x},${py}`;
    else if (side === "top") d = `M${cx},0 C${cx},-14 ${px},${p.y + p.h + 14} ${px},${p.y + p.h}`;
    else d = `M${cx},${CH} C${cx},${CH + 14} ${px},${p.y - 14} ${px},${p.y}`;
    return <path key={`l-${p.node.id}`} d={d} fill="none" stroke="rgb(var(--foreground) / 0.28)" strokeWidth={1.2} />;
  };

  const box = (p: Placed) => {
    const mine = picked === p.node.id;
    const grow = { x: CW / 2 - (p.x + p.w / 2), y: CH / 2 - (p.y + p.h / 2), scale: CW / p.w, opacity: 1 };
    return (
      <motion.g
        key={p.node.id}
        role="button"
        tabIndex={0}
        aria-label={`Open ${p.node.title}`}
        style={{ cursor: "pointer", outline: "none", transformBox: "fill-box", transformOrigin: "center" }}
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={picked ? (mine ? grow : { opacity: 0, scale: 0.9 }) : { opacity: 1, scale: 1, x: 0, y: 0 }}
        whileHover={picked || reduce ? undefined : { scale: 1.05 }}
        transition={{ duration: mine ? 0.32 : 0.2, ease: [0.32, 0.72, 0, 1] }}
        onPointerEnter={() => router.prefetch(`/process/${p.node.id}`)}
        onFocus={() => router.prefetch(`/process/${p.node.id}`)}
        onClick={() => pick(p.node.id)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pick(p.node.id)}
      >
        <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={10} fill="rgb(var(--card))" stroke="rgb(var(--foreground) / 0.2)" />
        <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 4} textAnchor="middle" fontSize={11} fill="rgb(var(--foreground))" fontFamily="var(--font-sans), sans-serif">
          {short(p.node.title, 19)}
        </text>
      </motion.g>
    );
  };

  return (
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} role="group" aria-label={`${center.title} and what it connects to`} className="h-auto w-full">
      <motion.g animate={{ opacity: picked ? 0 : 1 }} transition={{ duration: 0.2 }}>
        {(["left", "right", "top", "bottom"] as Side[]).flatMap((s) => placed[s].map((p) => link(p, s)))}
        {(["left", "right", "top", "bottom"] as Side[]).map((s) => caption(s, placed[s]))}
      </motion.g>
      {all.map(box)}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={picked ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: picked ? 0.25 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x={0} y={0} width={CW} height={CH} rx={12} fill="rgb(var(--primary) / 0.1)" stroke="rgb(var(--primary))" strokeWidth={1.5} />
        <text x={CW / 2} y={CH / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill="rgb(var(--foreground))" fontFamily="var(--font-sans), sans-serif">
          {short(center.title, 22)}
        </text>
      </motion.g>
    </svg>
  );
}
