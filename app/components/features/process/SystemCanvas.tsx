"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronRight, Circle, FileText, Diamond } from "lucide-react";
import { createElement, memo, useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";
import ReactFlow, {
  BaseEdge,
  Background,
  ConnectionMode,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlowProvider,
  getBezierPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import {
  GEOM,
  LANES,
  LANE_BOUNDS,
  TOOL_CATEGORIES,
  egoCaptions,
  egoLayout,
  focusSet,
  layout,
  toolBlock,
  stages,
  sysEdges,
  sysNodes,
  type ArtifactNode,
  type Lane,
  type PipelineNode,
  type ProcessSysNode,
  type SysEdge,
  type SysNode,
  type ToolNode,
} from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "./evidence";
import { toolIcon } from "./toolIcons";

export type Vis = "idle" | "dim" | "near" | "path" | "done" | "active" | "focus";
export type EdgeVis = "idle" | "dim" | "path" | "done" | "focus";
/** Where the camera should go. `nonce` makes a repeated request (same target) still animate. */
export type Camera = { type: "lane"; lane: Lane | "all"; nonce: number } | { type: "follow"; id: string; nonce: number };

const toneVar = (tone: string) => `rgb(var(--tone-${tone}))`;
const GATE_CLIP = "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)";

interface NodeData {
  node: SysNode;
  tone: string;
  vis: Vis;
  selected: boolean;
  /** drawn size (the selection view shrinks big groups of tools into compact chips) */
  w: number;
  h: number;
  compact: boolean;
  /** position in the node list, for the staggered entrance */
  index: number;
  /** flips 0/1 on every selection, so connected nodes replay their pop (it is 0 for nodes that do not pop) */
  pop: 0 | 1;
  /** play the staggered entrance (off for big graphs, where it would be many animations at once) */
  enter: boolean;
}

const lit = (v: Vis) => v === "path" || v === "done" || v === "active" || v === "focus" || v === "near";

/** Four handles are enough: with a loose connection mode every one of them can start or end a link. */
function Handles() {
  const cls = "!h-1.5 !w-1.5 !border-0 !bg-transparent";
  return (
    <>
      <Handle id="l" type="source" position={Position.Left} className={cls} />
      <Handle id="r" type="source" position={Position.Right} className={cls} />
      <Handle id="t" type="source" position={Position.Top} className={cls} />
      <Handle id="b" type="source" position={Position.Bottom} className={cls} />
    </>
  );
}

/** Entrance, hover lift, dimming, the pop when a node joins the selection, and the pulse ring on the selected node. CSS only, so a node costs one cheap render. */
function Shell({ data, radius, children }: { data: NodeData; radius: number; children: ReactNode }) {
  const active = data.vis === "active";
  const marked = active || data.selected;
  const popping = data.vis === "focus" || active;
  return (
    <div className={cn("relative cursor-pointer", data.enter && "sys-node-in")} style={{ width: data.w, height: data.h, animationDelay: data.enter ? `${Math.min(700, data.index * 9)}ms` : undefined }}>
      <Handles />
      <div className={cn("h-full w-full", !active && "sys-lift")} style={{ opacity: data.vis === "dim" ? 0.22 : 1, transform: active ? "scale(1.04)" : undefined }}>
        <div className={cn("h-full w-full", popping && (data.pop ? "sys-pop-b" : "sys-pop-a"))} style={popping ? { animationDelay: `${(data.index % 9) * 40}ms` } : undefined}>
          {children}
        </div>
      </div>
      {marked && <span aria-hidden="true" className="pointer-events-none absolute -inset-[3px] border-2 border-primary" style={{ borderRadius: radius + 3 }} />}
      {marked && <span aria-hidden="true" className="sys-ping pointer-events-none absolute -inset-[3px] border-2 border-primary/60" style={{ borderRadius: radius + 3 }} />}
    </div>
  );
}

const KIND_GLYPH = { activity: Circle, document: FileText, gate: Diamond } as const;

function StepNode({ data }: NodeProps<NodeData>) {
  const n = data.node as ProcessSysNode;
  const color = toneVar(data.tone);
  const on = lit(data.vis) || data.selected;
  const kind = n.kind === "gate" ? "gate" : n.kind === "artifact" ? "document" : "activity";
  const Glyph = KIND_GLYPH[kind];
  const body = (
    <div className="flex h-full items-center gap-2.5 px-3.5" title={`${kind} · ${n.evidence}`}>
      <EvidenceDot evidence={n.evidence} />
      <p className="line-clamp-3 min-w-0 flex-1 text-[13px] font-medium leading-tight text-foreground">{n.title}</p>
      <Glyph aria-hidden="true" className="h-3 w-3 shrink-0 text-foreground/30" />
    </div>
  );
  return (
    <Shell data={data} radius={12}>
      {n.kind === "gate" ? (
        <div className="h-full w-full" style={{ clipPath: GATE_CLIP, background: on ? color : "rgb(var(--foreground) / 0.22)", padding: 1.5 }}>
          <div className="h-full w-full" style={{ clipPath: GATE_CLIP, background: data.vis === "active" ? `color-mix(in srgb, ${color} 16%, rgb(var(--card)))` : "rgb(var(--card))" }}>
            {body}
          </div>
        </div>
      ) : (
        <div className="h-full w-full rounded-xl border bg-card" style={{ borderColor: on ? color : "rgb(var(--foreground) / 0.14)", background: data.vis === "active" ? `color-mix(in srgb, ${color} 12%, rgb(var(--card)))` : undefined }}>
          {body}
        </div>
      )}
    </Shell>
  );
}

function ArtifactCard({ data }: NodeProps<NodeData>) {
  const n = data.node as ArtifactNode;
  const color = toneVar(data.tone);
  const on = lit(data.vis) || data.selected;
  return (
    <Shell data={data} radius={10}>
      <div className="relative flex h-full w-full items-center gap-2.5 overflow-hidden rounded-lg border bg-card px-3.5" style={{ borderColor: on ? color : "rgb(var(--foreground) / 0.14)", borderStyle: "dashed" }} title={`document · ${n.evidence}`}>
        <EvidenceDot evidence={n.evidence} />
        <p className="line-clamp-3 min-w-0 flex-1 text-[12.5px] font-medium leading-tight text-foreground">{n.title}</p>
        <FileText aria-hidden="true" className="h-3 w-3 shrink-0 text-foreground/30" />
      </div>
    </Shell>
  );
}

function ToolCard({ data }: NodeProps<NodeData>) {
  const n = data.node as ToolNode;
  const color = toneVar(data.tone);
  const on = lit(data.vis) || data.selected;
  if (data.compact) {
    return (
      <Shell data={data} radius={9999}>
        <div className="flex h-full w-full items-center gap-2 overflow-hidden rounded-full border bg-card pl-2 pr-3" style={{ borderColor: on ? color : "rgb(var(--foreground) / 0.14)" }} title={n.evidence}>
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
            {createElement(toolIcon(n), { size: 13 })}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-foreground">{n.title}</span>
          <EvidenceDot evidence={n.evidence} className="h-1.5 w-1.5" />
        </div>
      </Shell>
    );
  }
  return (
    <Shell data={data} radius={9999}>
      <div className="flex h-full w-full items-center gap-3 overflow-hidden rounded-full border bg-card pl-3 pr-4" style={{ borderColor: on ? color : "rgb(var(--foreground) / 0.14)" }} title={n.evidence}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}>
          {createElement(toolIcon(n), { size: 17 })}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium leading-tight text-foreground">{n.title}</span>
        <EvidenceDot evidence={n.evidence} />
      </div>
    </Shell>
  );
}

function PipeCard({ data }: NodeProps<NodeData>) {
  const n = data.node as PipelineNode;
  const color = toneVar(data.tone);
  const on = lit(data.vis) || data.selected;
  const target = n.evidence === "concept";
  return (
    <Shell data={data} radius={12}>
      <div className="flex h-full w-full flex-col justify-center gap-1 rounded-xl border bg-card px-3" style={{ borderColor: on ? color : "rgb(var(--foreground) / 0.14)", borderStyle: target ? "dashed" : "solid" }} title={n.evidence}>
        <p className="flex items-center gap-2 text-[13px] font-medium leading-tight text-foreground">
          <EvidenceDot evidence={n.evidence} className="h-1.5 w-1.5" />
          <span className="line-clamp-2">{n.title}</span>
        </p>
        <p className="truncate pl-3.5 font-mono text-[10px] text-foreground/45">{n.command ?? "target"}</p>
      </div>
    </Shell>
  );
}

interface BandData {
  title: string;
  tone: string;
  /** 1-based position, for numbered stage headers */
  number?: number;
  /** draw a small arrow after the header, to show direction */
  arrow?: boolean;
}

function BandNode({ data }: NodeProps<BandData>) {
  const color = toneVar(data.tone);
  return (
    <div className="pointer-events-none relative h-full w-full rounded-2xl" style={{ background: `color-mix(in srgb, ${color} 4%, transparent)` }}>
      {data.title && (
        <div className="mx-3 mt-3 flex items-baseline gap-2 border-b pb-2" style={{ borderColor: `color-mix(in srgb, ${color} 22%, transparent)` }}>
          {data.number && <span className="font-mono text-[11px]" style={{ color }}>{String(data.number).padStart(2, "0")}</span>}
          <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-foreground/70">{data.title}</span>
        </div>
      )}
      {data.arrow && <ChevronRight aria-hidden="true" className="absolute -right-5 top-[14px] h-4 w-4 text-foreground/25" />}
    </div>
  );
}

function LaneLabel({ data }: NodeProps<{ title: string; blurb: string }>) {
  return (
    <div className="pointer-events-none">
      <p className="font-display text-[28px] leading-none tracking-tight text-foreground/85">{data.title}</p>
      <p className="mt-1.5 text-[12px] text-foreground/45">{data.blurb}</p>
    </div>
  );
}

function CaptionNode({ data }: NodeProps<{ text: string }>) {
  return <p className="pointer-events-none whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/40">{data.text}</p>;
}

interface PacketData {
  packets: boolean;
  delay: number;
}

/** A normal curved link, plus small dots that travel along it while it is part of the selection. */
function PacketEdge(props: EdgeProps<PacketData>) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd, label, labelStyle, labelBgStyle, labelBgPadding, labelBgBorderRadius, interactionWidth, data } = props;
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        labelX={labelX}
        labelY={labelY}
        label={label}
        labelStyle={labelStyle}
        labelBgStyle={labelBgStyle}
        labelBgPadding={labelBgPadding}
        labelBgBorderRadius={labelBgBorderRadius}
        labelShowBg
        style={style}
        markerEnd={markerEnd}
        interactionWidth={interactionWidth}
      />
      {data?.packets && (
        <circle r="3.5" fill="rgb(var(--primary))">
          <animateMotion dur="1.8s" begin={`${data.delay}s`} repeatCount="indefinite" path={path} />
        </circle>
      )}
    </>
  );
}

const NODE_TYPES = { step: memo(StepNode), artifact: memo(ArtifactCard), tool: memo(ToolCard), pipe: memo(PipeCard), band: memo(BandNode), lane: memo(LaneLabel), caption: memo(CaptionNode) };
const EDGE_TYPES = { packet: PacketEdge };

const toneFor = (n: SysNode): string => {
  switch (n.lane) {
    case "process":
    case "artifact":
      return stages.find((s) => s.id === n.stage)?.tone ?? "violet";
    case "tool":
      return TOOL_CATEGORIES.find((c) => c.id === n.category)?.tone ?? "violet";
    case "pipeline":
      return n.col < 2 ? "violet" : n.col < 9 ? "teal" : "amber";
  }
};
const typeFor = (n: SysNode) => (n.lane === "process" ? "step" : n.lane === "artifact" ? "artifact" : n.lane === "tool" ? "tool" : "pipe");

function bandsFor(lanes: Lane[], hidden: boolean): Node[] {
  const out: Node[] = [];
  const mk = (id: string, x: number, y: number, w: number, h: number, data: BandData): Node => ({
    id,
    type: "band",
    position: { x, y },
    width: w,
    height: h,
    data,
    style: { width: w, height: h, opacity: hidden ? 0 : 1, transition: "opacity 400ms" },
    draggable: false,
    selectable: false,
    focusable: false,
    zIndex: -1,
  });
  // big lane titles, only when more than one lane is on screen (otherwise the page itself says what it is)
  if (lanes.length > 1) {
    LANES.filter((l) => lanes.includes(l.id)).forEach((l) => {
      const b = LANE_BOUNDS[l.id];
      out.push({ id: `label-${l.id}`, type: "lane", position: { x: b.x + 6, y: b.y - 62 }, width: 420, height: 52, data: { title: l.title, blurb: l.blurb }, style: { opacity: hidden ? 0 : 1, transition: "opacity 400ms" }, draggable: false, selectable: false, focusable: false, zIndex: -1 });
    });
  }
  if (lanes.includes("process")) {
    stages.forEach((st, i) => out.push(mk(`band-p-${st.id}`, i * GEOM.colW - 10, LANE_BOUNDS.process.y, GEOM.nodeW + 20, LANE_BOUNDS.process.h, { title: st.title, tone: st.tone, number: i + 1, arrow: i < stages.length - 1 })));
  }
  if (lanes.includes("artifact")) {
    stages.forEach((st, i) => out.push(mk(`band-a-${st.id}`, i * GEOM.colW - 10, LANE_BOUNDS.artifact.y, GEOM.nodeW + 20, LANE_BOUNDS.artifact.h, { title: st.title, tone: st.tone, number: i + 1 })));
  }
  if (lanes.includes("tool")) {
    TOOL_CATEGORIES.forEach((c, i) => {
      const b = toolBlock(i);
      out.push(mk(`band-t-${c.id}`, b.x, b.y, b.w, b.h, { title: c.title, tone: c.tone }));
    });
  }
  if (lanes.includes("pipeline")) {
    const y = LANE_BOUNDS.pipeline.y;
    const h = LANE_BOUNDS.pipeline.h;
    const c = GEOM.pipeColW;
    out.push(mk("band-l-local", -10, y, 2 * c - 10, h, { title: "On my machine", tone: "violet" }));
    out.push(mk("band-l-ci", 2 * c - 10, y, 7 * c - 10, h, { title: "GitHub Actions: Code Quality Check", tone: "teal" }));
    out.push(mk("band-l-host", 9 * c - 10, y, c + 10, h, { title: "Release", tone: "amber" }));
  }
  return out;
}

const CROSS = new Set(["produces", "feeds", "uses", "checks"]);

/** Space the floating controls take, so a framed target is never hidden behind them. */
const INSET = { top: 120, bottomIdle: 40, bottomHud: 110, left: 24 };

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const unionRects = (rs: Rect[]): Rect => {
  const x = Math.min(...rs.map((r) => r.x));
  const y = Math.min(...rs.map((r) => r.y));
  const r = Math.max(...rs.map((b) => b.x + b.w));
  const b = Math.max(...rs.map((q) => q.y + q.h));
  return { x, y, w: r - x, h: b - y };
};

const allBounds = (): Rect => unionRects(Object.values(LANE_BOUNDS));
const withTitle = (r: Rect): Rect => ({ ...r, y: r.y - 70, h: r.h + 70 });
const laneRect = (lane: Lane | "all"): Rect => withTitle(lane === "all" ? allBounds() : LANE_BOUNDS[lane]);

type HandlePair = { sourceHandle: string; targetHandle: string };
/** Pick the sides a link leaves and arrives on from where the two nodes actually are. */
function handlesBetween(s: Rect, t: Rect): HandlePair {
  const dx = t.x + t.w / 2 - (s.x + s.w / 2);
  const dy = t.y + t.h / 2 - (s.y + s.h / 2);
  if (Math.abs(dx) > Math.abs(dy) * 0.6) return dx >= 0 ? { sourceHandle: "r", targetHandle: "l" } : { sourceHandle: "l", targetHandle: "r" };
  return dy >= 0 ? { sourceHandle: "b", targetHandle: "t" } : { sourceHandle: "t", targetHandle: "b" };
}

function Inner({
  lanes,
  nodeVis,
  edgeVis,
  visibleEdgeIds,
  ego,
  selectedNode,
  selectedEdge,
  onNode,
  onEdge,
  onOpen,
  onPane,
  camera,
  rightInset,
  popTick,
  topInset,
}: {
  lanes: Lane[];
  nodeVis: Record<string, Vis>;
  edgeVis: Record<string, EdgeVis>;
  visibleEdgeIds: Set<string>;
  /** the node whose connections are split out around it, or null for the normal lane layout */
  ego: string | null;
  selectedNode: string | null;
  selectedEdge: string | null;
  onNode: (id: string) => void;
  onEdge: (id: string) => void;
  /** double-click on a node: open its sheet */
  onOpen: (id: string) => void;
  onPane: () => void;
  camera: Camera;
  /** width taken by the sheet, so framing leaves it free */
  rightInset: number;
  /** bumps on every selection so connected nodes replay their pop */
  popTick: number;
  /** space above the canvas taken by floating controls (defaults to room for the site navbar) */
  topInset?: number;
}) {
  const reduce = useReducedMotion();
  const rf = useReactFlow();
  const wrap = useRef<HTMLDivElement>(null);
  const ready = useRef(false);

  const egoBoxes = useMemo(() => (ego ? egoLayout(ego) : null), [ego]);
  const captions = useMemo(() => (ego ? egoCaptions(ego) : []), [ego]);
  // Hovering lights up a node's own lines. This is done by toggling a class on the page elements directly, so a hover never re-renders the canvas.
  const hoverEdges = useRef<string[]>([]);
  const onHover = useCallback(
    (id: string | null) => {
      const root = wrap.current;
      if (!root) return;
      hoverEdges.current.forEach((eid) => root.querySelector(`[data-testid="rf__edge-${eid}"]`)?.classList.remove("sys-edge-hot"));
      hoverEdges.current = [];
      root.classList.toggle("sys-hovering", Boolean(id) && !ego);
      if (!id || ego) return;
      const ids = [...focusSet(id).edges];
      ids.forEach((eid) => root.querySelector(`[data-testid="rf__edge-${eid}"]`)?.classList.add("sys-edge-hot"));
      hoverEdges.current = ids;
    },
    [ego]
  );

  /** The viewport that frames `rect` in the free area (the canvas minus the floating controls). */
  const viewportFor = useCallback((rect: Rect, opts: { rightInset?: number; bottomInset?: number; zoom?: number; maxZoom?: number } = {}) => {
    const box = wrap.current?.getBoundingClientRect();
    if (!box) return null;
    const right = opts.rightInset ?? 0;
    const bottom = opts.bottomInset ?? INSET.bottomIdle;
    const availW = box.width - INSET.left - right;
    const availH = box.height - (topInset ?? INSET.top) - bottom;
    const pad = 28;
    const fitZoom = Math.min((availW - pad * 2) / rect.w, (availH - pad * 2) / rect.h);
    const zoom = opts.zoom ?? Math.min(opts.maxZoom ?? 1.25, Math.max(0.2, fitZoom));
    return { x: INSET.left + (availW - rect.w * zoom) / 2 - rect.x * zoom, y: INSET.top + (availH - rect.h * zoom) / 2 - rect.y * zoom, zoom };
  }, [topInset]);

  const move = useCallback(
    (v: { x: number; y: number; zoom: number } | null, duration: number) => {
      if (v) rf.setViewport(v, { duration: reduce ? 0 : duration });
    },
    [rf, reduce]
  );

  const runCamera = useCallback(
    (cam: Camera, instant = false) => {
      if (cam.type === "lane") move(viewportFor(laneRect(cam.lane), { maxZoom: 1.3 }), instant ? 0 : 750);
      else {
        const n = sysNodes.find((x) => x.id === cam.id);
        if (n) move(viewportFor(layout(n), { bottomInset: INSET.bottomHud, zoom: Math.max(0.8, rf.getZoom()) }), instant ? 0 : 900);
      }
    },
    [move, rf, viewportFor]
  );

  // The selection frames its own neighbourhood; with nothing selected the camera goes where the toolbar sent it.
  useEffect(() => {
    if (!ready.current) return;
    if (egoBoxes) move(viewportFor(unionRects([...egoBoxes.values()]), { rightInset, bottomInset: INSET.bottomHud, maxZoom: 1.2 }), 850);
    else runCamera(camera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [egoBoxes, rightInset, camera]);

  // Data objects keep their identity while their content is unchanged, so memoized nodes skip rendering when a selection changes elsewhere.
  const dataCache = useRef(new Map<string, { sig: string; data: NodeData }>());
  const stable = (id: string, data: NodeData): NodeData => {
    const sig = `${data.vis}|${data.selected}|${data.w}|${data.h}|${data.compact}|${data.index}|${data.pop}|${data.enter}`;
    const hit = dataCache.current.get(id);
    if (hit && hit.sig === sig) return hit.data;
    dataCache.current.set(id, { sig, data });
    return data;
  };

  const nodes = useMemo<Node[]>(() => {
    const visible = sysNodes.filter((n) => (egoBoxes ? egoBoxes.has(n.id) : lanes.includes(n.lane)));
    const enter = visible.length <= 45;
    const steps: Node[] = visible.map((n, i) => {
      const inEgo = egoBoxes?.get(n.id);
      const b = inEgo ?? layout(n);
      const vis: Vis = inEgo ? (n.id === ego ? "active" : "focus") : nodeVis[n.id] ?? "idle";
      const pops = vis === "focus" || vis === "active";
      return {
        id: n.id,
        type: typeFor(n),
        position: { x: b.x, y: b.y },
        width: b.w,
        height: b.h,
        data: stable(n.id, { node: n, tone: toneFor(n), vis, selected: n.id === selectedNode, w: b.w, h: b.h, compact: n.lane === "tool" && b.w < GEOM.toolNodeW, index: i, pop: pops ? ((popTick % 2) as 0 | 1) : 0, enter }),
        draggable: false,
        zIndex: 2,
      };
    });
    if (egoBoxes) {
      const caps: Node[] = captions.map((c) => ({ id: c.id, type: "caption", position: { x: c.x, y: c.y }, width: 220, height: 18, data: { text: c.text }, draggable: false, selectable: false, focusable: false, zIndex: 1 }));
      return [...steps, ...caps];
    }
    return [...bandsFor(lanes, false), ...steps];
  }, [lanes, nodeVis, selectedNode, egoBoxes, ego, captions, popTick]);

  const edges = useMemo<Edge[]>(() => {
    const laneOf = new Map(sysNodes.map((n) => [n.id, n.lane]));
    const baseBox = new Map(sysNodes.map((n) => [n.id, layout(n)]));
    let k = 0;
    const list = egoBoxes
      ? sysEdges.filter((e: SysEdge) => (e.from === ego || e.to === ego) && egoBoxes.has(e.from) && egoBoxes.has(e.to))
      : sysEdges.filter((e: SysEdge) => lanes.includes(laneOf.get(e.from)!) && lanes.includes(laneOf.get(e.to)!) && (!CROSS.has(e.kind) || visibleEdgeIds.has(e.id)));
    return list.map((e) => {
      const vis: EdgeVis = egoBoxes ? "focus" : edgeVis[e.id] ?? "idle";
      const resting = vis === "idle";
      const hot = vis === "path" || vis === "done" || vis === "focus" || e.id === selectedEdge;
      const stroke = hot ? "rgb(var(--primary))" : "rgb(var(--foreground))";
      const opacity = vis === "dim" ? 0.06 : e.id === selectedEdge ? 1 : resting ? (e.kind === "loop" || CROSS.has(e.kind) ? 0.22 : 0.11) : vis === "path" ? 0.75 : 0.95;
      let pair: HandlePair = { sourceHandle: "r", targetHandle: "l" };
      if (egoBoxes) pair = handlesBetween(egoBoxes.get(e.from)!, egoBoxes.get(e.to)!);
      else if (e.kind === "loop") pair = { sourceHandle: "b", targetHandle: "b" };
      else if (CROSS.has(e.kind)) pair = handlesBetween(baseBox.get(e.from)!, baseBox.get(e.to)!);
      // moving dots and dashes only for small selections: dozens at once is exactly what makes a big hub slow
      const few = list.length <= 14;
      const packets = !reduce && few && (vis === "focus" || e.id === selectedEdge);
      return {
        id: e.id,
        source: e.from,
        target: e.to,
        ...pair,
        type: "packet",
        data: { packets, delay: (k++ % 6) * 0.3 } satisfies PacketData,
        label: egoBoxes ? e.label : e.kind === "loop" || e.kind === "flow" ? e.label : undefined,
        animated: !reduce && few && (vis === "done" || vis === "focus"),
        interactionWidth: 18,
        style: { stroke, opacity, strokeWidth: e.id === selectedEdge ? 3 : vis === "done" || vis === "focus" ? 2.2 : 1.5, strokeDasharray: e.kind === "loop" ? "6 5" : e.kind === "uses" ? "2 4" : e.kind === "checks" ? "8 4" : undefined },
        markerEnd: { type: MarkerType.ArrowClosed, color: stroke, width: 14, height: 14 },
        labelStyle: { fontSize: 11, fill: "rgb(var(--foreground))", opacity: vis === "dim" ? 0.2 : 0.85 },
        labelBgStyle: { fill: "rgb(var(--background))" },
        labelBgPadding: [4, 2] as [number, number],
        labelBgBorderRadius: 4,
      };
    });
  }, [lanes, edgeVis, visibleEdgeIds, selectedEdge, reduce, egoBoxes, ego]);

  const onInit = useCallback(
    (_: ReactFlowInstance) => {
      ready.current = true;
      runCamera(camera, true);
    },
    [runCamera, camera]
  );

  return (
    <div ref={wrap} className="sys-map h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        connectionMode={ConnectionMode.Loose}
        onInit={onInit}
        minZoom={0.15}
        maxZoom={1.6}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        onNodeClick={(_, node) => {
          if (node.type !== "band" && node.type !== "lane" && node.type !== "caption") onNode(node.id);
        }}
        onNodeDoubleClick={(_, node) => {
          if (node.type !== "band" && node.type !== "lane" && node.type !== "caption") onOpen(node.id);
        }}
        onNodeMouseEnter={(_, node) => {
          if (node.type !== "band" && node.type !== "lane" && node.type !== "caption") onHover(node.id);
        }}
        onNodeMouseLeave={() => onHover(null)}
        onEdgeClick={(_, edge) => onEdge(edge.id)}
        onPaneClick={onPane}
      >
        <Background gap={28} color="rgb(var(--foreground) / 0.06)" />
        <Controls showInteractive={false} position="bottom-left" className="!bottom-6" />
      </ReactFlow>
    </div>
  );
}

/** The whole system as one canvas. Select a node and its connections split out around it, filling the page. */
export default function SystemCanvas(props: React.ComponentProps<typeof Inner>) {
  return (
    <ReactFlowProvider>
      <Inner {...props} />
    </ReactFlowProvider>
  );
}
