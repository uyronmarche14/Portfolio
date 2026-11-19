"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

import Footer from "@/components/layout/footer";
import { explorerNodeById, tabGroups, tabOf, TABS, type TabId } from "@/lib/data/explorerMap";
import { EVIDENCE, type Evidence } from "@/lib/data/processMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "../evidence";
import SystemSheet, { SHEET_W } from "../SystemSheet";
import ItemSheet, { SheetNav, type SheetTab } from "./ItemSheet";
import ScenariosTab from "./ScenariosTab";
import TabPanel from "./TabPanel";

const MapTab = dynamic(() => import("./MapTab"), { ssr: false, loading: () => <div className="h-[520px]" aria-hidden="true" /> });

const LIST_TABS: TabId[] = ["process", "documents", "tools", "request", "delivery", "operations"];
const EVIDENCE_IDS = Object.keys(EVIDENCE) as Evidence[];
const isTab = (v: string | null): v is TabId => TABS.some((t) => t.id === v);

export default function ProcessExplorer() {
  const [tab, setTab] = useState<TabId>("process");
  const [item, setItem] = useState<string | null>(null);
  const [sheetTab, setSheetTab] = useState<SheetTab>("overview");
  const [query, setQuery] = useState("");
  const [evidence, setEvidence] = useState<Evidence[]>([]);

  // read the deep link once on mount (kept out of the initial state so server and client markup match)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("tab");
    const i = p.get("item");
    if (isTab(t)) setTab(t);
    if (i && explorerNodeById.has(i)) setItem(i);
  }, []);

  const sync = useCallback((t: TabId, i: string | null) => {
    const p = new URLSearchParams();
    if (t !== "process") p.set("tab", t);
    if (i) p.set("item", i);
    const q = p.toString();
    window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
  }, []);

  const changeTab = (t: TabId) => {
    setTab(t);
    setQuery("");
    sync(t, item);
  };
  const open = useCallback(
    (id: string | null, st: SheetTab = "overview") => {
      setItem(id);
      setSheetTab(st);
      sync(tab, id);
    },
    [sync, tab]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && item) open(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, open]);

  // previous / next follow the list of the tab the item lives in
  const siblings = useMemo(() => {
    if (!item) return [] as string[];
    const n = explorerNodeById.get(item);
    const t = n ? tabOf(n) : "process";
    return tabGroups(t).flatMap((g) => g.nodes.map((x) => x.id));
  }, [item]);
  const pos = item ? siblings.indexOf(item) : -1;
  const current = item ? explorerNodeById.get(item) : null;

  const isList = LIST_TABS.includes(tab);
  const toggleEvidence = (e: Evidence) => setEvidence((v) => (v.includes(e) ? v.filter((x) => x !== e) : [...v, e]));
  const openOnMap = (id: string) => {
    setTab("map");
    setItem(id);
    setSheetTab("overview");
    sync("map", id);
  };

  const fullMap = tab === "map";

  return (
    <div className="w-full">
      {fullMap && (
        <div className="fixed inset-0 z-30 bg-background">
          <MapTab focusId={item} rightInset={SHEET_W} onOpenItem={(id) => open(id)} />
          <button
            type="button"
            onClick={() => changeTab("process")}
            className="absolute left-3 top-24 z-20 inline-flex h-9 items-center gap-2 rounded-full border border-foreground/12 bg-background px-4 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to the explorer
          </button>
        </div>
      )}
      <div className={cn("mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8", fullMap && "invisible h-screen overflow-hidden")}>
        <p className="font-mono text-xs text-primary">Process</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">How a request becomes a trusted change</h1>
        <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-foreground/70">
          The steps, the documents they produce, the tools behind them and what it takes to run a site in production. Pick a tab, open anything for the why, the example and how it connects.
        </p>

        <div role="tablist" aria-label="Sections" className="mt-8 flex gap-1 overflow-x-auto border-b border-foreground/10">
          {TABS.map((t, i) => {
            const on = t.id === tab;
            return (
              <div key={t.id} className="flex shrink-0 items-center">
                {t.production && !TABS[i - 1]?.production && <span className="mx-2 hidden font-mono text-[10px] uppercase tracking-wider text-foreground/35 sm:block">Production</span>}
                <button
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => changeTab(t.id)}
                  className={cn("-mb-px border-b-2 px-3 pb-2.5 pt-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", on ? "border-primary font-medium text-foreground" : "border-transparent text-foreground/55 hover:text-foreground/85")}
                >
                  {t.label}
                </button>
              </div>
            );
          })}
        </div>

        {isList && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search this tab"
                aria-label="Search this tab"
                className="h-9 w-64 rounded-full border border-foreground/15 bg-background pl-9 pr-8 text-sm text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground">
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by evidence">
              {EVIDENCE_IDS.map((e) => (
                <button
                  key={e}
                  type="button"
                  aria-pressed={evidence.includes(e)}
                  onClick={() => toggleEvidence(e)}
                  className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", evidence.includes(e) ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 text-foreground/65 hover:border-foreground/30")}
                >
                  <EvidenceDot evidence={e} />
                  {EVIDENCE[e].label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          {isList && <TabPanel tab={tab} query={query} evidence={evidence} selectedId={item} onOpen={(id) => open(id)} />}
          {tab === "scenarios" && <ScenariosTab onOpen={(id) => open(id, "scenarios")} />}
        </div>
      </div>

      <SystemSheet
        open={Boolean(current)}
        label={current?.title ?? ""}
        onClose={() => open(null)}
        footer={
          current && (
            <SheetNav
              label={pos >= 0 ? `${pos + 1} of ${siblings.length}` : ""}
              onPrev={pos > 0 ? () => open(siblings[pos - 1], sheetTab) : undefined}
              onNext={pos >= 0 && pos < siblings.length - 1 ? () => open(siblings[pos + 1], sheetTab) : undefined}
            />
          )
        }
      >
        {item && <ItemSheet id={item} sheetTab={sheetTab} setSheetTab={setSheetTab} onSelect={(id) => open(id, sheetTab)} onOpenMap={openOnMap} />}
      </SystemSheet>

      <Footer />
    </div>
  );
}
