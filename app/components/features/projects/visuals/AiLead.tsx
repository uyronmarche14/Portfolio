"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Beam, Card, Chip, Fill, Label, Reveal, SceneFrame, T } from "./kit";

/** AiLead: a structured prompt becomes a script, the script becomes an avatar video, and the result is saved to history. */
export const AiLead = () => (
  <SceneFrame beats={4} ms={1500} label="A structured prompt becomes a script, the script becomes an avatar video, and the result is saved to history">
    <Card x={24} y={24} w={152} h={196} />
    <Label x={40} y={52}>PROMPT</Label>
    <Reveal at={0}>
      <rect x={40} y={68} width={120} height={7} rx={3.5} fill={C.bar} />
      <rect x={40} y={84} width={96} height={7} rx={3.5} fill={C.bar} />
      <rect x={40} y={100} width={108} height={7} rx={3.5} fill={C.line} />
    </Reveal>
    <Chip x={40} y={176} at={0} w={96}>Topic · tone</Chip>

    <Card x={204} y={24} w={152} h={196} />
    <Label x={220} y={52}>SCRIPT</Label>
    <Reveal at={1}>
      {[120, 100, 112, 84].map((w, i) => (
        <rect key={i} x={220} y={68 + i * 16} width={w} height={7} rx={3.5} fill={i === 3 ? C.line : C.bar} />
      ))}
    </Reveal>
    <Chip x={220} y={176} at={1} w={86}>Generated</Chip>

    <Card x={384} y={24} w={152} h={196} />
    <Label x={400} y={52}>VIDEO</Label>
    <rect x={400} y={68} width={120} height={72} rx={9} fill={C.faint} />
    <Reveal at={2}>
      <circle cx={460} cy={104} r={16} fill={C.accent} />
      <path d="M455 96 L469 104 L455 112 Z" fill={C.onAccent} />
    </Reveal>
    <Fill x={400} y={156} w={120} h={5} pct={0.7} at={2} />
    <Beam d="M176 122 H204" at={1} />
    <Beam d="M356 122 H384" at={2} />

    <Card x={24} y={236} w={512} h={120} />
    <Label x={44} y={264}>OPTIONS</Label>
    {[
      ["Avatar", "Presenter 2"],
      ["Voice", "Warm"],
      ["Language", "English"],
    ].map(([k, v], i) => (
      <g key={k}>
        <T x={44 + i * 168} y={292} size={11} mono o={0.55}>{k}</T>
        <T x={44 + i * 168} y={312} size={13} o={0.9}>{v}</T>
      </g>
    ))}
    <Chip x={400} y={320} at={3} active w={116}>Saved to history</Chip>
  </SceneFrame>
);
