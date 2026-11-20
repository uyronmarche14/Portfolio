"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Fill, Highlight, Label, Reveal, SceneFrame, T } from "./kit";

/** Reservation desktop app: choose an appointment, a reminder is queued, the bill builds, the report prints. */
const NAV = ["Appointments", "Doctors", "Billing", "Reports"];
const ROWS = [
  ["09:00", "Check-up"],
  ["10:00", "Follow-up"],
  ["11:30", "Lab review"],
  ["13:00", "Consultation"],
];

export const ReservationDesktop = () => (
  <SceneFrame beats={4} ms={1500} label="A clinic desktop app: an appointment is selected, an SMS reminder is queued, the bill builds, and the report is printed">
    <Card x={24} y={24} w={512} h={332} />
    <line x1={24} x2={536} y1={60} y2={60} stroke={C.line} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={46 + i * 16} cy={42} r={4} fill={C.bar} />
    ))}
    <line x1={152} x2={152} y1={60} y2={356} stroke={C.line} />
    {NAV.map((n, i) => (
      <g key={n}>
        {i === 0 && <rect x={32} y={76} width={112} height={30} rx={8} fill={C.accentSoft} />}
        <T x={46} y={96 + i * 36} size={13} o={i === 0 ? 1 : 0.6} bold={i === 0}>{n}</T>
      </g>
    ))}

    <Label x={172} y={84}>TODAY</Label>
    {ROWS.map(([t, k], i) => (
      <g key={t}>
        {i === 1 && <Highlight x={168} y={96 + i * 46} w={212} h={38} from={0} to={3} />}
        <rect x={168} y={96 + i * 46} width={212} height={38} rx={8} fill="none" stroke={C.line} />
        <T x={182} y={120 + i * 46} size={11} mono o={0.9}>{t}</T>
        <T x={238} y={120 + i * 46} size={13} o={0.85}>{k}</T>
      </g>
    ))}
    <Chip x={168} y={290} at={1} w={132}>SMS reminder queued</Chip>

    <Card x={396} y={76} w={124} h={196} r={10} />
    <Label x={410} y={100}>BILL</Label>
    {["Consultation", "Lab test", "Medicine"].map((l, i) => (
      <Reveal key={l} at={2}>
        <T x={410} y={128 + i * 28} size={11} mono o={0.7}>{l}</T>
        <Fill x={410} y={136 + i * 28} w={92} h={4} pct={[0.8, 0.55, 0.4][i]} at={2} />
      </Reveal>
    ))}
    <Chip x={410} y={236} at={3} active w={96}>Print report</Chip>
  </SceneFrame>
);
