"use client";

import { C, Loop, Panel, Text, VisualFrame } from "../ExperienceVisualKit";

/** Freelance: one product delivered to web and mobile, with AI-assisted refactoring. */
export const FreelanceVisual = () => (
  <VisualFrame>
    <Panel title="ONE PRODUCT, WEB AND MOBILE" tag="sample" h={312}>
      {/* browser */}
      <rect x={22} y={64} width={262} height={186} rx={12} fill={C.faint} />
      <path d="M22 92H284" stroke={C.line} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={38 + i * 13} cy={78} r={3.5} fill={C.bar} />
      ))}
      <rect x={110} y={71} width={110} height={14} rx={7} fill={C.paper} />
      <rect x={40} y={108} width={150} height={13} rx={6.5} fill={C.ink} opacity={0.85} />
      <rect x={40} y={130} width={104} height={7} rx={3.5} fill={C.bar} />
      <rect x={40} y={148} width={72} height={22} rx={11} fill={C.ink} opacity={0.9} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 80} y={184} width={70} height={52} rx={8} fill={C.paper} />
          <rect x={50 + i * 80} y={196} width={34} height={6} rx={3} fill={C.bar} />
          <rect x={50 + i * 80} y={208} width={48} height={5} rx={2.5} fill={C.line} />
        </g>
      ))}

      {/* phone */}
      <rect x={326} y={64} width={112} height={186} rx={22} fill={C.paper} stroke={C.bar} strokeWidth={1.5} />
      <rect x={364} y={74} width={36} height={6} rx={3} fill={C.faint} />
      <rect x={342} y={94} width={56} height={9} rx={4.5} fill={C.ink} opacity={0.8} />
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={352} cy={124 + i * 34} r={9} fill={C.faint} />
          <rect x={368} y={118 + i * 34} width={52} height={6} rx={3} fill={C.ink} opacity={0.55} />
          <rect x={368} y={129 + i * 34} width={36} height={5} rx={2.5} fill={C.bar} />
        </g>
      ))}
      <Loop a={{ opacity: [1, 1, 0.6, 1, 1] }} d={8} times={[0, 0.42, 0.47, 0.55, 1]}>
        <rect x={342} y={204} width={80} height={28} rx={14} fill={C.accent} />
        <Text x={382} y={223} size={12} anchor="middle" fill={C.onAccent} mono={false} weight={500}>Book now</Text>
      </Loop>

      {/* AI refactor note */}
      <rect x={22} y={266} width={196} height={30} rx={15} fill={C.faint} />
      <path d="m40 281 5 5 9-10" stroke={C.accent} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Text x={64} y={286} size={12} opacity={0.75}>refactored with AI</Text>
    </Panel>
  </VisualFrame>
);
