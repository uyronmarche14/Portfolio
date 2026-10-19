"use client";

import { C, Loop, Surface, Text, VisualFrame } from "../ExperienceVisualKit";

const ROLES = ["Admin", "Staff", "Member"] as const;
const PILL_W = 76;
const PILL_X = [274, 358, 442];
const PERMS: Array<{ label: string; on: [number, number, number] }> = [
  { label: "View", on: [1, 1, 1] },
  { label: "Edit", on: [1, 1, 0] },
  { label: "Manage", on: [1, 0, 0] },
];
/** Which role is active at each keyframe of the 9 s loop (ends back on Admin). */
const ROLE_AT = [0, 0, 1, 1, 2, 2, 0];
const ROLE_TIMES = [0, 0.28, 0.34, 0.6, 0.66, 0.92, 1];
const onlyRole = (i: number) => ROLE_AT.map((r) => (r === i ? 1 : 0));

/** Aique: reusable interface components that adapt to several user roles. */
export const AiqueVisual = () => (
  <VisualFrame>
    {/* back layer: component sheet */}
    <Surface x={36} y={56} w={290} h={262} e={1} />
    <Text x={58} y={86} size={11} opacity={0.5}>COMPONENTS</Text>
    <rect x={58} y={104} width={74} height={28} rx={14} fill={C.ink} opacity={0.9} />
    <rect x={144} y={104} width={128} height={28} rx={8} fill="none" stroke={C.bar} />
    <rect x={156} y={114} width={56} height={7} rx={3.5} fill={C.line} />
    <rect x={58} y={150} width={44} height={24} rx={12} fill={C.faint} />
    <circle cx={70} cy={162} r={9} fill={C.paper} stroke={C.line} />
    <rect x={118} y={152} width={20} height={20} rx={5} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.5} />
    <path d="m123 162 4 4 7-8" stroke={C.accent} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x={58} y={196} width={120} height={96} rx={12} fill={C.faint} />
    <rect x={72} y={212} width={60} height={9} rx={4.5} fill={C.ink} opacity={0.6} />
    <rect x={72} y={230} width={88} height={6} rx={3} fill={C.bar} />
    <rect x={72} y={244} width={70} height={6} rx={3} fill={C.bar} />
    <rect x={190} y={196} width={120} height={96} rx={12} fill={C.faint} />
    <rect x={204} y={212} width={46} height={9} rx={4.5} fill={C.ink} opacity={0.6} />
    <rect x={204} y={230} width={88} height={6} rx={3} fill={C.bar} />

    {/* front layer: role switcher card */}
    <Surface x={250} y={138} w={282} h={196} e={2} />
    {ROLES.map((role, i) => (
      <Text key={role} x={PILL_X[i] + PILL_W / 2} y={177} size={12} anchor="middle" opacity={0.6}>{role}</Text>
    ))}
    {ROLES.map((role, i) => (
      <Loop key={role} a={{ opacity: onlyRole(i) }} d={9} times={ROLE_TIMES} ease="linear">
        <rect x={PILL_X[i]} y={158} width={PILL_W} height={28} rx={14} fill={C.accent} />
      </Loop>
    ))}
    {ROLES.map((role, i) => (
      <Loop key={role} a={{ opacity: onlyRole(i) }} d={9} times={ROLE_TIMES} ease="linear">
        <Text x={PILL_X[i] + PILL_W / 2} y={177} size={12} anchor="middle" fill={C.onAccent} weight={500}>{role}</Text>
      </Loop>
    ))}
    {PERMS.map((perm, p) => {
      const y = 212 + p * 38;
      return (
        <g key={perm.label}>
          <Text x={274} y={y + 15} size={13} mono={false} opacity={0.75}>{perm.label}</Text>
          <rect x={470} y={y} width={40} height={22} rx={11} fill={C.faint} />
          <Loop
            a={{ opacity: ROLE_AT.map((r) => perm.on[r]) }}
            d={9}
            times={ROLE_TIMES}
            ease="linear"
          >
            <rect x={470} y={y} width={40} height={22} rx={11} fill={C.accent} />
          </Loop>
          <Loop
            a={{ x: ROLE_AT.map((r) => perm.on[r] * 18) }}
            d={9}
            times={ROLE_TIMES}
            ease="easeInOut"
          >
            <circle cx={481} cy={y + 11} r={8} fill={C.paper} />
          </Loop>
        </g>
      );
    })}

    {/* request chip */}
    <Surface x={250} y={352} w={282} h={42} r={10} e={1} />
    <Text x={268} y={378} size={12} opacity={0.6}>GET /api/users?role=</Text>
    {ROLES.map((role, i) => (
      <Loop key={role} a={{ opacity: onlyRole(i) }} d={9} times={ROLE_TIMES} ease="linear">
        <Text x={414} y={378} size={12} fill={C.accent} weight={600}>{role.toLowerCase()}</Text>
      </Loop>
    ))}
  </VisualFrame>
);
