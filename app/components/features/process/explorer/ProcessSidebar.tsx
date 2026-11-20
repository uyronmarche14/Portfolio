"use client";

import Link from "next/link";

import { BackLink } from "@/components/layout/BackLink";
import { docsLinkClass } from "@/components/layout/DocsLayout";
import { TABS, type TabId } from "@/lib/data/explorerMap";
import { cn } from "@/lib/utils";

/** The docs sidebar for /process. On the explorer the sections switch in place; on an item page they link back to the explorer. */
export default function ProcessSidebar({ tab, onTab }: { tab: TabId; onTab?: (t: TabId) => void }) {
  const entry = (t: (typeof TABS)[number]) => (
    <li key={t.id}>
      {onTab ? (
        <button type="button" onClick={() => onTab(t.id)} aria-current={t.id === tab ? "page" : undefined} className={cn(docsLinkClass(t.id === tab), "w-full text-left")}>
          {t.label}
        </button>
      ) : (
        <Link href={t.id === "process" ? "/process" : `/process?tab=${t.id}`} aria-current={t.id === tab ? "page" : undefined} className={docsLinkClass(t.id === tab)}>
          {t.label}
        </Link>
      )}
    </li>
  );
  return (
    <>
      <BackLink href="/">Back to home</BackLink>
      <p className="mt-8 font-mono text-xs text-foreground/50">Process</p>
      <ul className="mt-3 space-y-0.5">{TABS.filter((t) => !t.production && t.id !== "map").map(entry)}</ul>
      <p className="mt-8 font-mono text-xs text-foreground/50">Production</p>
      <ul className="mt-3 space-y-0.5">{TABS.filter((t) => t.production).map(entry)}</ul>
      <p className="mt-8 font-mono text-xs text-foreground/50">Explore</p>
      <ul className="mt-3 space-y-0.5">{TABS.filter((t) => t.id === "map").map(entry)}</ul>
    </>
  );
}
