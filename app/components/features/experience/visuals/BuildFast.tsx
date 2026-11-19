"use client";

import { C, Grow, Loop, Panel, Text, VisualFrame } from "../ExperienceVisualKit";

/** BuildFast: a script on the left becomes a video on the right, with the timeline below. */
export const BuildFastVisual = () => (
  <VisualFrame>
    <Panel title="SCRIPT TO VIDEO" tag="sample" h={300}>
      {/* script */}
      <rect x={22} y={64} width={194} height={140} rx={12} fill={C.faint} />
      <Text x={38} y={86} size={11} opacity={0.55}>SCRIPT</Text>
      <Loop a={{ y: [0, 0, 24, 48, 72, 72, 0] }} d={9} times={[0, 0.12, 0.3, 0.48, 0.66, 0.9, 1]}>
        <rect x={32} y={96} width={174} height={20} rx={6} fill={C.accentSoft} />
        <rect x={32} y={96} width={3} height={20} rx={1.5} fill={C.accent} />
      </Loop>
      {[150, 124, 156, 108, 138].map((w, i) => (
        <rect key={i} x={44} y={102 + i * 24} width={w} height={8} rx={4} fill={C.bar} />
      ))}

      {/* arrow */}
      <path d="M228 134h24m-7-6 7 6-7 6" stroke={C.bar} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* preview */}
      <rect x={264} y={64} width={202} height={140} rx={12} fill={C.faint} />
      <circle cx={365} cy={126} r={24} fill={C.paper} stroke={C.bar} />
      <path d="M357 114l20 12-20 12z" fill={C.accent} />
      <rect x={282} y={184} width={166} height={6} rx={3} fill={C.line} />
      <Grow axis="x" x={282} y={184} w={166} h={6} rx={3} fill={C.accent} to={[0, 1, 1, 0]} times={[0, 0.8, 0.94, 1]} />

      {/* timeline */}
      <Text x={22} y={232} size={11} opacity={0.55}>TIMELINE</Text>
      {[
        [22, 120, 0.9],
        [154, 70, 0.45],
        [236, 130, 0.9],
        [378, 88, 0.45],
      ].map(([x, w, o], i) => (
        <rect key={i} x={x} y={244} width={w} height={20} rx={6} fill={C.accent} opacity={o} />
      ))}
      <rect x={22} y={270} width={444} height={6} rx={3} fill={C.faint} />
      <Loop a={{ x: [0, 440, 440, 0], opacity: [1, 1, 0, 0] }} d={9} times={[0, 0.8, 0.9, 1]} ease="linear">
        <path d="M24 238v42" stroke={C.ink} strokeWidth={1.5} />
        <path d="M18 234h12l-6 7z" fill={C.ink} />
      </Loop>
    </Panel>
  </VisualFrame>
);
