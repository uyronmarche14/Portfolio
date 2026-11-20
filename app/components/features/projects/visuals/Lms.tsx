"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Beam, Card, Chip, Fill, Label, Reveal, SceneFrame, T, Tick } from "./kit";

/** LMS: only an admin may upload; the file goes to object storage through a pre-signed link, and learners then open the course. */
export const Lms = () => (
  <SceneFrame beats={4} ms={1500} label="A role-gated upload: an admin uploads a file to storage through a pre-signed link, and learners then open the course and see progress">
    <Card x={24} y={24} w={236} h={150} />
    <Label x={40} y={52}>ACCESS</Label>
    <Chip x={40} y={66} at={0} w={80}>Learner</Chip>
    <Reveal at={0}>
      <rect x={128} y={66} width={72} height={22} rx={11} fill={C.accent} />
      <T x={164} y={81} size={11} mono anchor="middle" o={1} fill={C.onAccent}>Admin</T>
    </Reveal>
    <Reveal at={0}>
      <circle cx={52} cy={122} r={10} fill={C.accent} />
      <Tick x={52} y={123} at={0} size={9} />
      <T x={72} y={127} size={13} o={0.9}>Upload allowed</T>
    </Reveal>

    <Card x={24} y={190} w={236} h={166} />
    <Label x={40} y={218}>UPLOAD</Label>
    <rect x={40} y={232} width={204} height={96} rx={10} fill="none" stroke={C.bar} strokeDasharray="5 5" />
    <Reveal at={1} y={-14}>
      <rect x={96} y={254} width={92} height={50} rx={8} fill={C.accentSoft} stroke={C.accent} />
      <T x={142} y={284} size={11} mono anchor="middle" o={1}>lesson.mp4</T>
    </Reveal>

    <Card x={284} y={24} w={252} h={150} />
    <Label x={300} y={52}>OBJECT STORAGE</Label>
    <rect x={300} y={68} width={220} height={34} rx={8} fill={C.faint} />
    <Reveal at={2}>
      <rect x={300} y={68} width={220} height={34} rx={8} fill={C.accentSoft} />
      <T x={314} y={90} size={11} mono o={1}>lesson.mp4</T>
    </Reveal>
    <Chip x={300} y={122} at={2} active w={140}>Pre-signed link</Chip>
    <Beam d="M260 282 C272 282 272 85 284 85" at={2} />

    <Card x={284} y={190} w={252} h={166} />
    <Label x={300} y={218}>COURSE PROGRESS</Label>
    {["Intro", "Module 1", "Module 2"].map((l, i) => (
      <g key={l}>
        <T x={300} y={248 + i * 34} size={13} o={0.85}>{l}</T>
        <Fill x={300} y={256 + i * 34} w={220} h={5} pct={[1, 0.6, 0.25][i]} at={3} />
      </g>
    ))}
  </SceneFrame>
);
