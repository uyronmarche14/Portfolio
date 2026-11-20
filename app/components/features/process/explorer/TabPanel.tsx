"use client";

import { useMemo } from "react";

import { explorerIncident, tabGroups, type ExplorerNode, type TabId } from "@/lib/data/explorerMap";
import { infraGroupById } from "@/lib/data/infraMap";
import type { Evidence } from "@/lib/data/processMap";

import { ItemCard } from "./ItemCard";

const matches = (n: ExplorerNode, q: string) => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q);

/** The grouped index for one tab. Groups that are ordered chains (stages, the request path, release steps) number their cards. */
export default function TabPanel({
  tab,
  query,
  evidence,
  selectedId,
  onOpen,
}: {
  tab: TabId;
  query: string;
  evidence: Evidence[];
  selectedId: string | null;
  onOpen: (id: string) => void;
}) {
  const groups = useMemo(() => tabGroups(tab), [tab]);
  const counts = useMemo(() => new Map(groups.flatMap((g) => g.nodes).map((n) => [n.id, explorerIncident(n.id).length])), [groups]);
  const q = query.trim().toLowerCase();

  const visible = groups
    .map((g) => ({ ...g, nodes: g.nodes.filter((n) => (!q || matches(n, q)) && (evidence.length === 0 || evidence.includes(n.evidence))) }))
    .filter((g) => g.nodes.length > 0);

  if (visible.length === 0) {
    return <p className="rounded-xl border border-dashed border-foreground/20 p-8 text-center text-sm text-foreground/55">Nothing matches. Try a different word or clear the filters.</p>;
  }

  const phased = tab === "process" || tab === "documents";

  return (
    <div className="space-y-12">
      {phased && (
        <ol aria-label="Phases" className="flex flex-wrap gap-x-1 gap-y-2">
          {visible.map((g, i) => (
            <li key={g.id} className="flex items-center gap-1">
              <a href={`#grp-${g.id}`} className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/70 transition-colors hover:border-primary hover:text-foreground">
                <span className="mr-1.5 font-mono text-[10px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                {g.title.replace(/^\d+\s+/, "")}
              </a>
              {i < visible.length - 1 && <span aria-hidden="true" className="h-px w-3 bg-foreground/20" />}
            </li>
          ))}
        </ol>
      )}
      {visible.map((g) => {
        const ordered = tab === "process" || tab === "documents" ? false : g.nodes.every((n) => "group" in n && infraGroupById.get(n.group)?.chain) || (tab === "delivery" && g.id === "site");
        return (
          <section key={g.id} id={`grp-${g.id}`} aria-label={g.title} className="scroll-mt-28">
            <div className="flex items-baseline justify-between gap-4 border-b border-foreground/10 pb-2">
              <h2 className="font-display text-xl tracking-tight text-foreground">
                {phased && /^\d+\s/.test(g.title) ? (
                  <>
                    <span className="mr-3 font-mono text-sm text-primary">{g.title.split(/\s+/)[0]}</span>
                    {g.title.replace(/^\d+\s+/, "")}
                  </>
                ) : (
                  g.title
                )}
              </h2>
              <span className="font-mono text-xs text-foreground/45">{g.nodes.length}</span>
            </div>
            {g.blurb && <p className="mt-2 max-w-[70ch] text-sm text-foreground/60">{g.blurb}</p>}
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.nodes.map((n, i) => (
                <li key={n.id}>
                  <ItemCard node={n} badge={ordered ? i + 1 : undefined} connections={counts.get(n.id) ?? 0} selected={selectedId === n.id} onOpen={onOpen} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
