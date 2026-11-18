"use client";

import { useMemo, useState } from "react";

import { BusinessAnalysisContent } from "./BusinessAnalysisContent";
import { SourceRecords } from "./SourceRecords";
import { BackLink } from "@/components/layout/BackLink";
import { DocsLayout, DocsRail } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SOURCES } from "@/lib/analytics/dataset";
import { KPI_DEFINITIONS, PERIODS, UPDATE_TARGET_HOURS, computeKpis, type Filter } from "@/lib/analytics/kpis";
import { formatCount, formatPercent, formatShare } from "@/lib/analytics/scales";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";

import { LineChart, RankedTable, SegmentBar, Sparkline } from "./charts";

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "trend", label: "Show-up trend" },
  { id: "sources", label: "By source" },
  { id: "funnel", label: "Pipeline funnel" },
  { id: "waiting", label: "Waiting time" },
  { id: "recruiters", label: "Update exceptions" },
  { id: "business-analysis", label: "Analysis approach" },
  { id: "data-sources", label: "Data sources" },
  { id: "records", label: "Source records" },
  { id: "definitions", label: "KPI definitions" },
  { id: "limits", label: "Data limits" },
];

const BAND_COLORS = ["rgb(var(--tone-teal))", "rgb(var(--tone-violet))", "rgb(var(--tone-amber))", "rgb(var(--tone-rose))"];

function KpiCard({ label, value, note, trend }: { label: string; value: string; note: string; trend?: Array<number | null> }) {
  return (
    <div className="rounded-xl border border-foreground/15 bg-card p-4">
      <p className="font-mono text-xs text-foreground/60">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="font-display text-3xl tracking-tight text-foreground">{value}</p>
        {trend && <Sparkline values={trend} />}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-foreground/60">{note}</p>
    </div>
  );
}

function Panel({ id, title, question, children }: { id: string; title: string; question: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 pt-12">
      <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-foreground/60">{question}</p>
      <div className="mt-5 rounded-2xl border border-foreground/15 bg-card p-4 sm:p-5">{children}</div>
    </section>
  );
}

/** Synthetic recruitment-operations dashboard: every number is fictional and comes from one KPI function so cards, charts and tables agree. */
export default function AnalyticsShowcase() {
  const [weeks, setWeeks] = useState<number>(13);
  const [source, setSource] = useState<Filter["source"]>("all");
  const k = useMemo(() => computeKpis({ weeks, source }), [weeks, source]);
  const active = useScrollSpy(SECTIONS.map((s) => s.id));

  const maxSourceReceived = Math.max(1, ...k.bySource.map((s) => s.received));
  const maxFunnel = Math.max(1, k.funnel[0]?.reached ?? 1);

  return (
    <>
      <DocsLayout
        sidebar={
          <>
            <BackLink href="/experience/iopex#iopex-analysis">Back to business analysis</BackLink>
            <p className="mt-8 font-mono text-xs text-foreground/50">Analytics showcase</p>
            <ul className="mt-3 space-y-0.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-md px-3 py-1.5 text-sm text-foreground/60 transition-colors hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        }
        rail={<DocsRail items={SECTIONS} active={active} />}
      >
        <header>
          <p className="font-mono text-xs text-primary">Analytics</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
            A recruitment dashboard, with the reasoning shown
          </h1>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-foreground/70">
            A working recreation of the kind of KPI dashboard I design as a business analyst. Change the period or source and every card, chart and
            table recalculates from the same definitions.
          </p>
          <p className="mt-3 max-w-[68ch] text-base leading-relaxed text-foreground/65">
            This example connects the visible KPIs to their source records, the less obvious signals
            worth investigating, and the additional data a business would need to capture.
          </p>
          <p className="mt-4 inline-flex rounded-md border border-foreground/20 bg-foreground/[0.04] px-3 py-1.5 font-mono text-xs text-foreground/80">
            Synthetic data: all records are fictional and generated, none are from an employer.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" role="group" aria-label="Dashboard filters">
          <FilterTabs label="Period" value={String(weeks)} onChange={(v) => setWeeks(Number(v))} items={PERIODS.map((p) => ({ key: String(p.key), label: p.label }))} />
          <FilterTabs label="Source" value={source} onChange={(v) => setSource(v as Filter["source"])} items={[{ key: "all", label: "All sources" }, ...SOURCES.map((s) => ({ key: s, label: s }))]} />
        </div>

        <section id="summary" className="scroll-mt-28 pt-8" aria-label="Summary">
          <div className="grid gap-3 sm:grid-cols-2">
            <KpiCard label="Applications received" value={formatCount(k.received)} note="One row per application, not per person." trend={k.weekly.map((w) => w.applications)} />
            <KpiCard
              label={`Updated within ${UPDATE_TARGET_HOURS}h`}
              value={k.compliance === null ? "n/a" : formatPercent(k.compliance)}
              note={`${formatCount(k.compliant)} of ${formatCount(k.withEvidence)} with a recorded update. ${formatCount(k.withoutEvidence)} have no evidence and are not counted as compliant.`}
            />
            <KpiCard
              label="Interview show-up rate"
              value={k.showUp === null ? "n/a" : formatPercent(k.showUp, 1)}
              note={`${formatCount(k.arrived)} arrived, ${formatCount(k.noEvidence)} with no arrival evidence, ${formatCount(k.upcoming)} still upcoming (excluded).`}
              trend={k.weekly.map((w) => w.showUp)}
            />
            <KpiCard
              label="Median waiting time"
              value={k.medianWait === null ? "n/a" : `${Math.round(k.medianWait)} min`}
              note={`${formatCount(k.unreadableWait)} arrivals with an unreadable duration are left out of the median.`}
            />
          </div>
        </section>

        <Panel id="trend" title="Show-up trend" question="Is attendance improving? Weeks with no past appointments show a gap, never a zero.">
          <LineChart
            ariaLabel="Weekly interview show-up rate"
            data={k.weekly.map((w) => ({ key: String(w.week), label: w.label, value: w.showUp, running: w.running }))}
          />
          <p className="mt-2 text-xs text-foreground/55">A hollow point is the running week: it is not finished, so read it with care.</p>
        </Panel>

        <Panel id="sources" title="Intake and quality by source" question="Which channels bring volume, and which bring candidates who show up and get hired?">
          <RankedTable
            rows={k.bySource}
            rowKey={(r) => r.source}
            label={(r) => r.source}
            barHeader="Applications"
            value={(r) => r.received}
            max={maxSourceReceived}
            barLabel={(r) => formatCount(r.received)}
            columns={[
              { key: "hired", header: "Hired", align: "right", cell: (r) => `${r.hired} (${formatShare(r.hired, r.received)})` },
              { key: "show", header: "Show-up", align: "right", cell: (r) => (r.showUp === null ? "n/a" : formatPercent(r.showUp)) },
              { key: "upd", header: `<${UPDATE_TARGET_HOURS}h`, align: "right", cell: (r) => (r.compliance === null ? "n/a" : formatPercent(r.compliance)) },
            ]}
          />
        </Panel>

        <Panel id="funnel" title="Pipeline funnel" question="Where do applications drop out?">
          <RankedTable
            rows={k.funnel}
            rowKey={(r) => r.stage}
            label={(r) => r.stage}
            barHeader="Reached this stage"
            value={(r) => r.reached}
            max={maxFunnel}
            barLabel={(r) => formatCount(r.reached)}
            columns={[{ key: "share", header: "Of applied", align: "right", cell: (r) => formatShare(r.reached, k.funnel[0]?.reached ?? 0) }]}
          />
          <p className="mt-3 text-xs text-foreground/55">
            This is the furthest stage each application reached, not true stage-to-stage conversion: stage history is not recorded in the source.
          </p>
        </Panel>

        <Panel id="waiting" title="Waiting time on arrival" question="How long do candidates wait once they arrive?">
          <SegmentBar ariaLabel="Arrivals by waiting time band" segments={k.waitBands.map((b, i) => ({ ...b, color: BAND_COLORS[i] }))} />
        </Panel>

        <Panel id="recruiters" title="Update exceptions by recruiter" question={`Which open applications have gone more than ${UPDATE_TARGET_HOURS} hours without an update?`}>
          <RankedTable
            rows={k.byRecruiter}
            rowKey={(r) => r.recruiter}
            label={(r) => r.recruiter}
            barHeader="Open and overdue"
            value={(r) => (r.open > 0 ? (r.breaching / r.open) * 100 : null)}
            max={100}
            barLabel={(r) => formatShare(r.breaching, r.open)}
            columns={[
              { key: "open", header: "Open", align: "right", cell: (r) => formatCount(r.open) },
              { key: "late", header: "Overdue", align: "right", cell: (r) => formatCount(r.breaching) },
            ]}
          />
          <p className="mt-3 text-xs text-foreground/55">Open applications with no recorded update time count as overdue here, because missing evidence is not proof of progress.</p>
        </Panel>

        <section id="business-analysis" className="scroll-mt-28 pt-12">
          <BusinessAnalysisContent headingAs="h2" sourcesId="data-sources" />
        </section>

        <section id="records" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Data behind the dashboard</h2>
          <p className="mb-5 mt-2 text-sm leading-relaxed text-foreground/65">
            Current selection: {weeks} weeks · {source === "all" ? "All sources" : source}. The rows
            below follow the same filters as the cards, charts, and tables above.
          </p>
          <SourceRecords applications={k.applications} appointments={k.appointments} />
        </section>

        <section id="definitions" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">How each KPI is defined</h2>
          <p className="mt-1 text-sm text-foreground/60">Each KPI names its business question, formula, grain, date basis and what is deliberately left out.</p>
          <div className="mt-5 divide-y divide-foreground/10 rounded-2xl border border-foreground/15 bg-card">
            {KPI_DEFINITIONS.map((d) => (
              <details key={d.id} className="group px-4 py-3 sm:px-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-medium text-foreground">
                  {d.name}
                  <span aria-hidden="true" className="font-mono text-xs text-foreground/50 group-open:hidden">show</span>
                  <span aria-hidden="true" className="hidden font-mono text-xs text-foreground/50 group-open:inline">hide</span>
                </summary>
                <dl className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[8rem_minmax(0,1fr)]">
                  {[
                    ["Question", d.question],
                    ["Formula", d.formula],
                    ["Grain", d.grain],
                    ["Date basis", d.dateBasis],
                    ["Left out", d.exclusions],
                  ].map(([term, text]) => (
                    <div key={term} className="contents">
                      <dt className="font-mono text-xs text-foreground/55">{term}</dt>
                      <dd className="text-foreground/80">{text}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        </section>

        <section id="limits" className="scroll-mt-28 pt-12">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-foreground">Data limits, stated up front</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/75">
            <li>All data is synthetic and regenerated from a fixed seed, so the numbers are stable but not real.</li>
            <li>Missing evidence is shown as missing. It is never turned into a healthy zero or counted as a pass.</li>
            <li>Upcoming appointments are excluded from show-up until they pass.</li>
            <li>The funnel is a snapshot of furthest stage. True conversion needs stage history.</li>
          </ul>
        </section>
      </DocsLayout>
      <Footer />
    </>
  );
}
