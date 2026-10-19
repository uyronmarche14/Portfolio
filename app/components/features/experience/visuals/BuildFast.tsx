"use client";

import { C, Loop, Surface, Text, VisualFrame } from "../ExperienceVisualKit";

/** BuildFast: script lines turned into a video timeline. */
export const BuildFastVisual = () => (
  <VisualFrame>
    {/* back layer: timeline */}
    <Surface x={36} y={258} w={488} h={146} e={1} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <path key={i} d={`M${68 + i * 56} 274v8`} stroke={C.line} />
    ))}
    {[
      [60, 126, 0.9],
      [196, 84, 0.45],
      [292, 150, 0.9],
      [452, 56, 0.45],
    ].map(([x, w, o], i) => (
      <rect key={i} x={x} y={294} width={w} height={26} rx={7} fill={C.accent} opacity={o} />
    ))}
    {[
      [60, 168],
      [236, 122],
      [366, 142],
    ].map(([x, w], i) => (
      <rect key={i} x={x} y={330} width={w} height={26} rx={7} fill={C.faint} stroke={C.line} />
    ))}
    <rect x={60} y={370} width={440} height={8} rx={4} fill={C.faint} />
    <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.8, 0.94, 1]} origin="left center" ease="linear">
      <rect x={60} y={370} width={440} height={8} rx={4} fill={C.accent} opacity={0.55} />
    </Loop>
    <Loop a={{ x: [0, 430, 430, 0], opacity: [1, 1, 0, 0] }} d={9} times={[0, 0.8, 0.9, 1]} ease="linear">
      <path d="M62 266v128" stroke={C.ink} strokeWidth={1.5} />
      <path d="M56 262h12l-6 8z" fill={C.ink} />
    </Loop>

    {/* front layer: script card with a moving highlight */}
    <Surface x={36} y={56} w={236} h={176} e={2} />
    <Text x={56} y={84} size={11} opacity={0.5}>SCRIPT</Text>
    <Loop a={{ y: [0, 0, 26, 52, 78, 78, 0] }} d={9} times={[0, 0.12, 0.3, 0.48, 0.66, 0.9, 1]}>
      <rect x={52} y={96} width={204} height={22} rx={6} fill={C.accentSoft} />
      <rect x={52} y={96} width={3} height={22} rx={1.5} fill={C.accent} />
    </Loop>
    {[176, 150, 188, 128, 164].map((w, i) => (
      <rect key={i} x={64} y={103 + i * 26} width={w} height={8} rx={4} fill={C.bar} />
    ))}

    {/* middle layer: preview frame */}
    <Surface x={292} y={56} w={232} h={176} e={1} fill={C.faint} />
    <circle cx={408} cy={130} r={26} fill={C.paper} stroke={C.line} />
    <path d="M400 118l22 12-22 12z" fill={C.accent} />
    <rect x={312} y={198} width={192} height={6} rx={3} fill={C.line} />
    <Loop a={{ scaleX: [0, 1, 1, 0] }} d={9} times={[0, 0.8, 0.94, 1]} origin="left center" ease="linear">
      <rect x={312} y={198} width={192} height={6} rx={3} fill={C.accent} />
    </Loop>
  </VisualFrame>
);
