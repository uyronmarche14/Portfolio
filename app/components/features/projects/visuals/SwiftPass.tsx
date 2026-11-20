"use client";

import { motion } from "framer-motion";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Beam, Card, Chip, Label, Reveal, SceneFrame, T, useBeat } from "./kit";

/** SwiftPass Guard: a student shows a QR code, the device checks it, the lock opens, and the entry is logged and synced. */
const QR = Array.from({ length: 49 }, (_, i) => ((i * 7 + Math.floor(i / 7) * 3) % 5 !== 0 ? 1 : 0));

const Lock = () => {
  const { beat } = useBeat();
  const open = beat >= 2;
  return (
    <g>
      <motion.path d="M444 124 v-14 a16 16 0 0 1 32 0 v14" fill="none" stroke={open ? C.accent : C.bar} strokeWidth={5} strokeLinecap="round" initial={false} animate={{ y: open ? -10 : 0 }} transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }} />
      <rect x={436} y={124} width={48} height={38} rx={9} fill={open ? C.accent : C.faint} stroke={C.line} />
    </g>
  );
};

export const SwiftPass = () => (
  <SceneFrame beats={4} ms={1500} label="A student shows a QR code, the device checks it, the door lock opens, and the entry is logged and synced">
    <Card x={24} y={24} w={168} h={200} />
    <Label x={40} y={52}>STUDENT</Label>
    {QR.map((on, i) => (on ? <rect key={i} x={50 + (i % 7) * 15} y={68 + Math.floor(i / 7) * 15} width={11} height={11} rx={2} fill={C.ink} opacity={0.85} /> : null))}
    <Chip x={50} y={186} at={0} active w={100}>Show QR</Chip>

    <Card x={224} y={24} w={152} h={200} />
    <Label x={240} y={52}>DEVICE</Label>
    <rect x={240} y={68} width={120} height={44} rx={8} fill={C.faint} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={250 + i * 17} y={80} width={8} height={20} rx={2} fill={C.bar} />
    ))}
    <Reveal at={1}>
      <T x={240} y={140} size={11} mono o={0.6}>Checking role…</T>
    </Reveal>
    <Chip x={240} y={186} at={2} active w={118}>Access granted</Chip>

    <Card x={408} y={24} w={128} h={200} />
    <Label x={424} y={52}>DOOR</Label>
    <Lock />
    <Beam d="M192 124 H224" at={1} />
    <Beam d="M376 124 H408" at={2} />

    <Card x={24} y={240} w={512} h={116} />
    <Label x={44} y={268}>ATTENDANCE LOG (SAMPLE)</Label>
    <Reveal at={3}>
      <circle cx={52} cy={298} r={4} fill={C.accent} />
      <T x={66} y={302} size={13} o={0.9}>Entry logged at the main gate</T>
      <Chip x={420} y={286} active w={96}>Synced</Chip>
    </Reveal>
    <Reveal at={3}>
      <rect x={44} y={322} width={472} height={4} rx={2} fill={C.faint} />
    </Reveal>
  </SceneFrame>
);
