"use client";

import { ArrowLeft, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DocsLayout, DocsRail } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { explorerNodeById, tabGroups, TABS, type TabId } from "@/lib/data/explorerMap";
import { EVIDENCE, type Evidence } from "@/lib/data/processMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "../evidence";
import ProcessSidebar from "./ProcessSidebar";
import ScenariosTab from "./ScenariosTab";
import TabPanel from "./TabPanel";

const MapTab = dynamic(() => import("./MapTab"), { ssr: false, loading: () => <div className="h-[520px]" aria-hidden="true" /> });

const LIST_TABS: TabId[] = ["process", "documents", "tools", "request", "delivery", "operations"];
const EVIDENCE_IDS = Object.keys(EVIDENCE) as Evidence[];
const isTab = (v: string | null): v is TabId => TABS.some((t) => t.id === v);

export default function ProcessExplorer() {
  const [tab, setTab] = useState<TabId>("process");
  const [item, setItem] = useState<string | null>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [evidence, setEvidence] = useState<Evidence[]>([]);

  // a fresh visit to the explorer starts a new trail of visited items
  useEffect(() => {
    try {
      sessionStorage.removeItem("process-trail");
    } catch {}
  }, []);

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
  // every item has its own page
  const open = useCallback((id: string) => router.push(`/process/${id}`), [router]);

  const isList = LIST_TABS.includes(tab);
  const toggleEvidence = (e: Evidence) => setEvidence((v) => (v.includes(e) ? v.filter((x) => x !== e) : [...v, e]));

  const fullMap = tab === "map";

  const rail = useMemo(() => (isList ? tabGroups(tab).map((g) => ({ id: `grp-${g.id}`, label: g.title.replace(/^\d+\s+/, "") })) : []), [isList, tab]);
  const railIds = useMemo(() => rail.map((r) => r.id), [rail]);
  const spy = useScrollSpy(railIds);

  return (
    <>
      {fullMap && (
        <div className="fixed inset-0 z-30 bg-background">
          <MapTab focusId={item} rightInset={0} onOpenItem={open} />
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
      <div className={cn(fullMap && "invisible h-screen overflow-hidden")}>
        <DocsLayout
          wide
          sidebar={
            <>
              <ProcessSidebar tab={tab} onTab={changeTab} />
            </>
          }
          rail={rail.length > 1 ? <DocsRail items={rail} active={spy} /> : undefined}
        >
          <header>
            <p className="font-mono text-xs text-primary">Process</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">How a request becomes a trusted change</h1>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-foreground/70">
              The steps, the documents they produce, the tools behind them and what it takes to run a site in production. Open anything for the why, an example and how it connects.
            </p>
          </header>

          <div role="tablist" aria-label="Sections" className="mt-8 flex gap-1 overflow-x-auto border-b border-foreground/10 lg:hidden">
            {TABS.map((t) => {
              const on = t.id === tab;
              return (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => changeTab(t.id)}
                  className={cn("-mb-px shrink-0 border-b-2 px-3 pb-2.5 pt-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", on ? "border-primary font-medium text-foreground" : "border-transparent text-foreground/55 hover:text-foreground/85")}
                >
                  {t.label}
                </button>
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
            {isList && <TabPanel tab={tab} query={query} evidence={evidence} selectedId={null} onOpen={open} />}
            {tab === "scenarios" && <ScenariosTab onOpen={open} />}
          </div>
        </DocsLayout>
      </div>

      <Footer />
    </>
  );
}
