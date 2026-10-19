"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** SQM: a multi-step approval track beside a role and permission matrix. */
export const Sqm = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={488} h={130} e={1} />
    <path d="M110 120H450" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
    <Loop a={{ scaleX: [0, 0, 1, 1, 0], opacity: [1, 1, 1, 1, 0] }} d={10} times={[0, 0.08, 0.7, 0.92, 1]} origin="left center">
      <rect x={110} y={118.5} width={340} height={3} rx={1.5} fill={C.accent} />
    </Loop>
    {["Draft", "Submitted", "Review", "Approved"].map((l, i) => (
      <g key={l}>
        <circle cx={110 + i * (340 / 3)} cy={120} r={18} fill={C.paper} stroke={C.bar} strokeWidth={1.5} />
        <Loop a={{ opacity: [0, 0, 1, 1, 0] }} d={10} times={[0, 0.08 + i * 0.2, 0.14 + i * 0.2, 0.92, 1]} ease="linear">
          <circle cx={110 + i * (340 / 3)} cy={120} r={18} fill={C.accent} />
        </Loop>
        <Text x={110 + i * (340 / 3)} y={160} size={11} anchor="middle" opacity={0.65}>{l}</Text>
      </g>
    ))}
    <Surface x={36} y={206} w={488} h={180} r={16} e={2} />
    <Text x={58} y={236} size={11} opacity={0.5}>PERMISSIONS</Text>
    {["Supplier", "Checker", "SQE", "Approver"].map((r, i) => (
      <Text key={r} x={58} y={268 + i * 30} size={12} opacity={0.75} mono={false}>{r}</Text>
    ))}
    {["View", "Edit", "Approve"].map((a, c) => (
      <g key={a}>
        <Text x={236 + c * 96} y={236} size={11} anchor="middle" opacity={0.5}>{a}</Text>
        {rows(4).map((r) => {
          const on = c === 0 || (c === 1 && r < 2) || (c === 2 && r === 3);
          return <circle key={r} cx={236 + c * 96} cy={264 + r * 30} r={7} fill={on ? C.accent : "none"} stroke={on ? C.accent : C.line} />;
        })}
      </g>
    ))}
  </VisualFrame>
);
