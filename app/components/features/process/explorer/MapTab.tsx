"use client";

import { Layers, Maximize2, PanelRightOpen, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LANES, focusSet, sysEdges, sysNodeById, sysNodes, type Lane } from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import type { Camera, EdgeVis, Vis } from "../SystemCanvas";
import { LANE_TAG } from "../SystemDetail";

const SystemCanvas = dynamic(() => import("../SystemCanvas"), { ssr: false, loading: () => <div aria-hidden="true" className="h-full w-full" /> });

const ALL: Lane[] = ["process", "artifact", "tool", "pipeline"];
const CROSS = new Set(["produces", "feeds", "uses", "checks"]);
const ICON_BTN =
  "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/12 bg-background text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * The node map, as one tab. It loads only when the tab is opened. Selecting a node re-arranges the map around it; "Details" hands the
 * item to the shared sheet, so the map no longer has a details panel of its own.
 */
export default function MapTab({ focusId: rawFocus, rightInset, onOpenItem }: { focusId: string | null; rightInset: number; onOpenItem: (id: string) => void }) {
  // request-path, release and operations items are not on the map; only start from one that is
  const focusId = rawFocus && sysNodeById.has(rawFocus) ? rawFocus : null;
  const [lanes, setLanes] = useState<Lane[]>(["process"]);
  const [egoId, setEgoId] = useState<string | null>(focusId);
  const [selNode, setSelNode] = useState<string | null>(focusId);
  const [popTick, setPopTick] = useState(0);
  const [layersOpen, setLayersOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [cam, setCam] = useState<Camera>({ type: "lane", lane: "process", nonce: 0 });
  const nonce = useRef(0);
  const timer = useRef<number | null>(null);

  const go = (lane: Lane | "all") => setCam({ type: "lane", lane, nonce: ++nonce.current });
  const choose = (id: string, delay = 0) => {
    setPopTick((t) => t + 1);
    setSelNode(id);
    if (timer.current) window.clearTimeout(timer.current);
    if (delay > 0) timer.current = window.setTimeout(() => setEgoId(id), delay);
    else setEgoId(id);
  };
  const clear = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    setSelNode(null);
    setEgoId(null);
    setLayersOpen(false);
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (layersOpen || searchOpen) {
        setLayersOpen(false);
        setSearchOpen(false);
      } else clear();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [layersOpen, searchOpen, clear]);

  const edgeVis = useMemo<Record<string, EdgeVis>>(() => ({}), []);
  const nodeVis = useMemo<Record<string, Vis>>(() => ({}), []);
  const visibleEdgeIds = useMemo(() => new Set(showAll ? sysEdges.filter((e) => CROSS.has(e.kind)).map((e) => e.id) : []), [showAll]);
  const connections = selNode ? Math.max(0, focusSet(selNode).nodes.size - 1) : 0;
  const selected = selNode ? sysNodeById.get(selNode) : null;
  const matches = query.trim() ? sysNodes.filter((n) => n.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6) : [];

  return (
    <div className="relative h-full w-full overflow-hidden bg-card">
      <div className="absolute inset-0">
        <SystemCanvas
          lanes={lanes}
          nodeVis={nodeVis}
          edgeVis={edgeVis}
          visibleEdgeIds={visibleEdgeIds}
          ego={egoId}
          selectedNode={selNode}
          selectedEdge={null}
          onNode={(id) => choose(id, 240)}
          onEdge={() => undefined}
          onOpen={(id) => {
            choose(id);
            onOpenItem(id);
          }}
          onPane={clear}
          camera={cam}
          rightInset={rightInset}
          popTick={popTick}
          topInset={112}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 flex justify-end px-3">
        <div className="pointer-events-auto relative flex items-center gap-1.5">
          {searchOpen && (
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
              <input
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && matches[0]) {
                    choose(matches[0].id);
                    setQuery("");
                    setSearchOpen(false);
                  }
                }}
                placeholder="Find a step, document or tool"
                aria-label="Find a node on the map"
                className="h-9 w-60 rounded-full border border-foreground/12 bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {matches.length > 0 && (
                <ul className="absolute right-0 z-30 mt-1 w-full overflow-hidden rounded-xl border border-foreground/12 bg-background shadow-soft-lg">
                  {matches.map((m) => (
                    <li key={m.id}>
                      <button type="button" onClick={() => { choose(m.id); setQuery(""); setSearchOpen(false); }} className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-foreground/85 hover:bg-foreground/[0.06] focus-visible:outline-none">
                        <span className="truncate">{m.title}</span>
                        <span className="shrink-0 font-mono text-[10px] uppercase text-foreground/45">{LANE_TAG[m.lane]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <button type="button" className={ICON_BTN} aria-label="Search the map" aria-pressed={searchOpen} onClick={() => { setSearchOpen((v) => !v); setLayersOpen(false); }}>
            <Search aria-hidden="true" className="h-4 w-4" />
          </button>
          <button type="button" className={ICON_BTN} aria-label="Map layers" aria-expanded={layersOpen} onClick={() => { setLayersOpen((v) => !v); setSearchOpen(false); }}>
            <Layers aria-hidden="true" className="h-4 w-4" />
          </button>
          <button type="button" className={ICON_BTN} aria-label="Show the whole map" onClick={() => { clear(); setLanes(ALL); go("all"); }}>
            <Maximize2 aria-hidden="true" className="h-4 w-4" />
          </button>
          {layersOpen && (
            <div role="group" aria-label="Map layers" className="absolute right-0 top-11 w-60 rounded-xl border border-foreground/12 bg-background p-2 shadow-soft-lg">
              {LANES.map((l) => {
                const on = lanes.includes(l.id);
                return (
                  <button key={l.id} type="button" aria-pressed={on} onClick={() => setLanes(on ? lanes.filter((x) => x !== l.id) : [...lanes, l.id])} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-foreground/85 transition-colors hover:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span aria-hidden="true" className={cn("h-2 w-2 rounded-full border", on ? "border-primary bg-primary" : "border-foreground/30")} />
                    {l.title}
                  </button>
                );
              })}
              <button type="button" aria-pressed={showAll} onClick={() => setShowAll((v) => !v)} className="mt-1 flex w-full items-center gap-3 rounded-lg border-t border-foreground/10 px-3 py-2 text-left text-sm text-foreground/85 transition-colors hover:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span aria-hidden="true" className={cn("h-2 w-2 rounded-full border", showAll ? "border-primary bg-primary" : "border-foreground/30")} />
                Show all connections
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-3">
        {selected ? (
          <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-foreground/12 bg-background py-1.5 pl-5 pr-2">
            <p className="flex min-w-0 items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-primary">{LANE_TAG[selected.lane]}</span>
              <span className="truncate text-sm font-medium text-foreground">{selected.title}</span>
              <span className="shrink-0 font-mono text-[11px] text-foreground/50">{connections} connections</span>
            </p>
            <button type="button" onClick={() => onOpenItem(selected.id)} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <PanelRightOpen aria-hidden="true" className="h-3.5 w-3.5" />
              Details
            </button>
            <button type="button" onClick={clear} aria-label="Clear selection" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/55 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <p className="text-xs text-foreground/40">Click a node to explore its connections</p>
        )}
      </div>
    </div>
  );
}
