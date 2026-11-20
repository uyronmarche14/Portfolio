"use client";

import { motion } from "framer-motion";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Dot, Highlight, Label, Reveal, SceneFrame, T, Tick, useBeat } from "./kit";

/** Best Brew: pick a drink, pay, the loyalty ring fills, and the order moves from received to ready. */
const MENU = ["Latte", "Cold brew", "Mocha", "Flat white"];
const STEPS = ["Received", "Brewing", "Ready"];

const Ring = () => {
  const { beat } = useBeat();
  const r = 40;
  return (
    <g>
      <circle cx={398} cy={106} r={r} fill="none" stroke={C.faint} strokeWidth={9} />
      <motion.circle cx={398} cy={106} r={r} fill="none" stroke={C.accent} strokeWidth={9} strokeLinecap="round" transform="rotate(-90 398 106)" initial={false} animate={{ pathLength: beat >= 2 ? 0.72 : 0 }} transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }} />
      <T x={398} y={111} size={13} anchor="middle" o={0.9}>points</T>
    </g>
  );
};

export const BestBrew = () => (
  <SceneFrame beats={4} ms={1500} label="A coffee order is picked and paid, a loyalty ring fills, and order tracking moves from received to ready">
    <Card x={24} y={24} w={224} h={332} />
    <Label x={44} y={52}>MENU</Label>
    {MENU.map((m, i) => (
      <g key={m}>
        {i === 0 && <Highlight x={36} y={68} w={200} h={46} from={0} to={3} />}
        <circle cx={62} cy={91 + i * 52} r={14} fill={C.faint} />
        <T x={88} y={96 + i * 52} size={13} o={i === 0 ? 1 : 0.7}>{m}</T>
      </g>
    ))}
    <Reveal at={1}>
      <rect x={44} y={296} width={188} height={40} rx={20} fill={C.accent} />
      <T x={138} y={321} size={13} anchor="middle" o={1} fill={C.onAccent}>Paid</T>
      <Tick x={96} y={317} at={1} size={10} />
    </Reveal>

    <Card x={264} y={24} w={272} h={164} />
    <Label x={284} y={52}>LOYALTY</Label>
    <Ring />
    <Chip x={430} y={92} at={2} w={86}>+1 reward</Chip>

    <Card x={264} y={204} w={272} h={152} />
    <Label x={284} y={232}>ORDER TRACKING</Label>
    <line x1={310} x2={490} y1={290} y2={290} stroke={C.line} strokeWidth={2} />
    {STEPS.map((s, i) => (
      <g key={s}>
        <Dot cx={310 + i * 90} cy={290} r={11} at={i + 1} ring />
        <T x={310 + i * 90} y={326} size={11} mono anchor="middle" o={0.65}>{s}</T>
      </g>
    ))}
  </SceneFrame>
);
