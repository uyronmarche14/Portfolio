"use client";

import { C, Loop, Surface, Text, VisualFrame } from "../ExperienceVisualKit";

/** KeepItSimpleOS: trainer-client messaging next to performance tracking. */
export const KeepItSimpleVisual = () => {
  const pop = { opacity: [0, 0, 1, 1, 0, 0], scale: [0.85, 0.85, 1, 1, 1, 0.85], y: [10, 10, 0, 0, 0, 0] };
  const times = (t: number) => [0, t, t + 0.06, 0.9, 0.96, 1];
  return (
    <VisualFrame>
      {/* back layer: progress cards */}
      <Surface x={280} y={56} w={244} h={170} e={1} />
      <Text x={300} y={84} size={11} opacity={0.5}>WEEKLY PROGRESS</Text>
      <path d="M300 196l34-28 34 12 36-44 34 20 36-30 28-10V206H300z" fill={C.accentSoft} />
      <Loop a={{ opacity: [1, 1, 1, 0], pathLength: [0, 1, 1, 1] }} d={9} times={[0, 0.5, 0.92, 1]}>
        <path d="M300 196l34-28 34 12 36-44 34 20 36-30 28-10" stroke={C.accent} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Loop>
      <Surface x={280} y={246} w={244} h={150} e={1} />
      {[0.82, 0.58, 0.92].map((v, i) => (
        <g key={i}>
          <rect x={300} y={270 + i * 40} width={64} height={7} rx={3.5} fill={C.ink} opacity={0.45} />
          <rect x={300} y={286 + i * 40} width={204} height={8} rx={4} fill={C.faint} />
          <Loop a={{ scaleX: [0, v, v, v] }} d={9} times={[0, 0.45 + i * 0.05, 0.92, 1]} origin="left center">
            <rect x={300} y={286 + i * 40} width={204} height={8} rx={4} fill={i === 2 ? C.accent : C.bar} />
          </Loop>
        </g>
      ))}

      {/* front layer: chat */}
      <Surface x={36} y={96} w={268} h={316} e={2} />
      <circle cx={68} cy={132} r={15} fill={C.accentSoft} stroke={C.accent} strokeOpacity={0.5} />
      <rect x={92} y={120} width={84} height={9} rx={4.5} fill={C.ink} opacity={0.65} />
      <rect x={92} y={136} width={52} height={6} rx={3} fill={C.bar} />
      <path d="M36 164h268" stroke={C.line} />
      <Loop a={pop} d={9} times={times(0.04)} ease="easeOut">
        <rect x={56} y={182} width={158} height={32} rx={16} fill={C.faint} />
        <rect x={72} y={195} width={110} height={6} rx={3} fill={C.bar} />
      </Loop>
      <Loop a={pop} d={9} times={times(0.2)} ease="easeOut">
        <rect x={152} y={228} width={132} height={32} rx={16} fill={C.accent} />
        <rect x={168} y={241} width={84} height={6} rx={3} fill={C.onAccent} opacity={0.85} />
      </Loop>
      <Loop a={pop} d={9} times={times(0.38)} ease="easeOut">
        <rect x={56} y={274} width={180} height={32} rx={16} fill={C.faint} />
        <rect x={72} y={287} width={128} height={6} rx={3} fill={C.bar} />
      </Loop>
      <Loop a={{ opacity: [0, 0, 1, 1, 0, 0] }} d={9} times={[0, 0.56, 0.6, 0.86, 0.9, 1]} ease="linear">
        <rect x={56} y={320} width={58} height={28} rx={14} fill={C.faint} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={73 + i * 12} cy={334} r={3} fill={C.bar} />
        ))}
      </Loop>
      <rect x={52} y={366} width={236} height={32} rx={16} fill="none" stroke={C.bar} />
      <rect x={70} y={379} width={90} height={6} rx={3} fill={C.line} />
    </VisualFrame>
  );
};
