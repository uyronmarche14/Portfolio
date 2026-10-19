"use client";

import { C, Loop, Surface, Text, VisualFrame } from "@/components/features/experience/ExperienceVisualKit";
import { rows } from "./rows";

/** Solace Hotel: room availability with a booking state. */
export const SolaceHotel = () => (
  <VisualFrame>
    <Surface x={36} y={56} w={360} h={330} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>ROOMS</Text>
    {rows(4).map((r) => (
      <g key={r}>
        <Text x={58} y={130 + r * 62} size={12} opacity={0.7} mono={false}>{`Room ${101 + r}`}</Text>
        {rows(7).map((c) => {
          const busy = (r + c) % 3 === 0;
          return <rect key={c} x={130 + c * 36} y={112 + r * 62} width={30} height={30} rx={7} fill={busy ? C.accentSoft : C.faint} />;
        })}
      </g>
    ))}
    <Loop a={{ scaleX: [0, 0, 1, 1, 0] }} d={9} times={[0, 0.2, 0.4, 0.85, 1]} origin="left center">
      <rect x={202} y={236} width={102} height={30} rx={8} fill={C.accent} />
    </Loop>
    <Surface x={416} y={96} w={108} h={130} r={14} e={2} />
    <Text x={430} y={122} size={11} opacity={0.5}>GUEST</Text>
    <circle cx={470} cy={158} r={16} fill={C.faint} />
    <rect x={434} y={186} width={72} height={8} rx={4} fill={C.bar} />
    <rect x={434} y={204} width={48} height={8} rx={4} fill={C.line} />
    <Surface x={416} y={246} w={108} h={96} r={14} e={1} />
    <Text x={430} y={272} size={11} opacity={0.5}>ADMIN</Text>
    <rect x={430} y={286} width={78} height={22} rx={11} fill={C.faint} stroke={C.line} />
    <rect x={430} y={314} width={56} height={14} rx={7} fill={C.accentSoft} />
  </VisualFrame>
);
