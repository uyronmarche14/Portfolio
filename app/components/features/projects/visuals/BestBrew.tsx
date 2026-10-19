"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** Best Brew Coffee: an order flow with a loyalty ring. */
export const BestBrew = () => (
  <VisualFrame>
    <Surface x={120} y={44} w={180} h={352} r={30} e={2} />
    <Text x={142} y={90} size={11} opacity={0.5}>MENU</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <rect x={140} y={106 + i * 72} width={140} height={60} rx={12} fill={C.faint} />
        <circle cx={166} cy={136 + i * 72} r={16} fill={i === 1 ? C.accentSoft : C.line} />
        <rect x={192} y={124 + i * 72} width={64} height={8} rx={4} fill={C.ink} opacity={0.55} />
        <rect x={192} y={142 + i * 72} width={40} height={7} rx={3.5} fill={C.bar} />
      </g>
    ))}
    <Loop a={{ opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1, 1, 0.9] }} d={8} times={[0, 0.25, 0.32, 0.9, 1]} ease="easeOut">
      <rect x={140} y={178} width={140} height={60} rx={12} fill="none" stroke={C.accent} strokeWidth={2} />
    </Loop>
    <Surface x={332} y={96} w={190} h={150} e={1} />
    <Text x={350} y={122} size={11} opacity={0.5}>LOYALTY</Text>
    <circle cx={427} cy={178} r={34} fill="none" stroke={C.line} strokeWidth={8} />
    <Loop a={{ rotate: [0, 0, 0] }} d={8}>
      <circle cx={427} cy={178} r={34} fill="none" stroke={C.accent} strokeWidth={8} strokeLinecap="round" strokeDasharray="214" strokeDashoffset="70" transform="rotate(-90 427 178)" />
    </Loop>
    <Text x={427} y={183} size={13} anchor="middle" weight={600} mono={false}>points</Text>
    <Surface x={332} y={262} w={190} h={96} e={1} />
    <Text x={350} y={288} size={11} opacity={0.5}>ORDER TRACKING</Text>
    <path d="M356 326h140" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
    <Loop a={{ scaleX: [0, 1, 1, 0] }} d={8} times={[0, 0.7, 0.92, 1]} origin="left center" ease="linear">
      <rect x={356} y={324.5} width={140} height={3} rx={1.5} fill={C.accent} />
    </Loop>
  </VisualFrame>
);
