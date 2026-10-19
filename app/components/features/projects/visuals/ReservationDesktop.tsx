"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** Reservation Desktop: a desktop clinic window with a doctor schedule and a billing panel. */
export const ReservationDesktop = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={488} h={330} e={1} />
    <path d="M36 92h488" stroke={C.line} />
    {rows(3).map((i) => <circle key={i} cx={56 + i * 14} cy={74} r={4} fill={C.faint} />)}
    <rect x={36} y={92} width={110} height={294} fill={C.faint} />
    {["Appointments", "Doctors", "Billing", "Reports"].map((l, i) => (
      <Text key={l} x={52} y={124 + i * 34} size={12} weight={i === 0 ? 600 : 400} opacity={i === 0 ? 1 : 0.55} mono={false}>{l}</Text>
    ))}
    {rows(5).map((r) => (
      <g key={r}>
        <rect x={166} y={112 + r * 40} width={190} height={30} rx={8} fill={C.faint} />
        <rect x={176} y={123 + r * 40} width={70} height={7} rx={3.5} fill={C.bar} />
        <rect x={264} y={123 + r * 40} width={36} height={7} rx={3.5} fill={C.line} />
      </g>
    ))}
    <Loop a={{ y: [0, 0, 40, 80, 80, 0] }} d={9} times={[0, 0.15, 0.35, 0.55, 0.9, 1]}>
      <rect x={164} y={110} width={194} height={34} rx={9} fill="none" stroke={C.accent} strokeWidth={2} />
    </Loop>
    <Surface x={374} y={112} w={134} h={150} r={12} e={2} />
    <Text x={388} y={138} size={11} opacity={0.5}>BILL</Text>
    {rows(3).map((i) => <rect key={i} x={388} y={152 + i * 22} width={80 - i * 10} height={7} rx={3.5} fill={C.bar} />)}
    <rect x={388} y={226} width={104} height={24} rx={12} fill={C.accent} />
    <Text x={440} y={243} size={12} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Print report</Text>
  </VisualFrame>
);
