"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Beam, Card, Chip, Label, Reveal, SceneFrame, T, Tick, Between } from "./kit";

/** CICT platform: an admin publishes an event on the web, the shared API carries it, and the student app shows it and records attendance. */
const API = ["Content", "Events", "Roles", "Attendance"];

export const Cict = () => (
  <SceneFrame beats={4} ms={1500} label="An event published in the admin web app travels through one shared API to the student mobile app, where attendance is recorded">
    <Card x={24} y={24} w={228} h={164} />
    <Label x={40} y={52}>ADMIN WEB</Label>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={40} y={68 + i * 36} width={196} height={28} rx={8} fill={C.faint} />
        <rect x={52} y={78 + i * 36} width={90} height={7} rx={3.5} fill={C.bar} />
      </g>
    ))}
    <Reveal at={0}>
      <rect x={40} y={140} width={196} height={30} rx={8} fill={C.accentSoft} stroke={C.accent} />
      <T x={52} y={160} size={11} mono o={1}>New event · published</T>
    </Reveal>

    <Card x={308} y={24} w={228} h={164} />
    <Label x={324} y={52}>STUDENT APP</Label>
    <Between from={0} to={2}>
      <rect x={324} y={68} width={196} height={28} rx={8} fill={C.faint} />
      <T x={338} y={86} size={11} mono o={0.5}>No new events yet</T>
    </Between>
    <Reveal at={3}>
      <rect x={324} y={68} width={196} height={28} rx={8} fill={C.accentSoft} stroke={C.accent} />
      <T x={338} y={86} size={11} mono o={1}>New event · register</T>
      <circle cx={340} cy={136} r={11} fill={C.accent} />
      <Tick x={340} y={137} at={3} size={9} />
      <T x={360} y={141} size={13} o={0.9}>Attendance recorded</T>
    </Reveal>

    <Beam d="M138 188 V224" at={1} />
    <Beam d="M422 224 V188" at={2} />

    <Card x={24} y={224} w={512} h={132} />
    <Label x={44} y={252}>SHARED API</Label>
    {API.map((a, i) => (
      <Chip key={a} x={44 + i * 118} y={274} w={104} at={0} active={i === 1}>{a}</Chip>
    ))}
    <T x={44} y={334} size={11} mono o={0.5}>One backend, role-aware access for web and mobile</T>
  </SceneFrame>
);
