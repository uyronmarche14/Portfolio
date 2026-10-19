"use client";

import { C, Loop, Surface, Text, VisualFrame } from "../ExperienceVisualKit";

/** iOPEX: reporting dashboards on top, a production-issue triage card in front. */
export const IopexVisual = () => {
  const rows = [
    { label: "Expected", w: 150, t: 0.06 },
    { label: "Actual", w: 112, t: 0.22 },
    { label: "Impact", w: 130, t: 0.38 },
    { label: "Handoff", w: 0, t: 0.54 },
  ];
  const timesFor = (t: number) => [0, t, t + 0.08, 0.9, 0.96, 1];

  return (
    <VisualFrame>
      {/* back layer: KPI / SLA / trend dashboard */}
      <Surface x={36} y={56} w={488} h={176} e={1} />
      <Text x={58} y={84} size={11} opacity={0.5}>OPERATIONS OVERVIEW</Text>
      {[
        { x: 58, label: "KPI" },
        { x: 222, label: "SLA" },
        { x: 386, label: "TREND" },
      ].map((tile) => (
        <g key={tile.label}>
          <rect x={tile.x} y={100} width={136} height={110} rx={12} fill={C.faint} />
          <Text x={tile.x + 14} y={122} size={11} opacity={0.55}>{tile.label}</Text>
        </g>
      ))}
      {[0.4, 0.62, 0.5, 0.82, 0.7].map((v, i) => (
        <Loop key={i} a={{ scaleY: [0, 1, 1, 0] }} d={9} times={[0, 0.2 + i * 0.05, 0.92, 1]} origin="center bottom">
          <rect x={72 + i * 22} y={196 - v * 56} width={14} height={v * 56} rx={4} fill={i === 3 ? C.accent : C.bar} />
        </Loop>
      ))}
      <rect x={236} y={152} width={108} height={8} rx={4} fill={C.line} />
      <Loop a={{ scaleX: [0, 0.72, 0.72, 0] }} d={9} times={[0, 0.3, 0.92, 1]} origin="left center">
        <rect x={236} y={152} width={108} height={8} rx={4} fill={C.accent} />
      </Loop>
      <path d="M311 146v20" stroke={C.ink} strokeOpacity={0.5} strokeWidth={1.5} />
      <Text x={236} y={188} size={11} opacity={0.5}>target</Text>
      <path d="M400 192l24-18 22 8 24-30 22 16" stroke={C.line} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Loop a={{ opacity: [1, 1, 1, 0], pathLength: [0, 1, 1, 1] }} d={9} times={[0, 0.5, 0.92, 1]}>
        <path d="M400 192l24-18 22 8 24-30 22 16" stroke={C.accent} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Loop>

      {/* front layer: issue triage */}
      <Surface x={150} y={206} w={374} h={196} e={2} />
      <Text x={174} y={238} size={11} opacity={0.5}>ISSUE TRIAGE</Text>
      <path d="M174 250h326" stroke={C.line} />
      {rows.map((row, i) => {
        const y = 282 + i * 34;
        return (
          <Loop
            key={row.label}
            a={{ opacity: [0, 0, 1, 1, 0, 0], y: [8, 8, 0, 0, 0, 0] }}
            d={9}
            times={timesFor(row.t)}
            ease="easeOut"
          >
            <Text x={174} y={y} size={12} opacity={0.7}>{row.label}</Text>
            {row.w ? (
              <rect x={260} y={y - 10} width={row.w} height={9} rx={4.5} fill={C.bar} />
            ) : (
              <>
                <rect x={260} y={y - 15} width={118} height={22} rx={11} fill={C.accent} />
                <Text x={319} y={y} size={12} anchor="middle" fill={C.onAccent} weight={500}>to developers</Text>
              </>
            )}
          </Loop>
        );
      })}
    </VisualFrame>
  );
};
