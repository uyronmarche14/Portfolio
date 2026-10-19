"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** AI Command Center: a progress dashboard with a trend line. */
export const CommandCenter = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={300} h={170} e={1} />
    <Text x={58} y={84} size={11} opacity={0.5}>PROGRESS</Text>
    <path d="M58 200l40-30 40 14 44-50 40 24 46-36 30-6V210H58z" fill={C.accentSoft} />
    <Loop a={{ opacity: [1, 1, 1, 0], pathLength: [0, 1, 1, 1] }} d={9} times={[0, 0.5, 0.92, 1]}>
      <path d="M58 200l40-30 40 14 44-50 40 24 46-36 30-6" stroke={C.accent} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Loop>
    {rows(3).map((i) => (
      <Surface key={i} x={356 + 0} y={56 + i * 60} w={168} h={50} r={12} e={1} />
    ))}
    {["Workout plan", "Meal log", "Weekly check-in"].map((l, i) => (
      <g key={l}>
        <Text x={372} y={86 + i * 60} size={12} opacity={0.8} mono={false}>{l}</Text>
        <rect x={372} y={94 + i * 60} width={136} height={5} rx={2.5} fill={C.line} />
        <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.4 + i * 0.1, 0.92, 1]} origin="left center">
          <rect x={372} y={94 + i * 60} width={(0.9 - i * 0.2) * 136} height={5} rx={2.5} fill={C.accent} />
        </Loop>
      </g>
    ))}
    <Surface x={36} y={246} w={300} h={140} r={16} e={2} />
    <circle cx={64} cy={282} r={12} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.6} />
    <Text x={86} y={286} size={12} weight={600} mono={false}>AI suggestion</Text>
    <Loop a={{ opacity: [0, 1, 1, 0] }} d={8} times={[0, 0.2, 0.85, 1]} ease="linear">
      {rows(3).map((i) => <rect key={i} x={56} y={306 + i * 20} width={240 - i * 50} height={8} rx={4} fill={C.bar} />)}
    </Loop>
  </VisualFrame>
);
