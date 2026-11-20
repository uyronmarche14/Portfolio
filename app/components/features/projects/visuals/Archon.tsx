"use client";

import { motion } from "framer-motion";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Label, Reveal, SceneFrame, T, useBeat } from "./kit";

/** Archon: a task card moves across the board, picks up a comment and a subtask, and the activity log records it. */
const COLS = ["TO DO", "IN PROGRESS", "DONE"];
const CX = (i: number) => 44 + i * 164;

const Mover = () => {
  const { beat } = useBeat();
  return (
    <motion.g initial={false} animate={{ x: beat >= 1 ? 164 : 0 }} transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}>
      <rect x={CX(0)} y={150} width={140} height={52} rx={9} fill={C.paper} stroke={C.accent} strokeWidth={1.5} />
      <rect x={CX(0) + 12} y={164} width={88} height={7} rx={3.5} fill={C.bar} />
      <Reveal at={2}>
        <rect x={CX(0) + 12} y={180} width={34} height={14} rx={7} fill={C.accentSoft} />
        <T x={CX(0) + 29} y={191} size={11} mono anchor="middle" o={1}>2</T>
        <T x={CX(0) + 58} y={191} size={11} mono o={0.6}>1/3</T>
      </Reveal>
    </motion.g>
  );
};

export const Archon = () => (
  <SceneFrame beats={4} ms={1500} label="A kanban task moves from to do to in progress, gains a comment and subtasks, and the activity log records the change">
    <Card x={24} y={24} w={512} h={252} />
    {COLS.map((c, i) => (
      <g key={c}>
        <rect x={CX(i) - 8} y={40} width={156} height={220} rx={10} fill={C.faint} />
        <Label x={CX(i)} y={62}>{c}</Label>
      </g>
    ))}
    {[0, 1].map((i) => (
      <rect key={`a${i}`} x={CX(0)} y={i === 0 ? 76 : 210} width={140} height={i === 0 ? 62 : 40} rx={9} fill={C.paper} stroke={C.line} />
    ))}
    <rect x={CX(0) + 12} y={92} width={80} height={7} rx={3.5} fill={C.bar} />
    <rect x={CX(0) + 12} y={106} width={52} height={6} rx={3} fill={C.line} />
    <rect x={CX(1)} y={76} width={140} height={62} rx={9} fill={C.paper} stroke={C.line} />
    <rect x={CX(1) + 12} y={92} width={70} height={7} rx={3.5} fill={C.bar} />
    <rect x={CX(2)} y={76} width={140} height={44} rx={9} fill={C.paper} stroke={C.line} />
    <rect x={CX(2) + 12} y={92} width={96} height={7} rx={3.5} fill={C.bar} />
    <Mover />

    <Card x={24} y={292} w={512} h={64} />
    <Label x={44} y={318}>ACTIVITY</Label>
    <Reveal at={1}>
      <circle cx={52} cy={338} r={3.5} fill={C.accent} />
      <T x={64} y={342} size={11} mono o={0.85}>Moved to In progress</T>
    </Reveal>
    <Reveal at={2}>
      <T x={252} y={342} size={11} mono o={0.85}>Comment added</T>
    </Reveal>
    <Chip x={410} y={327} at={3} active w={108}>Invite sent</Chip>
  </SceneFrame>
);
