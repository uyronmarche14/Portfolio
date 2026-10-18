"use client";

import { motion, useReducedMotion } from "framer-motion";

import { axisRange, toMonthIndex } from "@/lib/tenure";
import type { WorkExperienceEntry } from "@/lib/data/workExperience";

interface ExperienceTenureStripProps {
  entries: WorkExperienceEntry[];
  activeId: string | null;
  onActiveChange: (id: string | null) => void;
}

const WIDTH = 1000;
const LABEL_W = 230;
const ROW_H = 34;
const BAR_H = 14;
const TOP = 28;
const BAR_X0 = LABEL_W;
const BAR_W = WIDTH - LABEL_W - 8;

const nowMonth = () => new Date().toISOString().slice(0, 7);

/**
 * Decorative time axis for the role list below it. The rows carry the full
 * content and keyboard focus, so the strip is hidden from assistive tech.
 */
export function ExperienceTenureStrip({ entries, activeId, onActiveChange }: ExperienceTenureStripProps) {
  const reduceMotion = useReducedMotion();
  const now = nowMonth();
  const { min, max } = axisRange(entries, now);
  const span = max - min + 1;
  const x = (monthIndex: number) => BAR_X0 + ((monthIndex - min) / span) * BAR_W;
  const height = TOP + entries.length * ROW_H + 8;

  const firstYear = Math.floor(min / 12);
  const lastYear = Math.floor(max / 12);
  const yearTicks = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i).filter(
    (year) => year * 12 >= min
  );

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="hidden h-auto w-full md:block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="tenure-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="rgb(var(--primary))" stopOpacity="1" />
          <stop offset="1" stopColor="rgb(var(--primary))" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {yearTicks.map((year) => (
        <g key={year}>
          <line
            x1={x(year * 12)}
            x2={x(year * 12)}
            y1={TOP - 8}
            y2={height}
            stroke="rgb(var(--foreground))"
            strokeOpacity="0.12"
          />
          <text
            x={x(year * 12) + 6}
            y={TOP - 12}
            fontSize="12"
            fill="rgb(var(--secondary))"
            fontFamily="var(--font-mono), monospace"
          >
            {year}
          </text>
        </g>
      ))}

      {entries.map((entry, i) => {
        const y = TOP + i * ROW_H;
        const start = x(toMonthIndex(entry.start));
        const end = x(toMonthIndex(entry.end ?? now) + 1);
        const isActive = activeId === entry.id;
        const dim = activeId !== null && !isActive;
        const fill = entry.end === null ? "url(#tenure-fade)" : "rgb(var(--primary))";

        return (
          <g
            key={entry.id}
            opacity={dim ? 0.35 : 1}
            onMouseEnter={() => onActiveChange(entry.id)}
            onMouseLeave={() => onActiveChange(null)}
            style={{ transition: "opacity 200ms ease" }}
          >
            <text
              x={0}
              y={y + BAR_H - 2}
              fontSize="14"
              fill="rgb(var(--foreground))"
              fontWeight={isActive ? 600 : 400}
              fontFamily="var(--font-sans), sans-serif"
            >
              {entry.company.length > 28 ? `${entry.company.slice(0, 27)}…` : entry.company}
            </text>
            <motion.rect
              x={start}
              y={y}
              height={BAR_H}
              rx={BAR_H / 2}
              fill={entry.approximate ? "none" : fill}
              stroke="rgb(var(--primary))"
              strokeWidth={entry.approximate ? 1.5 : 0}
              strokeDasharray={entry.approximate ? "4 3" : undefined}
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: Math.max(end - start, BAR_H) }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              width={Math.max(end - start, BAR_H)}
            />
          </g>
        );
      })}
    </svg>
  );
}
