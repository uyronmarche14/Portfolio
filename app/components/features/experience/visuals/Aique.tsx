"use client";

import { C, Loop, Panel, Text, VisualFrame } from "../ExperienceVisualKit";

const ROLES = ["Admin", "Staff", "Member"] as const;
const PILL_W = 136;
const PILL_X = [22, 176, 330];
const PERMS: Array<{ label: string; on: [number, number, number] }> = [
  { label: "View", on: [1, 1, 1] },
  { label: "Edit", on: [1, 1, 0] },
  { label: "Manage", on: [1, 0, 0] },
];
/** Which role is active at each keyframe of the 9 s loop (ends back on Admin). */
const ROLE_AT = [0, 0, 1, 1, 2, 2, 0];
const ROLE_TIMES = [0, 0.28, 0.34, 0.6, 0.66, 0.92, 1];
const onlyRole = (i: number) => ROLE_AT.map((r) => (r === i ? 1 : 0));

/** Aique: one interface that adapts to the signed-in role. */
export const AiqueVisual = () => (
  <VisualFrame>
    <Panel title="ROLE-AWARE INTERFACE" tag="sample" h={292}>
      {/* role switcher */}
      {ROLES.map((role, i) => (
        <g key={role}>
          <rect x={PILL_X[i]} y={64} width={PILL_W} height={30} rx={15} fill={C.faint} />
          <Text x={PILL_X[i] + PILL_W / 2} y={84} size={12} anchor="middle" opacity={0.6}>{role}</Text>
          <Loop a={{ opacity: onlyRole(i) }} d={9} times={ROLE_TIMES} ease="linear">
            <rect x={PILL_X[i]} y={64} width={PILL_W} height={30} rx={15} fill={C.accent} />
            <Text x={PILL_X[i] + PILL_W / 2} y={84} size={12} anchor="middle" fill={C.onAccent} weight={500}>{role}</Text>
          </Loop>
        </g>
      ))}

      {/* permissions */}
      {PERMS.map((perm, p) => {
        const y = 116 + p * 38;
        return (
          <g key={perm.label}>
            <path d={`M22 ${y - 4}H466`} stroke={C.line} />
            <Text x={22} y={y + 21} size={13} mono={false} opacity={0.8}>{perm.label}</Text>
            <rect x={426} y={y + 6} width={40} height={22} rx={11} fill={C.faint} />
            <Loop a={{ opacity: ROLE_AT.map((r) => perm.on[r]) }} d={9} times={ROLE_TIMES} ease="linear">
              <rect x={426} y={y + 6} width={40} height={22} rx={11} fill={C.accent} />
            </Loop>
            <Loop a={{ x: ROLE_AT.map((r) => perm.on[r] * 18) }} d={9} times={ROLE_TIMES} ease="easeInOut">
              <circle cx={437} cy={y + 17} r={8} fill={C.paper} />
            </Loop>
          </g>
        );
      })}

      {/* the request the screen would make */}
      <rect x={22} y={238} width={444} height={32} rx={10} fill={C.faint} />
      <Text x={38} y={259} size={12} opacity={0.6}>GET /api/users?role=</Text>
      {ROLES.map((role, i) => (
        <Loop key={role} a={{ opacity: onlyRole(i) }} d={9} times={ROLE_TIMES} ease="linear">
          <Text x={186} y={259} size={12} fill={C.accent} weight={600}>{role.toLowerCase()}</Text>
        </Loop>
      ))}
    </Panel>
  </VisualFrame>
);
