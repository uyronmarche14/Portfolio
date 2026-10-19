"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** Archon: a Kanban board where a task card moves between columns. */
export const Archon = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={488} h={330} e={1} />
    {["To do", "In progress", "Done"].map((l, c) => (
      <g key={l}>
        <Text x={58 + c * 156} y={88} size={11} opacity={0.55}>{l.toUpperCase()}</Text>
        <rect x={52 + c * 156} y={100} width={140} height={272} rx={12} fill={C.faint} />
        {rows(c === 0 ? 3 : 2).map((i) => (
          <g key={i}>
            <rect x={62 + c * 156} y={112 + i * 66} width={120} height={54} rx={9} fill={C.paper} stroke={C.line} />
            <rect x={72 + c * 156} y={124 + i * 66} width={76} height={7} rx={3.5} fill={C.ink} opacity={0.55} />
            <rect x={72 + c * 156} y={140 + i * 66} width={50} height={6} rx={3} fill={C.bar} />
          </g>
        ))}
      </g>
    ))}
    <Loop a={{ x: [0, 0, 156, 156, 312, 312, 0], y: [0, 0, 0, 0, 0, 0, 0] }} d={10} times={[0, 0.12, 0.32, 0.5, 0.7, 0.9, 1]}>
      <rect x={62} y={244} width={120} height={54} rx={9} fill={C.paper} stroke={C.accent} strokeWidth={2} />
      <rect x={72} y={256} width={76} height={7} rx={3.5} fill={C.accent} />
      <rect x={72} y={272} width={50} height={6} rx={3} fill={C.bar} />
    </Loop>
    <Surface x={384} y={32} w={140} h={44} r={12} e={2} />
    <circle cx={406} cy={54} r={9} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.6} />
    <rect x={424} y={48} width={84} height={7} rx={3.5} fill={C.bar} />
  </VisualFrame>
);
