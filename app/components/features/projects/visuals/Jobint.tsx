"use client";

import { motion } from "framer-motion";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Card, Chip, Fill, Label, Reveal, SceneFrame, T, useBeat } from "./kit";

/** Jobint: a mock interview question is answered aloud, then clarity, pace and confidence come back with one tip. */
const BARS = [10, 22, 14, 30, 18, 34, 12, 26, 20, 32, 16, 24, 28, 14, 30, 18, 22, 12, 26, 16];

const Wave = () => {
  const { beat, running } = useBeat();
  const live = beat === 1 && running;
  return (
    <g>
      {BARS.map((h, i) => (
        <motion.rect
          key={i}
          x={48 + i * 13}
          y={236 - h / 2}
          width={6}
          height={h}
          rx={3}
          fill={beat >= 1 ? C.accent : C.bar}
          initial={false}
          animate={live ? { scaleY: [1, 0.35, 1] } : { scaleY: 1 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={live ? { duration: 0.9, repeat: Infinity, delay: i * 0.05 } : { duration: 0.3 }}
        />
      ))}
    </g>
  );
};

export const Jobint = () => (
  <SceneFrame beats={4} ms={1600} label="A mock interview: a question is shown, the answer is recorded, and feedback on clarity, pace and confidence follows">
    <Card x={24} y={24} w={308} h={332} />
    <Label x={44} y={52}>MOCK INTERVIEW</Label>
    <rect x={44} y={68} width={268} height={84} rx={10} fill={C.faint} />
    <T x={60} y={98} size={15}>Tell me about yourself.</T>
    <T x={60} y={124} size={11} mono o={0.5}>Question 1 of 5</T>
    <Wave />
    <Reveal at={0}>
      <T x={44} y={292} size={11} mono o={0.5}>Speak when you are ready</T>
    </Reveal>
    <Chip x={44} y={306} at={1} active w={96}>Recording</Chip>

    <Card x={348} y={24} w={188} h={332} />
    <Label x={364} y={52}>FEEDBACK</Label>
    {[
      ["Clarity", 0.82],
      ["Pace", 0.6],
      ["Confidence", 0.74],
    ].map(([l, p], i) => (
      <g key={l as string}>
        <T x={364} y={88 + i * 52} size={13} o={0.85}>{l as string}</T>
        <Fill x={364} y={98 + i * 52} w={156} h={6} pct={p as number} at={2} />
      </g>
    ))}
    <Reveal at={3}>
      <rect x={364} y={246} width={156} height={84} rx={10} fill={C.accentSoft} />
      <T x={378} y={270} size={11} mono o={0.6}>TIP</T>
      <T x={378} y={292} size={13} o={0.95}>Slow down at the</T>
      <T x={378} y={310} size={13} o={0.95}>start of your answer</T>
    </Reveal>
  </SceneFrame>
);
