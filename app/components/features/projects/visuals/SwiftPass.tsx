"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** SwiftPass Guard: a QR scan at an ESP32 reader that opens a lock. */
export const SwiftPass = () => (
  <VisualFrame>
    <Surface x={36} y={90} w={150} h={260} r={26} e={2} />
    <Text x={54} y={126} size={11} opacity={0.5}>STUDENT</Text>
    <rect x={66} y={150} width={90} height={90} rx={10} fill={C.paper} stroke={C.line} />
    {rows(25).map((i) => (
      <rect key={i} x={74 + (i % 5) * 16} y={158 + Math.floor(i / 5) * 16} width={11} height={11} rx={2} fill={C.ink} opacity={[0, 2, 4, 6, 8, 10, 12, 14, 18, 20, 22, 24].includes(i) ? 0.85 : 0.2} />
    ))}
    <rect x={66} y={268} width={90} height={26} rx={13} fill={C.accent} />
    <Text x={111} y={286} size={12} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Show QR</Text>
    <Loop a={{ x: [0, 0, 110, 110, 0] }} d={8} times={[0, 0.15, 0.42, 0.85, 1]} ease="easeInOut">
      <rect x={186} y={186} width={22} height={22} rx={5} fill={C.accent} opacity={0.85} />
    </Loop>
    <Surface x={290} y={120} w={130} h={80} r={12} e={1} />
    <Text x={305} y={146} size={11} opacity={0.55}>ESP32</Text>
    {rows(6).map((i) => <rect key={i} x={304 + i * 16} y={158} width={9} height={22} rx={2} fill={C.bar} />)}
    <Loop a={{ opacity: [0, 0, 1, 1, 0] }} d={8} times={[0, 0.4, 0.46, 0.85, 1]} ease="linear">
      <path d="M420 160h40" stroke={C.accent} strokeWidth={2} strokeDasharray="4 4" />
    </Loop>
    <Surface x={444} y={130} w={80} h={120} r={14} e={2} />
    <rect x={466} y={150} width={36} height={36} rx={10} fill={C.faint} />
    <Loop a={{ rotate: [0, 0, -35, -35, 0] }} d={8} times={[0, 0.4, 0.55, 0.85, 1]} origin="left bottom">
      <path d="M472 168v-14a12 12 0 0 1 24 0v14" stroke={C.accent} strokeWidth={4} fill="none" strokeLinecap="round" />
    </Loop>
    <rect x={462} y={186} width={44} height={36} rx={8} fill={C.accent} />
    <Surface x={290} y={240} w={130} h={80} r={12} e={1} />
    <Text x={305} y={264} size={11} opacity={0.5}>ATTENDANCE</Text>
    {rows(2).map((i) => <rect key={i} x={305} y={278 + i * 18} width={100 - i * 22} height={8} rx={4} fill={C.bar} />)}
  </VisualFrame>
);
