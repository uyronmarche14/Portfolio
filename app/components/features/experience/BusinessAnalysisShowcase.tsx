import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Sparkline } from "@/components/analytics/charts";
import { BusinessAnalysisContent } from "@/components/analytics/BusinessAnalysisContent";
import { SourceRecords } from "@/components/analytics/SourceRecords";
import { computeKpis, UPDATE_TARGET_HOURS } from "@/lib/analytics/kpis";
import { formatCount, formatPercent } from "@/lib/analytics/scales";

const sample = computeKpis({ weeks: 13, source: "all" });

/** A capability statement beside a clearly labelled, independent sample of the analysis approach. */
export function BusinessAnalysisShowcase() {
  return (
    <div className="grid min-w-0 gap-8">
      <BusinessAnalysisContent sourcesId="iopex-data-sources" />

      <aside aria-label="Sample recruitment dashboard" className="min-w-0 self-start rounded-xl border border-foreground/15 bg-foreground/[0.025] p-5 sm:p-6">
        <p className="font-mono text-xs text-primary">Sample dashboard</p>
        <p className="mt-2 text-lg font-medium text-foreground">Recruitment operations</p>
        <p className="mt-1 text-xs text-foreground/60">Last 13 weeks · All sources</p>

        <dl className="mt-6">
          <div>
            <dt className="text-sm text-foreground/70">Interview show-up</dt>
            <dd className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <span className="font-display text-4xl leading-none text-foreground">
                {sample.showUp === null ? "n/a" : formatPercent(sample.showUp, 1)}
              </span>
              <Sparkline values={sample.weekly.map((week) => week.showUp)} width={120} height={32} />
            </dd>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-foreground/10 pt-4">
            <div>
              <dt className="text-xs leading-relaxed text-foreground/60">Applications</dt>
              <dd className="mt-1 font-mono text-lg text-foreground">{formatCount(sample.received)}</dd>
            </div>
            <div>
              <dt className="text-xs leading-relaxed text-foreground/60">Updated within {UPDATE_TARGET_HOURS}h</dt>
              <dd className="mt-1 font-mono text-lg text-foreground">
                {sample.compliance === null ? "n/a" : formatPercent(sample.compliance, 1)}
              </dd>
            </div>
          </div>
        </dl>

        <p className="mt-5 text-xs leading-relaxed text-foreground/60">
          Synthetic sample data. These figures demonstrate the approach and are not employer results.
        </p>
        <Link
          href="/analytics"
          data-cursor="Open dashboard"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-md border border-foreground/20 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Explore the dashboard
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </Link>
      </aside>

      <div>
        <h3 id="iopex-records" className="scroll-mt-28 text-lg font-medium text-foreground">Sample source records</h3>
        <p className="mb-4 mt-2 text-sm text-foreground/65">Fixed preview: last 13 weeks, all sources. The full dashboard lets you change the selection.</p>
        <SourceRecords applications={sample.applications} appointments={sample.appointments} />
      </div>
    </div>
  );
}
