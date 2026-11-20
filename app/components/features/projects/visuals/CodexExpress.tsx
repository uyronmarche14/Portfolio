"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Dot, Highlight, Label, Reveal, SceneFrame, T, Tick, Between } from "./kit";

/** Codex Express: pick a day and a slot at a location, the booking confirms, an email goes out. */
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const BUSY = new Set([3, 9, 12, 16, 17, 23, 26, 30]);
const PICK = 15;
const SLOTS = ["09:00", "10:30", "13:00", "15:30"];
const PLACES = ["Main office", "Clinic east", "Clinic west"];

export const CodexExpress = () => (
  <SceneFrame beats={4} ms={1500} label="An appointment is booked from a calendar, confirmed, and an email notification is sent">
    <Card x={24} y={24} w={308} h={332} />
    <Label x={44} y={52}>AVAILABILITY</Label>
    {DAYS.map((d, i) => (
      <Label key={i} x={62 + i * 40} y={80} anchor="middle">{d}</Label>
    ))}
    {Array.from({ length: 35 }, (_, n) => {
      const col = n % 7;
      const row = Math.floor(n / 7);
      const day = n - 2;
      const x = 48 + col * 40;
      const y = 92 + row * 34;
      if (day < 1 || day > 31) return null;
      const picked = day === PICK;
      return (
        <g key={n}>
          <rect x={x} y={y} width={28} height={28} rx={7} fill={BUSY.has(day) ? C.accentSoft : C.faint} />
          {picked && <Highlight x={x - 2} y={y - 2} w={32} h={32} r={9} from={0} to={3} />}
          {picked && (
            <Reveal at={0}>
              <rect x={x} y={y} width={28} height={28} rx={7} fill="none" stroke={C.accent} strokeWidth={1.5} />
            </Reveal>
          )}
          <T x={x + 14} y={y + 18} size={11} mono anchor="middle" o={picked ? 1 : 0.55}>{day}</T>
        </g>
      );
    })}
    <Reveal at={2}>
      <circle cx={52} cy={332} r={12} fill={C.accent} />
      <Tick x={52} y={333} at={2} size={11} />
      <T x={74} y={337} size={13} o={0.9}>Booking confirmed</T>
    </Reveal>
    <Chip x={226} y={321} at={3} active>Email sent</Chip>

    <Card x={348} y={24} w={188} h={196} />
    <Label x={364} y={52}>TIME SLOTS</Label>
    {SLOTS.map((s, i) => (
      <Chip key={s} x={364 + (i % 2) * 78} y={68 + Math.floor(i / 2) * 32} w={66} at={0} active={false}>{s}</Chip>
    ))}
    <Reveal at={1}>
      <rect x={442} y={68} width={66} height={22} rx={11} fill={C.accent} />
      <T x={475} y={83} size={11} mono anchor="middle" o={1} fill={C.onAccent}>10:30</T>
    </Reveal>
    <Between from={0} to={0}>
      <T x={364} y={160} size={11} mono o={0.5}>Checking availability…</T>
    </Between>
    <Between from={1} to={3}>
      <T x={364} y={160} size={11} mono o={0.5}>Slot held for you</T>
    </Between>

    <Card x={348} y={236} w={188} h={120} />
    <Label x={364} y={264}>LOCATIONS</Label>
    {PLACES.map((p, i) => (
      <g key={p}>
        <Dot cx={372} cy={286 + i * 26} r={5} at={i === 1 ? 1 : 99} />
        <T x={388} y={290 + i * 26} size={11} mono o={0.8}>{p}</T>
      </g>
    ))}
  </SceneFrame>
);
