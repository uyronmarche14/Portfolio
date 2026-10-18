"use client";

import { C, Loop, Surface, Text, VisualFrame } from "./ExperienceVisualKit";

/**
 * One layered SVG scene per role. Each loops quietly while on screen (see
 * ExperienceVisualKit) and shows a finished frame when motion is reduced.
 * Content is conceptual and only uses ideas from the role descriptions.
 */

/** Freelance: one product delivered to web and mobile, with AI-assisted refactoring. */
export const FreelanceVisual = () => (
  <VisualFrame>
    {/* back layer: browser window */}
    <Surface x={36} y={56} w={340} h={250} e={1} />
    <path d="M36 92h340" stroke={C.line} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={56 + i * 14} cy={74} r={4} fill={C.faint} />
    ))}
    <rect x={140} y={66} width={150} height={16} rx={8} fill={C.faint} />
    <rect x={60} y={114} width={190} height={15} rx={7.5} fill={C.ink} opacity={0.85} />
    <rect x={60} y={138} width={130} height={8} rx={4} fill={C.bar} />
    <rect x={60} y={158} width={84} height={26} rx={13} fill={C.ink} opacity={0.9} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={60 + i * 104} y={208} width={94} height={74} rx={10} fill={C.faint} />
        <rect x={72 + i * 104} y={222} width={44} height={6} rx={3} fill={C.bar} />
        <rect x={72 + i * 104} y={236} width={66} height={5} rx={2.5} fill={C.line} />
      </g>
    ))}

    {/* middle layer: AI refactor chip */}
    <Loop a={{ opacity: [0, 1, 1, 0, 0], y: [8, 0, 0, 0, 0] }} d={8} times={[0, 0.12, 0.6, 0.72, 1]}>
      <Surface x={52} y={330} w={196} h={36} r={18} e={1} />
      <path d="m72 348 5 5 10-11" stroke={C.accent} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Text x={98} y={352} size={12} opacity={0.75}>refactored with AI</Text>
    </Loop>

    {/* front layer: phone */}
    <Loop a={{ y: [0, -6, 0] }} d={5} times={[0, 0.5, 1]}>
      <Surface x={318} y={104} w={160} h={300} r={28} e={2} />
      <rect x={366} y={116} width={64} height={8} rx={4} fill={C.faint} />
      <rect x={340} y={144} width={74} height={11} rx={5.5} fill={C.ink} opacity={0.8} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={352} cy={190 + i * 52} r={13} fill={C.faint} />
          <rect x={374} y={181 + i * 52} width={70} height={8} rx={4} fill={C.ink} opacity={0.55} />
          <rect x={374} y={196 + i * 52} width={48} height={6} rx={3} fill={C.bar} />
        </g>
      ))}
      <Loop a={{ scale: [1, 1, 0.93, 1, 1] }} d={8} times={[0, 0.42, 0.47, 0.55, 1]}>
        <rect x={340} y={350} width={116} height={36} rx={18} fill={C.accent} />
        <Text x={398} y={373} size={13} anchor="middle" fill={C.onAccent} mono={false} weight={500}>Book now</Text>
      </Loop>
    </Loop>

    {/* cursor tapping the phone button, with a ripple */}
    <Loop a={{ opacity: [0, 0.45, 0, 0], scale: [0.2, 0.2, 1.8, 1.8] }} d={8} times={[0, 0.44, 0.62, 1]}>
      <circle cx={398} cy={368} r={16} fill={C.accent} />
    </Loop>
    <Loop
      a={{ x: [0, 250, 250, 250, 0], y: [0, 156, 156, 156, 0], opacity: [0, 1, 1, 0, 0] }}
      d={8}
      times={[0, 0.4, 0.5, 0.65, 1]}
    >
      <path
        d="M120 212v18l5-5 4 9 4-2-4-9h7z"
        fill={C.ink}
        stroke={C.paper}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Loop>
  </VisualFrame>
);

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

export const experienceVisuals = {
  freelance: FreelanceVisual,
  aique: AiqueVisual,
  beyondgen: BeyondgenVisual,
  keepitsimpleos: KeepItSimpleVisual,
  buildfast: BuildFastVisual,
} as const;
