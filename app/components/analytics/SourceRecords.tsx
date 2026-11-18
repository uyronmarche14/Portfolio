import type { Application, Appointment, Arrival } from "@/lib/analytics/dataset";
import { formatCount } from "@/lib/analytics/scales";

const MAX_ROWS = 5;
const ARRIVAL_LABELS: Record<Arrival, string> = {
  arrived: "Arrival recorded",
  "no-evidence": "No arrival evidence",
  upcoming: "Upcoming",
};
const HEAD = "px-3 py-2 text-left font-mono text-xs font-medium text-foreground/65";
const CELL = "px-3 py-2 text-sm text-foreground/75";

/** A small inspection view of the same filtered records used by the KPI calculations. */
export function SourceRecords({ applications, appointments }: { applications: Application[]; appointments: Appointment[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-foreground/65">
        Fictional source records behind the metrics. Each table shows up to five records from its
        current selection; these rows are an excerpt, not the complete totals.
      </p>
      <details className="group rounded-xl border border-foreground/15 bg-card p-4">
        <summary className="flex min-h-8 cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          Application records
          <span className="font-mono text-xs text-foreground/55">{Math.min(MAX_ROWS, applications.length)} of {formatCount(applications.length)}</span>
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <caption className="sr-only">First five filtered synthetic application records</caption>
            <thead>
              <tr className="border-b border-foreground/15">
                {["ID", "Week", "Source", "Recruiter", "Furthest stage", "Hours since update"].map((label) => (
                  <th key={label} scope="col" className={HEAD}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              {applications.slice(0, MAX_ROWS).map((row) => (
                <tr key={row.id}>
                  <th scope="row" className={`${CELL} whitespace-nowrap font-mono text-xs font-normal`}>{row.id}</th>
                  <td className={CELL}>W{row.week + 1}</td>
                  <td className={CELL}>{row.source}</td>
                  <td className={CELL}>{row.recruiter}</td>
                  <td className={CELL}>{row.stage}</td>
                  <td className={CELL}>{row.hoursSinceUpdate === null ? "No evidence" : `${row.hoursSinceUpdate}h`}</td>
                </tr>
              ))}
              {applications.length === 0 && <tr><td colSpan={6} className={CELL}>No application records match this selection.</td></tr>}
            </tbody>
          </table>
        </div>
      </details>

      <details className="group rounded-xl border border-foreground/15 bg-card p-4">
        <summary className="flex min-h-8 cursor-pointer list-none flex-wrap items-center justify-between gap-2 rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
          Appointment records
          <span className="font-mono text-xs text-foreground/55">{Math.min(MAX_ROWS, appointments.length)} of {formatCount(appointments.length)}</span>
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">First five filtered synthetic appointment records</caption>
            <thead>
              <tr className="border-b border-foreground/15">
                {["ID", "Week", "Source", "Arrival evidence", "Wait minutes"].map((label) => (
                  <th key={label} scope="col" className={HEAD}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              {appointments.slice(0, MAX_ROWS).map((row) => (
                <tr key={row.id}>
                  <th scope="row" className={`${CELL} whitespace-nowrap font-mono text-xs font-normal`}>{row.id}</th>
                  <td className={CELL}>W{row.week + 1}</td>
                  <td className={CELL}>{row.source}</td>
                  <td className={CELL}>{ARRIVAL_LABELS[row.arrival]}</td>
                  <td className={CELL}>{row.waitMinutes === null ? "Not recorded" : `${row.waitMinutes} min`}</td>
                </tr>
              ))}
              {appointments.length === 0 && <tr><td colSpan={5} className={CELL}>No appointment records match this selection.</td></tr>}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
