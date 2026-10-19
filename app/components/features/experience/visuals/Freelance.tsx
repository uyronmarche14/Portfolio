"use client";

import { C, Loop, Surface, Text, VisualFrame } from "../ExperienceVisualKit";

/** Freelance: one product delivered to web and mobile, with AI-assisted refactoring. */
export const FreelanceVisual = () => (
  <VisualFrame>
    {/* back layer: browser window */}
    <Surface x={36} y={56} w={340} h={250} e={1} />
    <path d="M36 92h340" stroke={C.line} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={56 + i * 14} cy={74} r={4} fill={C.faint} />
    ))}
    <rect x={140} y={66} width={150} height={16} rx={8} fill={C.faint} />
    <rect x={60} y={114} width={190} height={15} rx={7.5} fill={C.ink} opacity={0.85} />
    <rect x={60} y={138} width={130} height={8} rx={4} fill={C.bar} />
    <rect x={60} y={158} width={84} height={26} rx={13} fill={C.ink} opacity={0.9} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={60 + i * 104} y={208} width={94} height={74} rx={10} fill={C.faint} />
        <rect x={72 + i * 104} y={222} width={44} height={6} rx={3} fill={C.bar} />
        <rect x={72 + i * 104} y={236} width={66} height={5} rx={2.5} fill={C.line} />
      </g>
    ))}

    {/* middle layer: AI refactor chip */}
    <Loop a={{ opacity: [0, 1, 1, 0, 0], y: [8, 0, 0, 0, 0] }} d={8} times={[0, 0.12, 0.6, 0.72, 1]}>
      <Surface x={52} y={330} w={196} h={36} r={18} e={1} />
      <path d="m72 348 5 5 10-11" stroke={C.accent} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Text x={98} y={352} size={12} opacity={0.75}>refactored with AI</Text>
    </Loop>

    {/* front layer: phone */}
    <Loop a={{ y: [0, -6, 0] }} d={5} times={[0, 0.5, 1]}>
      <Surface x={318} y={104} w={160} h={300} r={28} e={2} />
      <rect x={366} y={116} width={64} height={8} rx={4} fill={C.faint} />
      <rect x={340} y={144} width={74} height={11} rx={5.5} fill={C.ink} opacity={0.8} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={352} cy={190 + i * 52} r={13} fill={C.faint} />
          <rect x={374} y={181 + i * 52} width={70} height={8} rx={4} fill={C.ink} opacity={0.55} />
          <rect x={374} y={196 + i * 52} width={48} height={6} rx={3} fill={C.bar} />
        </g>
      ))}
      <Loop a={{ scale: [1, 1, 0.93, 1, 1] }} d={8} times={[0, 0.42, 0.47, 0.55, 1]}>
        <rect x={340} y={350} width={116} height={36} rx={18} fill={C.accent} />
        <Text x={398} y={373} size={13} anchor="middle" fill={C.onAccent} mono={false} weight={500}>Book now</Text>
      </Loop>
    </Loop>

    {/* cursor tapping the phone button, with a ripple */}
    <Loop a={{ opacity: [0, 0.45, 0, 0], scale: [0.2, 0.2, 1.8, 1.8] }} d={8} times={[0, 0.44, 0.62, 1]}>
      <circle cx={398} cy={368} r={16} fill={C.accent} />
    </Loop>
    <Loop
      a={{ x: [0, 250, 250, 250, 0], y: [0, 156, 156, 156, 0], opacity: [0, 1, 1, 0, 0] }}
      d={8}
      times={[0, 0.4, 0.5, 0.65, 1]}
    >
      <path
        d="M120 212v18l5-5 4 9 4-2-4-9h7z"
        fill={C.ink}
        stroke={C.paper}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Loop>
  </VisualFrame>
);
