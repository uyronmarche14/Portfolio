"use client";

import { C, Loop, Surface, Text, VisualFrame } from "../ExperienceVisualKit";

/** Beyondgen: multi-step approval workflow with an audit trail. */
export const BeyondgenVisual = () => {
  const nodes = [
    { x: 120, label: "Submitted", t: 0.05 },
    { x: 280, label: "Reviewed", t: 0.38 },
    { x: 440, label: "Approved", t: 0.7 },
  ];
  const rows = [
    { text: "supplier form submitted", time: "11:31", t: 0.05 },
    { text: "approver assigned", time: "11:40", t: 0.38 },
    { text: "status → approved", time: "11:42", t: 0.7 },
  ];
  const timesFor = (t: number) => [0, t, t + 0.08, 0.9, 0.96, 1];

  return (
    <VisualFrame>
      {/* back layer: workflow track */}
      <Surface x={36} y={56} w={488} h={150} e={1} />
      <path d="M120 120H440" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
      <Loop
        a={{ scaleX: [0, 0, 0.5, 0.5, 1, 1, 1, 0], opacity: [1, 1, 1, 1, 1, 1, 0, 0] }}
        d={10}
        times={[0, 0.05, 0.38, 0.4, 0.7, 0.92, 0.96, 1]}
        origin="left center"
      >
        <rect x={120} y={118.5} width={320} height={3} rx={1.5} fill={C.accent} />
      </Loop>
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={120} r={22} fill={C.paper} stroke={C.bar} strokeWidth={1.5} />
          <Loop
            a={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.6, 0.6, 1, 1, 1, 0.6] }}
            d={10}
            times={timesFor(n.t)}
            ease="easeOut"
          >
            <circle cx={n.x} cy={120} r={22} fill={C.accent} />
            <path d={`m${n.x - 8} 120 6 6 11-12`} stroke={C.onAccent} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </Loop>
          <Text x={n.x} y={170} size={12} anchor="middle" opacity={0.7}>{n.label}</Text>
        </g>
      ))}

      {/* front layer: audit log */}
      <Surface x={150} y={190} w={374} h={196} e={2} />
      <Text x={174} y={222} size={11} opacity={0.5}>AUDIT LOG</Text>
      <path d="M174 234h326" stroke={C.line} />
      {rows.map((row, i) => {
        const y = 266 + i * 40;
        return (
          <Loop
            key={row.text}
            a={{ opacity: [0, 0, 1, 1, 0, 0], y: [8, 8, 0, 0, 0, 0] }}
            d={10}
            times={timesFor(row.t)}
            ease="easeOut"
          >
            <circle cx={182} cy={y - 4} r={4} fill={i === 2 ? C.accent : C.bar} />
            <Text x={200} y={y} size={13} opacity={0.85}>{row.text}</Text>
            <Text x={500} y={y} size={12} anchor="end" opacity={0.4}>{row.time}</Text>
          </Loop>
        );
      })}
    </VisualFrame>
  );
};
