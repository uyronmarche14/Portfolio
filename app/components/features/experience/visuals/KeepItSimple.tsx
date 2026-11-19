"use client";

import { C, DrawPath, Grow, Loop, Panel, Text, VisualFrame } from "../ExperienceVisualKit";

const pop = { opacity: [0, 0, 1, 1, 0, 0], y: [8, 8, 0, 0, 0, 0] };
const times = (t: number) => [0, t, t + 0.06, 0.9, 0.96, 1];

/** KeepItSimpleOS: trainer-client messaging beside progress tracking. */
export const KeepItSimpleVisual = () => (
  <VisualFrame>
    <Panel title="CLIENT WORKFLOW" tag="sample" h={300}>
      <path d="M244 64V276" stroke={C.line} />

      {/* conversation */}
      <circle cx={38} cy={82} r={13} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.5} />
      <rect x={60} y={74} width={70} height={8} rx={4} fill={C.ink} opacity={0.65} />
      <rect x={60} y={89} width={44} height={6} rx={3} fill={C.bar} />
      <Loop a={pop} d={9} times={times(0.04)} ease="easeOut">
        <rect x={22} y={116} width={150} height={30} rx={15} fill={C.faint} />
        <rect x={38} y={128} width={100} height={6} rx={3} fill={C.bar} />
      </Loop>
      <Loop a={pop} d={9} times={times(0.2)} ease="easeOut">
        <rect x={92} y={156} width={134} height={30} rx={15} fill={C.accent} />
        <rect x={108} y={168} width={84} height={6} rx={3} fill={C.onAccent} opacity={0.85} />
      </Loop>
      <Loop a={pop} d={9} times={times(0.38)} ease="easeOut">
        <rect x={22} y={196} width={170} height={30} rx={15} fill={C.faint} />
        <rect x={38} y={208} width={118} height={6} rx={3} fill={C.bar} />
      </Loop>
      <Loop a={{ opacity: [0, 0, 1, 1, 0, 0] }} d={9} times={[0, 0.56, 0.6, 0.86, 0.9, 1]} ease="linear">
        <rect x={22} y={236} width={54} height={26} rx={13} fill={C.faint} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={38 + i * 11} cy={249} r={3} fill={C.bar} />
        ))}
      </Loop>

      {/* progress */}
      <Text x={266} y={80} size={11} opacity={0.55}>WEEKLY PROGRESS</Text>
      <path d="M266 150l28-22 28 8 30-34 28 16 30-24 24-8V164H266z" fill={C.accentSoft} />
      <DrawPath d="M266 150l28-22 28 8 30-34 28 16 30-24 24-8" stroke={C.accent} />
      {[0.82, 0.58, 0.92].map((v, i) => (
        <g key={i}>
          <rect x={266} y={186 + i * 30} width={56} height={7} rx={3.5} fill={C.ink} opacity={0.45} />
          <rect x={266} y={199 + i * 30} width={200} height={7} rx={3.5} fill={C.faint} />
          <Grow axis="x" x={266} y={199 + i * 30} w={200 * v} h={7} rx={3.5} fill={i === 2 ? C.accent : C.bar} to={[0, 1, 1, 1]} times={[0, 0.45 + i * 0.05, 0.92, 1]} />
        </g>
      ))}
    </Panel>
  </VisualFrame>
);
