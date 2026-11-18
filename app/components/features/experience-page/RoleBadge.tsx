import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Sparkline } from "@/components/analytics/charts";
import { computeKpis } from "@/lib/analytics/kpis";
import { formatPercent } from "@/lib/analytics/scales";
import { projectAnalysis } from "@/lib/data/projectAnalysis";
import { projects } from "@/lib/data/projects";
import type { WorkExperienceEntry } from "@/lib/data/workExperience";

// Deterministic synthetic figures, labelled as a sample on the badge itself.
const sample = computeKpis({ weeks: 13, source: "all" });

/**
 * A small card in each role header, like the "Sample dashboard" card on the home hero. It links to real work when the site has some
 * (the analytics showcase for iOPEX, a project's Analysis section for roles with a related project) and otherwise shows the role's own
 * highlight text. No figures are invented for roles without an artifact.
 */
export function RoleBadge({ entry }: { entry: WorkExperienceEntry }) {
  const related = projects.find((project) => project.experienceId === entry.id);
  const hasAnalysis = related ? Boolean(projectAnalysis[related.id]) : false;

  const base = "relative mt-5 block max-w-sm rounded-xl border border-foreground/15 bg-background/60 p-3.5 transition-colors";

  if (entry.id === "iopex") {
    return (
      <Link href="/analytics" data-cursor="Open dashboard" className={`${base} hover:border-primary`}>
        <span className="block font-mono text-[11px] text-primary">Sample dashboard</span>
        <span className="mt-1 flex items-end justify-between gap-3">
          <span className="font-display text-2xl leading-none text-foreground">{sample.showUp === null ? "n/a" : formatPercent(sample.showUp, 1)}</span>
          <Sparkline values={sample.weekly.map((w) => w.showUp)} width={84} height={26} />
        </span>
        <span className="mt-1.5 flex items-center justify-between gap-2 text-xs text-foreground/60">
          Interview show-up, synthetic data
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </Link>
    );
  }

  if (related) {
    return (
      <Link href={`/projects/${related.id}${hasAnalysis ? "#analysis" : ""}`} data-cursor="Open project" className={`${base} hover:border-primary`}>
        <span className="block font-mono text-[11px] text-primary">{hasAnalysis ? "Sample analysis" : "Related project"}</span>
        <span className="mt-1 block text-sm font-medium text-foreground">{related.title}</span>
        <span className="mt-1.5 flex items-center justify-between gap-2 text-xs text-foreground/60">
          {hasAnalysis ? "Requirements, rules and checks" : "See the project"}
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </Link>
    );
  }

  return (
    <div className={base}>
      <span className="block font-mono text-[11px] text-primary">Role highlight</span>
      <span className="mt-1 block text-sm leading-snug text-foreground">{entry.highlight}</span>
    </div>
  );
}
