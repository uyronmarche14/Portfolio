"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { FilterTabs } from "@/components/ui/FilterTabs";
import { KPI_DEFINITIONS, computeKpis } from "@/lib/analytics/kpis";
import { formatPercent, linearScale } from "@/lib/analytics/scales";

import { C, Panel, Text, VisualFrame } from "../ExperienceVisualKit";
import { AUTO_CHIP_CLASS, useAutoplay } from "../useAutoplay";

const TABS = [
  { key: "kpi", label: "KPI", def: "received" },
  { key: "sla", label: "SLA", def: "compliance" },
  { key: "trend", label: "Trend", def: "showup" },
  { key: "triage", label: "Triage", def: null },
] as const;
type TabKey = (typeof TABS)[number]["key"];

const TRIAGE = ["Expected", "Actual", "Impact", "To developers"] as const;
const BASE = 232;

/** iOPEX: a small dashboard you can switch between KPI, SLA, trend and triage views. Figures come from the synthetic analytics dataset. */
export const IopexVisual = () => {
  const k = useMemo(() => computeKpis({ weeks: 8, source: "all" }), []);
  const { ref, index, select, auto, resume } = useAutoplay(TABS.length, 3400);
  const [picked, setPicked] = useState<number | null>(null);
  const tab = TABS[index];
  const def = tab.def ? KPI_DEFINITIONS.find((d) => d.id === tab.def) : null;

  const weekly = k.weekly;
  const sel = picked ?? weekly.length - 1;
  const maxApps = Math.max(1, ...weekly.map((w) => w.applications));
  const rates = weekly.flatMap((w, i) => (w.showUp === null ? [] : [{ i, v: w.showUp }]));
  const lo = Math.floor(Math.min(...rates.map((r) => r.v)) - 5);
  const hi = Math.min(100, Math.ceil(Math.max(...rates.map((r) => r.v)) + 3));
  const tx = (i: number) => 52 + (i / Math.max(1, weekly.length - 1)) * 390;
  const ty = linearScale([lo, hi], [222, 100]);
  const line = rates.map((r, j) => `${j ? "L" : "M"}${tx(r.i).toFixed(1)},${ty(r.v).toFixed(1)}`).join(" ");
  const showUpSel = weekly[sel]?.showUp ?? null;

  const late = k.withEvidence - k.compliant;
  const segs = [
    { label: "Updated on time", n: k.compliant, color: C.accent },
    { label: "Overdue", n: late, color: "rgb(var(--tone-amber))" },
    { label: "No update recorded", n: k.withoutEvidence, color: C.bar },
  ];
  const total = Math.max(1, segs.reduce((s, x) => s + x.n, 0));

  const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.22 } };

  return (
    <div ref={ref} className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <FilterTabs<TabKey>
          label="Dashboard view"
          className="pb-0"
          value={tab.key}
          onChange={(key) => select(TABS.findIndex((t) => t.key === key))}
          items={TABS.map((t) => ({ key: t.key, label: t.label }))}
        />
        {!auto && (
          <button type="button" onClick={resume} className={AUTO_CHIP_CLASS}>
            Auto
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1">
        <VisualFrame>
          <Panel title="OPERATIONS OVERVIEW" tag="synthetic sample" h={300}>
            <AnimatePresence mode="wait">
              <motion.g key={tab.key} {...fade}>
                {tab.key === "kpi" && (
                  <g>
                    <Text x={22} y={72} size={12} opacity={0.7}>Applications per week</Text>
                    <Text x={466} y={72} size={12} anchor="end" fill={C.accent} weight={600}>
                      {weekly[sel]?.label}: {weekly[sel]?.applications}
                    </Text>
                    {weekly.map((w, i) => {
                      const h = (w.applications / maxApps) * 120;
                      const x = 45 + i * 52;
                      return (
                        <g
                          key={w.week}
                          tabIndex={0}
                          role="button"
                          aria-label={`${w.label}: ${w.applications} applications`}
                          style={{ cursor: "pointer", outline: "none" }}
                          onClick={() => setPicked(i)}
                          onMouseEnter={() => setPicked(i)}
                          onFocus={() => setPicked(i)}
                        >
                          <motion.rect
                            x={x}
                            width={34}
                            rx={6}
                            fill={i === sel ? C.accent : C.bar}
                            initial={{ height: 0, attrY: BASE }}
                            animate={{ height: h, attrY: BASE - h }}
                            transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                          />
                          <rect x={x - 6} y={96} width={46} height={BASE - 96 + 22} fill="transparent" />
                          <Text x={x + 17} y={BASE + 18} size={11} anchor="middle" opacity={i === sel ? 0.95 : 0.5}>{w.label}</Text>
                        </g>
                      );
                    })}
                  </g>
                )}

                {tab.key === "sla" && (
                  <g>
                    <Text x={22} y={72} size={12} opacity={0.7}>Applications by update status</Text>
                    <rect x={22} y={104} width={444} height={22} rx={11} fill={C.faint} />
                    {segs.reduce<{ x: number; nodes: React.ReactNode[] }>(
                      (acc, s, i) => {
                        const w = (s.n / total) * 444;
                        acc.nodes.push(
                          <motion.rect
                            key={s.label}
                            y={104}
                            height={22}
                            fill={s.color}
                            initial={{ width: 0, x: acc.x }}
                            animate={{ width: Math.max(0, w - 2), x: acc.x }}
                            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                          />
                        );
                        acc.x += w;
                        return acc;
                      },
                      { x: 22, nodes: [] }
                    ).nodes}
                    {segs.map((s, i) => (
                      <g key={s.label}>
                        <rect x={22} y={152 + i * 30} width={10} height={10} rx={3} fill={s.color} />
                        <Text x={42} y={162 + i * 30} size={13} mono={false} opacity={0.85}>{s.label}</Text>
                        <Text x={466} y={162 + i * 30} size={13} anchor="end" weight={600}>{s.n}</Text>
                      </g>
                    ))}
                    <Text x={22} y={262} size={12} opacity={0.6}>
                      {k.compliance === null ? "n/a" : formatPercent(k.compliance)} of applications with a recorded update were on time
                    </Text>
                  </g>
                )}

                {tab.key === "trend" && (
                  <g>
                    <Text x={22} y={72} size={12} opacity={0.7}>Interview show-up rate</Text>
                    <Text x={466} y={72} size={12} anchor="end" fill={C.accent} weight={600}>
                      {weekly[sel]?.label}: {showUpSel === null ? "n/a" : formatPercent(showUpSel, 1)}
                    </Text>
                    {[lo, (lo + hi) / 2, hi].map((t) => (
                      <g key={t}>
                        <path d={`M44 ${ty(t)}H466`} stroke={C.line} strokeDasharray="2 4" />
                        <Text x={36} y={ty(t) + 4} size={10} anchor="end" opacity={0.5}>{Math.round(t)}%</Text>
                      </g>
                    ))}
                    <motion.path
                      d={line}
                      fill="none"
                      stroke={C.accent}
                      strokeWidth={2.4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                    {rates.map((r) => (
                      <g
                        key={r.i}
                        tabIndex={0}
                        role="button"
                        aria-label={`${weekly[r.i].label}: ${formatPercent(r.v, 1)}`}
                        style={{ cursor: "pointer", outline: "none" }}
                        onClick={() => setPicked(r.i)}
                        onMouseEnter={() => setPicked(r.i)}
                        onFocus={() => setPicked(r.i)}
                      >
                        <circle cx={tx(r.i)} cy={ty(r.v)} r={14} fill="transparent" />
                        <circle cx={tx(r.i)} cy={ty(r.v)} r={r.i === sel ? 6 : 4} fill={r.i === sel ? C.accent : C.paper} stroke={C.accent} strokeWidth={2} />
                        <Text x={tx(r.i)} y={244} size={11} anchor="middle" opacity={r.i === sel ? 0.95 : 0.5}>{weekly[r.i].label}</Text>
                      </g>
                    ))}
                  </g>
                )}

                {tab.key === "triage" && (
                  <g>
                    <Text x={22} y={72} size={12} opacity={0.7}>From a reported issue to a clean handoff</Text>
                    {TRIAGE.map((label, i) => {
                      const last = i === TRIAGE.length - 1;
                      const y = 96 + i * 44;
                      return (
                        <motion.g key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: i * 0.12 }}>
                          <rect x={22} y={y} width={444} height={34} rx={17} fill={last ? C.accent : C.faint} />
                          <Text x={44} y={y + 22} size={13} fill={last ? C.onAccent : C.ink} weight={last ? 600 : 400}>{String(i + 1).padStart(2, "0")}</Text>
                          <Text x={76} y={y + 22} size={13} mono={false} fill={last ? C.onAccent : C.ink} weight={last ? 600 : 500}>{label}</Text>
                        </motion.g>
                      );
                    })}
                  </g>
                )}
              </motion.g>
            </AnimatePresence>
          </Panel>
        </VisualFrame>
      </div>

      <p className="min-h-[2.5rem] text-xs leading-relaxed text-foreground/70">
        {def ? (
          <>
            <span className="font-medium text-foreground">{def.name}.</span> {def.question} <span className="text-foreground/55">{def.formula}</span>
          </>
        ) : (
          "Each production issue is written up as expected versus actual behavior, with its impact, then handed to developers with clear reproduction steps."
        )}
      </p>
    </div>
  );
};
