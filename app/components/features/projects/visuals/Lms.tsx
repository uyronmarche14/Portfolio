"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** LMS: role-gated courses, progress, and a file going to cloud storage. */
export const Lms = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={300} h={200} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>COURSES</Text>
    {rows(3).map((i) => (
      <g key={i}>
        <rect x={58} y={104 + i * 50} width={256} height={40} rx={10} fill={C.faint} />
        <rect x={72} y={118 + i * 50} width={90} height={8} rx={4} fill={C.ink} opacity={0.55} />
        <rect x={72} y={132 + i * 50} width={256 - 40 - 10} height={4} rx={2} fill={C.line} />
        <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.3 + i * 0.1, 0.92, 1]} origin="left center">
          <rect x={72} y={132 + i * 50} width={(0.8 - i * 0.2) * 216} height={4} rx={2} fill={C.accent} />
        </Loop>
      </g>
    ))}
    <Surface x={36} y={276} w={140} h={110} e={2} />
    <Text x={52} y={302} size={11} opacity={0.5}>UPLOAD</Text>
    <rect x={52} y={316} width={108} height={50} rx={10} fill={C.faint} stroke={C.line} strokeDasharray="4 4" />
    <Loop a={{ y: [0, 0, 22, 22, 0], opacity: [0, 1, 1, 0, 0] }} d={8} times={[0, 0.1, 0.45, 0.6, 1]}>
      <rect x={90} y={322} width={32} height={26} rx={5} fill={C.accent} />
    </Loop>
    <Loop a={{ x: [0, 0, 140, 140, 0], opacity: [0, 1, 1, 0, 0] }} d={8} times={[0, 0.5, 0.75, 0.8, 1]} ease="easeInOut">
      <circle cx={190} cy={331} r={6} fill={C.accent} />
    </Loop>
    <Surface x={346} y={286} w={178} h={100} e={1} />
    <Text x={362} y={312} size={11} opacity={0.5}>STORAGE</Text>
    <rect x={362} y={326} width={146} height={42} rx={10} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.5} />
    <Surface x={356} y={96} w={168} h={150} r={14} e={2} />
    <Text x={372} y={122} size={11} opacity={0.5}>ACCESS</Text>
    {["Learner", "Admin"].map((r, i) => (
      <g key={r}>
        <rect x={372} y={136 + i * 44} width={136} height={34} rx={17} fill={i === 1 ? C.accent : "none"} stroke={i === 1 ? C.accent : C.line} />
        <Text x={440} y={158 + i * 44} size={12} anchor="middle" fill={i === 1 ? C.onAccent : C.ink} opacity={i === 1 ? 1 : 0.65}>{r}</Text>
      </g>
    ))}
  </VisualFrame>
);
