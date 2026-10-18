export interface TenureRange {
  start: string;
  end: string | null;
}

/** Months since year 0 for an ISO "YYYY-MM" string. */
export function toMonthIndex(isoMonth: string): number {
  const [year, month] = isoMonth.split("-").map(Number);
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error(`Invalid year-month: ${isoMonth}`);
  }
  return year * 12 + (month - 1);
}

/** Inclusive length in months; open-ended ranges run until `now` (an ISO "YYYY-MM"). */
export function monthsBetween(range: TenureRange, now: string): number {
  return toMonthIndex(range.end ?? now) - toMonthIndex(range.start) + 1;
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest || !years) parts.push(`${rest} mo`);
  return parts.join(" ");
}

/** Overall axis: earliest start to latest end (or `now`), in month indexes. */
export function axisRange(ranges: TenureRange[], now: string) {
  const starts = ranges.map((r) => toMonthIndex(r.start));
  const ends = ranges.map((r) => toMonthIndex(r.end ?? now));
  return { min: Math.min(...starts), max: Math.max(...ends) };
}
