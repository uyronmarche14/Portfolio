"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** Codex Express: a calendar where a free slot gets booked, then a notification arrives. */
export const CodexExpress = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={330} h={330} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>APPOINTMENTS</Text>
    {rows(7).map((c) => (
      <Text key={c} x={66 + c * 44} y={116} size={11} anchor="middle" opacity={0.45}>{"SMTWTFS"[c]}</Text>
    ))}
    {rows(28).map((i) => {
      const x = 48 + (i % 7) * 44;
      const y = 130 + Math.floor(i / 7) * 56;
      const booked = [3, 9, 16, 20].includes(i);
      return <rect key={i} x={x} y={y} width={36} height={44} rx={8} fill={booked ? C.accentSoft : C.faint} />;
    })}
    <Loop a={{ opacity: [0, 0, 1, 1, 0] }} d={8} times={[0, 0.2, 0.28, 0.9, 1]} ease="linear">
      <rect x={224} y={242} width={36} height={44} rx={8} fill={C.accent} />
      <path d="m234 264 5 5 9-10" stroke={C.onAccent} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Loop>
    <Loop a={{ x: [0, 0, 0, 0], y: [0, 0, 0, 0], opacity: [0, 0, 1, 1, 0, 0] }} d={8} times={[0, 0.34, 0.42, 0.8, 0.88, 1]} ease="easeOut">
      <Surface x={320} y={300} w={204} h={68} r={14} e={2} />
      <circle cx={346} cy={334} r={11} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.6} />
      <Text x={366} y={330} size={12} weight={600} mono={false}>Booking confirmed</Text>
      <Text x={366} y={348} size={11} opacity={0.55}>email sent</Text>
    </Loop>
    <Surface x={388} y={72} w={136} h={150} e={1} />
    <Text x={404} y={98} size={11} opacity={0.5}>LOCATIONS</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <circle cx={410} cy={124 + i * 32} r={5} fill={i === 0 ? C.accent : C.bar} />
        <rect x={426} y={119 + i * 32} width={70 - i * 8} height={8} rx={4} fill={C.bar} />
      </g>
    ))}
  </VisualFrame>
);
