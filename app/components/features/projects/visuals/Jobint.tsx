"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** Jobint: a phone with an interview question and a speech waveform. */
export const Jobint = () => (
  <VisualFrame>
    <Surface x={190} y={44} w={180} h={352} r={30} e={2} />
    <rect x={250} y={58} width={60} height={8} rx={4} fill={C.faint} />
    <Text x={212} y={104} size={11} opacity={0.5}>MOCK INTERVIEW</Text>
    <Surface x={208} y={118} w={144} h={80} r={14} e={0} fill={C.faint} />
    <rect x={222} y={134} width={112} height={8} rx={4} fill={C.ink} opacity={0.6} />
    <rect x={222} y={152} width={96} height={8} rx={4} fill={C.bar} />
    <rect x={222} y={170} width={64} height={8} rx={4} fill={C.bar} />
    {rows(13).map((i) => (
      <Loop key={i} a={{ scaleY: [0.3, 1, 0.45, 0.85, 0.3] }} d={1.6 + (i % 4) * 0.3} delay={i * 0.07} origin="center">
        <rect x={214 + i * 10.5} y={236} width={5} height={44} rx={2.5} fill={C.accent} />
      </Loop>
    ))}
    <rect x={208} y={310} width={144} height={34} rx={17} fill={C.accent} />
    <Text x={280} y={332} size={13} anchor="middle" fill={C.onAccent} weight={500} mono={false}>Recording</Text>
    <Loop a={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, 0] }} d={7} times={[0, 0.2, 0.8, 1]} ease="easeOut">
      <Surface x={384} y={150} w={142} h={64} r={12} e={1} />
      <Text x={398} y={174} size={11} opacity={0.5}>FEEDBACK</Text>
      <rect x={398} y={186} width={110} height={8} rx={4} fill={C.faint} />
      <rect x={398} y={186} width={82} height={8} rx={4} fill={C.accent} />
    </Loop>
  </VisualFrame>
);
