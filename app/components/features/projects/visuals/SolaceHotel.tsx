"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Label, Reveal, SceneFrame, T, Between } from "./kit";

/** Solace Hotel: a date range is picked, a room is held, the guest sees the reservation and the admin sees the booking. */
const ROOMS = ["Room 101", "Room 102", "Room 103", "Room 104"];
const BUSY = new Set(["0-1", "0-4", "1-0", "1-5", "2-6", "3-2", "3-3"]);
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export const SolaceHotel = () => (
  <SceneFrame beats={4} ms={1500} label="A hotel room is found by date range and held, the guest sees the reservation, and the admin sees the booking">
    <Card x={24} y={24} w={332} h={332} />
    <Label x={44} y={52}>AVAILABILITY</Label>
    {DAYS.map((d, i) => (
      <Label key={i} x={148 + i * 30} y={80} anchor="middle">{d}</Label>
    ))}
    {ROOMS.map((r, ri) => (
      <g key={r}>
        <T x={44} y={118 + ri * 54} size={13} o={0.8}>{r}</T>
        {DAYS.map((_, ci) => (
          <rect key={ci} x={134 + ci * 30} y={98 + ri * 54} width={26} height={30} rx={7} fill={BUSY.has(`${ri}-${ci}`) ? C.accentSoft : C.faint} />
        ))}
      </g>
    ))}
    {/* the picked range on Room 103, days Wed to Fri */}
    <Reveal at={0}>
      <rect x={194} y={206} width={86} height={30} rx={8} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="4 4" />
    </Reveal>
    <Reveal at={1}>
      <rect x={194} y={206} width={86} height={30} rx={8} fill={C.accent} />
      <T x={237} y={226} size={11} mono anchor="middle" o={1} fill={C.onAccent}>HELD</T>
    </Reveal>
    <Between from={0} to={0}>
      <T x={44} y={316} size={11} mono o={0.55}>Choose dates and guests</T>
    </Between>
    <Between from={1} to={3}>
      <T x={44} y={316} size={11} mono o={0.55}>3 nights, 2 guests</T>
    </Between>

    <Card x={372} y={24} w={164} h={160} />
    <Label x={388} y={52}>GUEST</Label>
    <circle cx={414} cy={92} r={14} fill={C.faint} />
    <rect x={438} y={84} width={76} height={8} rx={4} fill={C.bar} />
    <rect x={438} y={98} width={50} height={6} rx={3} fill={C.line} />
    <Chip x={388} y={134} at={2} active w={110}>Reservation sent</Chip>

    <Card x={372} y={200} w={164} h={156} />
    <Label x={388} y={228}>ADMIN</Label>
    {[0, 1].map((i) => (
      <rect key={i} x={388} y={242 + i * 28} width={132} height={22} rx={8} fill={C.faint} />
    ))}
    <Reveal at={3}>
      <rect x={388} y={298} width={132} height={26} rx={8} fill={C.accentSoft} stroke={C.accent} />
      <T x={400} y={315} size={11} mono o={1}>Room 103 booked</T>
    </Reveal>
  </SceneFrame>
);
