"use client";

import { useId } from "react";

import { formatCount, formatPercent, formatShare, linearScale, niceTicks } from "@/lib/analytics/scales";
import { useWidth } from "@/lib/analytics/useSize";

const INK = "rgb(var(--foreground) / 0.55)";
const GRID = "rgb(var(--foreground) / 0.14)";
const PRIMARY = "rgb(var(--primary))";

export interface LinePoint {
  key: string;
  label: string;
  /** null leaves a gap: a missing value is never drawn as zero. */
  value: number | null;
  running?: boolean;
}

/** One measure over time on its own scale, with gaps for missing values. A table with the same numbers is available to screen readers. */
export function LineChart({
  data,
  ariaLabel,
  height = 190,
  domain = [0, 100],
  format = (n: number) => formatPercent(n),
}: {
  data: LinePoint[];
  ariaLabel: string;
  height?: number;
  domain?: [number, number];
  format?: (n: number) => string;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const id = useId();
  const m = { top: 12, right: 12, bottom: 24, left: 42 };
  const ticks = niceTicks(domain[0], domain[1], 5);
  const innerW = Math.max(0, width - m.left - m.right);
  const innerH = height - m.top - m.bottom;
  const x = (i: number) => m.left + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const y = linearScale([ticks[0], ticks[ticks.length - 1]], [m.top + innerH, m.top]);
  const every = Math.max(1, Math.ceil(data.length / Math.max(1, Math.floor(innerW / 44))));
  const runs: { x: number; y: number; d: LinePoint }[][] = [[]];
  data.forEach((d, i) => {
    if (d.value === null) runs.push([]);
    else runs[runs.length - 1].push({ x: x(i), y: y(d.value), d });
  });
  return (
    <div ref={ref} className="w-full">
      {width > 0 && (
        <svg role="group" aria-label={ariaLabel} aria-describedby={id} width={width} height={height}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.left} x2={width - m.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeDasharray="2 3" />
              <text x={m.left - 6} y={y(t) + 4} textAnchor="end" fontSize={11} fill={INK}>
                {format(t)}
              </text>
            </g>
          ))}
          {data.map((d, i) =>
            i % every === 0 ? (
              <text key={d.key} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill={INK}>
                {d.label}
              </text>
            ) : null
          )}
          {runs
            .filter((r) => r.length > 1)
            .map((r, i) => (
              <path key={i} d={r.map((p, j) => `${j ? "L" : "M"}${p.x},${p.y}`).join(" ")} fill="none" stroke={PRIMARY} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            ))}
          {runs.flat().map((p) => (
            <circle key={p.d.key} cx={p.x} cy={p.y} r={3.5} fill={p.d.running ? "rgb(var(--card))" : PRIMARY} stroke={PRIMARY} strokeWidth={2}>
              <title>{`${p.d.label}${p.d.running ? " (running)" : ""}: ${format(p.d.value as number)}`}</title>
            </circle>
          ))}
        </svg>
      )}
      <p id={id} className="sr-only">{ariaLabel}</p>
      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <thead><tr><th scope="col">Period</th><th scope="col">Value</th></tr></thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.key}><th scope="row">{d.label}</th><td>{d.value === null ? "Not available" : format(d.value)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Tiny trend line for a card. Decorative unless `label` is given. */
export function Sparkline({ values, width = 96, height = 28, label }: { values: Array<number | null>; width?: number; height?: number; label?: string }) {
  const pts = values.flatMap((v, i) => (v !== null && Number.isFinite(v) ? [{ v, i }] : []));
  if (pts.length < 2) return <svg width={width} height={height} aria-hidden="true" />;
  const lo = Math.min(...pts.map((p) => p.v));
  const hi = Math.max(...pts.map((p) => p.v));
  const pad = 3;
  const x = (i: number) => pad + (i / Math.max(1, values.length - 1)) * (width - pad * 2);
  const y = (v: number) => (hi === lo ? height / 2 : height - pad - ((v - lo) / (hi - lo)) * (height - pad * 2));
  const line = pts.map((p, k) => `${k ? "L" : "M"}${x(p.i).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <path d={`${line} L${x(last.i).toFixed(1)},${height} L${x(pts[0].i).toFixed(1)},${height} Z`} fill={PRIMARY} opacity={0.12} />
      <path d={line} fill="none" stroke={PRIMARY} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(last.i)} cy={y(last.v)} r={2.5} fill={PRIMARY} />
    </svg>
  );
}

export interface Segment {
  key: string;
  label: string;
  value: number;
  /** CSS color. */
  color: string;
}

/** One 100% bar split into parts, with a legend of counts and shares (for example waiting-time bands). */
export function SegmentBar({ segments, ariaLabel }: { segments: Segment[]; ariaLabel: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  return (
    <div>
      <div
        role="img"
        aria-label={`${ariaLabel}: ${segments.map((s) => `${s.label} ${formatCount(s.value)}`).join(", ")}`}
        className="flex h-3 gap-0.5 overflow-hidden rounded-full bg-foreground/10"
      >
        {total > 0 &&
          segments.filter((s) => s.value > 0).map((s) => <span key={s.key} style={{ width: `${(s.value / total) * 100}%`, background: s.color, minWidth: 3 }} />)}
      </div>
      <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
        {segments.map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-sm">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: s.color }} />
            <span className="min-w-0 flex-1 truncate text-foreground/70">{s.label}</span>
            <span className="font-mono text-foreground">{formatCount(s.value)}</span>
            <span className="w-10 text-right font-mono text-xs text-foreground/55">{formatShare(s.value, total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface RankedColumn<T> {
  key: string;
  header: string;
  align?: "left" | "right";
  cell: (row: T) => React.ReactNode;
}

/**
 * A ranked table with an in-cell bar, preferred over repeated bar charts. The bar column shows `value` against `max`;
 * the other columns are plain figures so the numbers stay readable and copyable.
 */
export function RankedTable<T>({
  rows,
  rowKey,
  label,
  barHeader,
  value,
  max,
  barLabel,
  columns,
}: {
  rows: T[];
  rowKey: (row: T) => string;
  label: (row: T) => string;
  barHeader: string;
  value: (row: T) => number | null;
  max: number;
  barLabel: (row: T) => string;
  columns: RankedColumn<T>[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr className="border-b border-foreground/15 text-left font-mono text-xs text-foreground/60">
            <th scope="col" className="py-2 pr-3 font-normal">Name</th>
            <th scope="col" className="py-2 pr-3 font-normal">{barHeader}</th>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={`py-2 pl-3 font-normal ${c.align === "right" ? "text-right" : ""}`}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const v = value(row);
            return (
              <tr key={rowKey(row)} className="border-b border-foreground/10 last:border-0">
                <th scope="row" className="whitespace-nowrap py-2.5 pr-3 text-left font-medium text-foreground">{label(row)}</th>
                <td className="w-[38%] py-2.5 pr-3">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="block h-2 flex-1 overflow-hidden rounded-full bg-foreground/10">
                      <span className="block h-full rounded-full bg-primary" style={{ width: `${v === null ? 0 : Math.min(100, (v / max) * 100)}%` }} />
                    </span>
                    <span className="w-12 text-right font-mono text-xs text-foreground">{barLabel(row)}</span>
                  </div>
                </td>
                {columns.map((c) => (
                  <td key={c.key} className={`py-2.5 pl-3 font-mono text-xs text-foreground/80 ${c.align === "right" ? "text-right" : ""}`}>{c.cell(row)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
