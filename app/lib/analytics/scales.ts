/** Pure scale and format helpers for the analytics showcase charts (hand-built SVG, no chart library). */

function niceNum(range: number, round: boolean): number {
  const exp = Math.floor(Math.log10(range));
  const f = range / 10 ** exp;
  const nf = round ? (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) : f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nf * 10 ** exp;
}

/** Round, human-friendly axis ticks that cover [min, max]. */
export function niceTicks(min: number, max: number, count = 5): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0, 1];
  if (min === max) max = min + 1;
  const range = niceNum(max - min, false);
  const step = niceNum(range / Math.max(1, count - 1), true);
  const decimals = Math.max(0, -Math.floor(Math.log10(step)));
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Number(v.toFixed(decimals)));
  return ticks;
}

export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0);
}

const grouped = new Intl.NumberFormat("en-US");
export const formatCount = (n: number): string => grouped.format(n);

/**
 * `value` is already a percent (83.2 -> "83%"). Rounding never flatters a rate: 99.96 reads 99.9%, never 100%,
 * and a value above zero never reads 0%.
 */
export function formatPercent(value: number, digits = 0): string {
  const unit = 10 ** -digits;
  const rounded = Number(value.toFixed(digits));
  if (value < 100 && rounded >= 100) return `${(100 - unit).toFixed(digits)}%`;
  if (value > 0 && rounded === 0) return `<${unit.toFixed(digits)}%`;
  return `${value.toFixed(digits)}%`;
}

/** Share of a total as a percent; "n/a" when the base is zero so a missing base never reads as 0%. */
export const formatShare = (part: number, total: number, digits = 0): string =>
  total > 0 ? formatPercent((part / total) * 100, digits) : "n/a";
