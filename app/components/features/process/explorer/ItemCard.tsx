"use client";

import { createElement, memo } from "react";

import type { ExplorerNode } from "@/lib/data/explorerMap";
import type { ToolNode } from "@/lib/data/systemMap";
import { cn } from "@/lib/utils";

import { EvidenceDot } from "../evidence";
import { toolIcon } from "../toolIcons";

const SUBTITLE: Record<ExplorerNode["lane"], string> = {
  process: "Step",
  artifact: "Document",
  tool: "Tool",
  pipeline: "Pipeline step",
  journey: "Request path",
  release: "Release",
  ops: "Operations",
};

/** One compact card in a tab's index. Plain markup, memoized, no animation libraries: a tab can show 70 of these cheaply. */
export const ItemCard = memo(function ItemCard({
  node,
  badge,
  connections,
  selected,
  onOpen,
}: {
  node: ExplorerNode;
  /** a position number for ordered lists (stages, request path, release steps) */
  badge?: number;
  connections: number;
  selected: boolean;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(node.id)}
      aria-pressed={selected}
      className={cn(
        "group flex h-full w-full flex-col rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected ? "border-primary" : "border-foreground/15"
      )}
    >
      <span className="flex items-center gap-2.5">
        {node.lane === "tool" ? (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/80">{createElement(toolIcon(node as ToolNode), { size: 15 })}</span>
        ) : badge !== undefined ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/[0.07] font-mono text-[11px] text-foreground/70">{badge}</span>
        ) : null}
        <span className="min-w-0 flex-1 text-[15px] font-medium leading-snug text-foreground">{node.title}</span>
        <EvidenceDot evidence={node.evidence} />
      </span>
      <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/65">{node.summary}</span>
      <span className="mt-3 flex items-center justify-between font-mono text-[11px] text-foreground/45">
        <span>{SUBTITLE[node.lane]}</span>
        <span>{connections} {connections === 1 ? "link" : "links"}</span>
      </span>
    </button>
  );
});
