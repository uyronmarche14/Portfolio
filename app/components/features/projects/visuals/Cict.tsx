"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** CICT: web admin and a phone sharing one API, with a QR scan. */
export const Cict = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={290} h={200} e={1} />
    <path d="M36 90h290" stroke={C.line} />
    {rows(3).map((i) => <circle key={i} cx={54 + i * 13} cy={73} r={3.5} fill={C.faint} />)}
    <Text x={56} y={118} size={11} opacity={0.5}>EVENTS</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <rect x={56} y={130 + i * 38} width={250} height={30} rx={8} fill={C.faint} />
        <rect x={68} y={141 + i * 38} width={84} height={7} rx={3.5} fill={C.bar} />
        <rect x={252} y={138 + i * 38} width={44} height={14} rx={7} fill={i === 0 ? C.accent : C.line} />
      </g>
    ))}
    <Surface x={384} y={80} w={120} h={240} r={24} e={2} />
    <rect x={426} y={92} width={36} height={6} rx={3} fill={C.faint} />
    <rect x={402} y={124} width={84} height={84} rx={10} fill={C.paper} stroke={C.line} />
    {rows(16).map((i) => <rect key={i} x={412 + (i % 4) * 17} y={134 + Math.floor(i / 4) * 17} width={11} height={11} rx={2} fill={C.ink} opacity={i % 3 === 0 ? 0.8 : 0.2} />)}
    <Loop a={{ y: [0, 72, 0] }} d={3.2} ease="linear">
      <rect x={402} y={126} width={84} height={3} rx={1.5} fill={C.accent} />
    </Loop>
    <rect x={402} y={232} width={84} height={26} rx={13} fill={C.accent} />
    <Text x={444} y={250} size={12} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Attendance</Text>
    <path d="M326 156h58" stroke={C.accent} strokeWidth={2} strokeDasharray="5 5" />
    <Surface x={36} y={290} w={488} h={96} e={1} />
    <Text x={58} y={318} size={11} opacity={0.5}>SHARED API</Text>
    {["Content", "Events", "Roles", "Attendance"].map((l, i) => (
      <g key={l}>
        <rect x={58 + i * 114} y={332} width={100} height={32} rx={16} fill={i === 3 ? C.accentSoft : C.faint} stroke={i === 3 ? C.accent : "none"} strokeOpacity={0.5} />
        <Text x={108 + i * 114} y={353} size={12} anchor="middle" opacity={0.8}>{l}</Text>
      </g>
    ))}
  </VisualFrame>
);
