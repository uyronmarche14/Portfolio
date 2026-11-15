import Link from "next/link";

import { type WorkExperienceEntry } from "@/lib/data/workExperience";
import { axisRange, formatDuration, monthsBetween, toMonthIndex } from "@/lib/tenure";
import { cn } from "@/lib/utils";

interface TenureChartProps {
  entries: WorkExperienceEntry[];
  /** ISO "YYYY-MM" used for open-ended roles */
  now: string;
  /** role to emphasise in mint; others stay quiet */
  activeId?: string;
  /** compact = thinner rows, no links (role page context) */
  compact?: boolean;
}

/**
 * Overlap chart: one bar per role on a shared month axis, so parallel roles are visible at a glance.
 * Positions come straight from each entry's start/end; approximate ranges are drawn hatched, never as exact.
 */
export function TenureChart({ entries, now, activeId, compact }: TenureChartProps) {
  const { min, max } = axisRange(entries, now);
  // +1: a role's last month is drawn through its end, so the axis covers max inclusive
  const span = Math.max(max - min + 1, 1);
  const pct = (monthIndex: number) => ((monthIndex - min) / span) * 100;

  const firstYear = Math.floor(min / 12);
  const lastYear = Math.floor(max / 12);
  const years: number[] = [];
  for (let y = firstYear; y <= lastYear; y++) if (y * 12 >= min) years.push(y);

  return (
    <figure className="w-full">
      <div className={cn("relative", compact ? "pt-5" : "pt-6")}>
        {/* year gridlines and labels, behind the bars */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 left-0">
          {years.map((year) => (
            <div key={year} className="absolute top-0 bottom-0 border-l border-foreground/10" style={{ left: `${pct(year * 12)}%` }}>
              <span className="absolute -top-0.5 left-1 font-mono text-[11px] text-muted">{year}</span>
            </div>
          ))}
        </div>

        <ol className={cn("relative", compact ? "space-y-1.5" : "space-y-2.5")}>
          {entries.map((entry) => {
            const start = toMonthIndex(entry.start);
            const end = toMonthIndex(entry.end ?? now);
            const active = entry.id === activeId;
            const dim = activeId && !active;
            const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));
            const bar = (
              <span
                className={cn(
                  "absolute inset-y-0 rounded-sm",
                  compact ? "min-w-1" : "min-w-1.5",
                  active ? "bg-primary" : dim ? "bg-foreground/20" : "bg-foreground/45",
                  entry.approximate && "opacity-70 [background-image:repeating-linear-gradient(135deg,transparent_0_4px,rgb(var(--background)/0.55)_4px_6px)]"
                )}
                style={{ left: `${pct(start)}%`, width: `${Math.max(pct(end + 1) - pct(start), 0.6)}%` }}
              />
            );
            const track = <span className={cn("relative block w-full", compact ? "h-1.5" : "h-3")}>{bar}</span>;
            const label = (
              <span className={cn("font-mono text-[11px]", active ? "text-primary" : "text-muted")}>
                {entry.company}
                {!compact && (
                  <>
                    {" "}
                    <span className="text-foreground/50">
                      {entry.dateRange}
                      {duration ? ` · ${duration}` : ""}
                    </span>
                  </>
                )}
              </span>
            );
            return (
              <li key={entry.id}>
                {compact ? (
                  <div title={`${entry.company}: ${entry.dateRange}`}>{track}</div>
                ) : (
                  <Link href={`/experience/${entry.id}`} className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span className="mb-1 block">{label}</span>
                    {track}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="sr-only">
        Chart of {entries.length} roles on one timeline. {entries.map((e) => `${e.company}, ${e.dateRange}`).join("; ")}.
      </figcaption>
    </figure>
  );
}
