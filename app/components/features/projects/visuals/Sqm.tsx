"use client";

import { C } from "@/components/features/experience/ExperienceVisualKit";

import { Beam, Card, Chip, Dot, Highlight, Label, Reveal, SceneFrame, T, Tick } from "./kit";

/**
 * SQM: a supplier change request moves Draft, Submitted, Review, Approved while the role matrix shows who may act at each step.
 * The matrix is a sample rule set from the analysis, not live data.
 */
const STEPS = ["Draft", "Submitted", "Review", "Approved"];
const SX = (i: number) => 80 + i * 133.3;
const ROLES = ["Supplier", "Checker", "SQE", "Approver"];
const CAN: Record<string, number[]> = { View: [1, 1, 1, 1], Edit: [1, 1, 0, 0], Approve: [0, 0, 0, 1] };
// which role acts at each beat
const ACTOR = [0, 0, 1, 3];
const LOG = ["Supplier saved a draft", "Supplier submitted it", "Checker reviewed it", "Approver approved it"];

export const Sqm = () => (
  <SceneFrame beats={4} ms={1500} label="A supplier change request moves from draft to approved while the permission matrix shows who may act at each step">
    {/* approval track */}
    <Card x={24} y={24} w={512} h={124} />
    <Label x={44} y={52}>SUPPLIER CHANGE REQUEST</Label>
    <line x1={SX(0)} x2={SX(3)} y1={92} y2={92} stroke={C.line} strokeWidth={2} strokeLinecap="round" />
    {[0, 1, 2].map((i) => (
      <Beam key={i} d={`M${SX(i)} 92 H${SX(i + 1)}`} at={i + 1} />
    ))}
    {STEPS.map((s, i) => (
      <g key={s}>
        <Dot cx={SX(i)} cy={92} r={14} at={i} ring />
        <Tick x={SX(i)} y={92} at={i} />
        <T x={SX(i)} y={128} size={11} mono anchor="middle" o={0.65}>{s}</T>
      </g>
    ))}

    {/* permission matrix */}
    <Card x={24} y={164} w={308} h={192} />
    <Label x={44} y={192}>WHO CAN DO WHAT</Label>
    {Object.keys(CAN).map((a, c) => (
      <Label key={a} x={196 + c * 52} y={192} anchor="middle">{a.toUpperCase()}</Label>
    ))}
    {ROLES.map((r, i) => (
      <g key={r}>
        {ACTOR.map((actor, beat) => (actor === i ? <Highlight key={beat} x={36} y={208 + i * 36} w={284} h={32} from={beat} /> : null))}
        <T x={48} y={229 + i * 36} size={13} o={0.85}>{r}</T>
        {Object.keys(CAN).map((a, c) => {
          const on = CAN[a][i] === 1;
          return on ? <circle key={a} cx={196 + c * 52} cy={224 + i * 36} r={6} fill={C.accent} /> : <circle key={a} cx={196 + c * 52} cy={224 + i * 36} r={6} fill="none" stroke={C.line} strokeWidth={1.5} />;
        })}
      </g>
    ))}

    {/* activity */}
    <Card x={348} y={164} w={188} h={192} />
    <Label x={364} y={192}>ACTIVITY</Label>
    {LOG.map((l, i) => (
      <Reveal key={l} at={i}>
        <circle cx={368} cy={220 + i * 30} r={3.5} fill={C.accent} />
        <T x={380} y={224 + i * 30} size={11} mono o={0.8}>{l}</T>
      </Reveal>
    ))}
    <Chip x={364} y={330} at={3} active>Notice sent</Chip>
  </SceneFrame>
);
