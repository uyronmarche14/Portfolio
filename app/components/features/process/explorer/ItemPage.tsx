"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { DocsLayout, DocsRail } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { explorerNodeById, roadmapFor, tabGroups, tabOf, TABS } from "@/lib/data/explorerMap";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";

import { EvidenceChip } from "../ProcessDetail";
import { Connections, Overview, Scenarios, Work } from "./ItemSections";
import ProcessSidebar from "./ProcessSidebar";
import Roadmap from "./Roadmap";

const LANE_TAG = { process: "Step", artifact: "Document", tool: "Tool", pipeline: "Pipeline", journey: "Request path", release: "Release", ops: "Operations", code: "Practice" } as const;
const SECTIONS = [
  { id: "roadmap", label: "Roadmap" },
  { id: "overview", label: "Overview" },
  { id: "connections", label: "Connections" },
  { id: "scenarios", label: "Scenarios" },
  { id: "work", label: "In my work" },
];
const IDS = SECTIONS.map((s) => s.id);

const TRAIL_KEY = "process-trail";
const TRAIL_MAX = 6;

const H2 = "scroll-mt-28 border-b border-foreground/10 pb-2 font-display text-2xl tracking-tight text-foreground";

/** One item as a documentation page: overview, connections, scenarios and where it shows up in my work, with previous and next. */
export default function ItemPage({ id }: { id: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const node = explorerNodeById.get(id);
  const active = useScrollSpy(IDS);
  const tab = node ? tabOf(node) : "process";
  const tabLabel = TABS.find((t) => t.id === tab)?.label ?? "Process";

  const { prev, next, pos, total } = useMemo(() => {
    const list = tabGroups(tab).flatMap((g) => g.nodes);
    const i = list.findIndex((x) => x.id === id);
    return { prev: i > 0 ? list[i - 1] : null, next: i >= 0 && i < list.length - 1 ? list[i + 1] : null, pos: i, total: list.length };
  }, [tab, id]);

  // the items visited since the explorer was last open; going back to one of them cuts the trail there
  const [trail, setTrail] = useState<string[]>([]);
  useEffect(() => {
    let list: string[] = [];
    try {
      list = JSON.parse(sessionStorage.getItem(TRAIL_KEY) ?? "[]");
    } catch {}
    const at = list.indexOf(id);
    list = at >= 0 ? list.slice(0, at + 1) : [...list, id].slice(-TRAIL_MAX);
    try {
      sessionStorage.setItem(TRAIL_KEY, JSON.stringify(list));
    } catch {}
    setTrail(list);
  }, [id]);

  const roadmapTitle = roadmapFor(id)?.title ?? "Roadmap";

  if (!node) return null;
  // stay on the same section of the next page, so the move feels continuous instead of jumping back to the top
  const go = (to: string) => router.push(`/process/${to}${active && active !== "roadmap" && active !== "overview" ? `#${active}` : ""}`);

  return (
    <>
      <DocsLayout sidebar={<ProcessSidebar tab={tab} />} rail={<DocsRail items={SECTIONS} active={active} />}>
        <motion.div key={id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}>
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-foreground/50">
          <Link href="/process" className="hover:text-foreground">Process</Link>
          <span className="mx-2 text-foreground/30">/</span>
          <Link href={tab === "process" ? "/process" : `/process?tab=${tab}`} className="hover:text-foreground">{tabLabel}</Link>
        </nav>

        {trail.length > 1 && (
          <nav aria-label="Items you visited" className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
            <span className="mr-1 font-mono text-foreground/40">Trail</span>
            {trail.map((t, i) => {
              const n = explorerNodeById.get(t);
              const last = i === trail.length - 1;
              return (
                <span key={t} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true" className="text-foreground/30">/</span>}
                  {last ? (
                    <span aria-current="page" className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-foreground">{n?.title ?? t}</span>
                  ) : (
                    <Link href={`/process/${t}`} className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-foreground/65 transition-colors hover:border-primary hover:text-foreground">{n?.title ?? t}</Link>
                  )}
                </span>
              );
            })}
          </nav>
        )}

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">{LANE_TAG[node.lane]}</span>
            <EvidenceChip evidence={node.evidence} />
          </div>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">{node.title}</h1>
        </header>

        <section id="roadmap" className="mt-10 scroll-mt-28">
          <h2 className={H2}>{roadmapTitle}</h2>
          <div className="mt-5"><Roadmap key={id} id={id} onSelect={go} /></div>
        </section>
        <section id="overview" className="mt-14 scroll-mt-28">
          <h2 className={H2}>Overview</h2>
          <div className="mt-5"><Overview node={node} onSelect={go} /></div>
        </section>
        <section id="connections" className="mt-14 scroll-mt-28">
          <h2 className={H2}>Connections</h2>
          <div className="mt-5"><Connections node={node} onSelect={go} /></div>
        </section>
        <section id="scenarios" className="mt-14 scroll-mt-28">
          <h2 className={H2}>Scenarios</h2>
          <div className="mt-5"><Scenarios node={node} onSelect={go} /></div>
        </section>
        <section id="work" className="mt-14 scroll-mt-28">
          <h2 className={H2}>In my work</h2>
          <div className="mt-5"><Work node={node} onOpenMap={(x) => router.push(`/process?tab=map&item=${x}`)} /></div>
        </section>

        <nav aria-label="More in this section" className="mt-16 border-t border-foreground/10 pt-6">
          <p className="mb-4 text-center font-mono text-xs text-foreground/45">{pos >= 0 ? `${pos + 1} of ${total} in ${tabLabel}` : tabLabel}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={`/process/${prev.id}`} className="group rounded-xl border border-foreground/15 p-4 transition-colors hover:border-primary">
                <span className="flex items-center gap-2 font-mono text-xs text-foreground/50"><ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />Previous</span>
                <span className="mt-1 block text-[15px] font-medium text-foreground">{prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/process/${next.id}`} className="group rounded-xl border border-foreground/15 p-4 text-right transition-colors hover:border-primary sm:col-start-2">
                <span className="flex items-center justify-end gap-2 font-mono text-xs text-foreground/50">Next<ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
                <span className="mt-1 block text-[15px] font-medium text-foreground">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
        </motion.div>
      </DocsLayout>
      <Footer />
    </>
  );
}
