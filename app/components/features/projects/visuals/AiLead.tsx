"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** AiLead: a prompt becomes a script and then a video timeline. */
export const AiLead = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={200} h={120} e={1} />
    <Text x={54} y={82} size={11} opacity={0.5}>PROMPT</Text>
    <rect x={54} y={98} width={150} height={8} rx={4} fill={C.ink} opacity={0.6} />
    <rect x={54} y={116} width={110} height={8} rx={4} fill={C.bar} />
    <Loop a={{ opacity: [1, 0, 1, 0, 1] }} d={1.2} ease="linear">
      <rect x={172} y={113} width={3} height={14} fill={C.accent} />
    </Loop>
    <Surface x={256} y={56} w={268} h={120} e={1} />
    <Text x={274} y={82} size={11} opacity={0.5}>SCRIPT</Text>
    {rows(3).map((i) => (
      <Loop key={i} a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.2 + i * 0.12, 0.9, 1]} origin="left center">
        <rect x={274} y={98 + i * 22} width={220 - i * 40} height={8} rx={4} fill={i === 1 ? C.accent : C.bar} />
      </Loop>
    ))}
    <path d="M236 116h20" stroke={C.accent} strokeWidth={1.5} strokeDasharray="3 3" />
    <Surface x={36} y={198} w={488} h={188} r={16} e={2} />
    <rect x={56} y={218} width={150} height={96} rx={10} fill={C.faint} />
    <circle cx={131} cy={266} r={20} fill={C.paper} stroke={C.line} />
    <path d="M125 256l18 10-18 10z" fill={C.accent} />
    {["Avatar", "Voice", "Language"].map((l, i) => (
      <g key={l}>
        <rect x={226} y={222 + i * 34} width={278} height={26} rx={13} fill={C.faint} />
        <Text x={242} y={239 + i * 34} size={12} opacity={0.7} mono={false}>{l}</Text>
        <rect x={340} y={230 + i * 34} width={150 - i * 24} height={8} rx={4} fill={C.bar} />
      </g>
    ))}
    <rect x={56} y={334} width={448} height={8} rx={4} fill={C.faint} />
    <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.8, 0.94, 1]} origin="left center" ease="linear">
      <rect x={56} y={334} width={448} height={8} rx={4} fill={C.accent} opacity={0.7} />
    </Loop>
  </VisualFrame>
);
