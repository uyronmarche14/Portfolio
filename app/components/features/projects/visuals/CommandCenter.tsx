"use client";

import { motion } from "framer-motion";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Fill, Label, Reveal, SceneFrame, T, useBeat } from "./kit";

/** AI Command Center: a workout plan and meal log feed a progress chart, and a sample suggestion follows. */
const LINE = "M44 196 C74 184 96 176 124 160 S176 130 204 138 S256 100 300 84";

const Chart = () => {
  const { beat } = useBeat();
  const on = beat >= 2;
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <line key={i} x1={44} x2={300} y1={100 + i * 40} y2={100 + i * 40} stroke={C.line} strokeDasharray="3 5" />
      ))}
      <motion.path d={`${LINE} V212 H44 Z`} fill={C.accentSoft} stroke="none" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.8 }} />
      <motion.path d={LINE} fill="none" stroke={C.accent} strokeWidth={2.5} strokeLinecap="round" initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }} />
    </g>
  );
};

export const CommandCenter = () => (
  <SceneFrame beats={4} ms={1500} label="A workout plan and meal log feed a progress chart, followed by a sample AI suggestion">
    <Card x={24} y={24} w={316} h={196} />
    <Label x={44} y={52}>PROGRESS</Label>
    <Chart />

    <Card x={356} y={24} w={180} h={196} />
    <Label x={372} y={52}>THIS WEEK</Label>
    {[
      ["Workout plan", 0.75, 0],
      ["Meal log", 0.55, 1],
      ["Check-in", 0.3, 2],
    ].map(([l, p, at]) => (
      <g key={l as string}>
        <T x={372} y={86 + (at as number) * 46} size={13} o={0.85}>{l as string}</T>
        <Fill x={372} y={96 + (at as number) * 46} w={148} h={6} pct={p as number} at={at as number} />
      </g>
    ))}

    <Card x={24} y={236} w={512} h={120} />
    <Label x={44} y={264}>SAMPLE SUGGESTION</Label>
    <Reveal at={3}>
      <circle cx={52} cy={296} r={10} fill={C.accent} />
      <T x={52} y={300} size={11} mono anchor="middle" o={1} fill={C.onAccent}>AI</T>
      <T x={72} y={300} size={13} o={0.95}>Add a rest day after two hard sessions.</T>
      <Chip x={44} y={318} active w={108}>Apply to plan</Chip>
    </Reveal>
  </SceneFrame>
);
