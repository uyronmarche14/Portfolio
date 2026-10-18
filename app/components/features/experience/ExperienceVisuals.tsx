"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One original SVG composition per role. Colors come from the theme tokens so
 * the artwork follows light and dark mode. Each is decorative (aria-hidden);
 * the role details live in the text next to it.
 */

const ink = "rgb(var(--foreground))";
const line = "rgb(var(--foreground) / 0.08)";
const bar = "rgb(var(--foreground) / 0.18)";
const faint = "rgb(var(--foreground) / 0.07)";
const paper = "rgb(var(--card))";
const accent = "rgb(var(--primary))";
const accentSoft = "rgb(var(--primary) / 0.14)";
const mono = "var(--font-mono), monospace";

const Reveal = ({ i, children }: { i: number; children: ReactNode }) => {
  const reduce = useReducedMotion();
  return (
    <motion.g
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.g>
  );
};

const Frame = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="32 36 496 408"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

/** Freelance: one product shipped across a browser and a phone. */
export const FreelanceVisual = () => (
  <Frame>
    <Reveal i={0}>
      <rect x="48" y="64" width="360" height="270" rx="14" fill={paper} stroke={line} />
      <path d="M48 98h360" stroke={line} />
      {[0, 1, 2].map((d) => (
        <circle key={d} cx={70 + d * 16} cy="81" r="4" fill={faint} stroke={line} />
      ))}
      <rect x="168" y="72" width="130" height="18" rx="9" fill={faint} />
    </Reveal>
    <Reveal i={1}>
      <rect x="72" y="122" width="170" height="14" rx="7" fill={ink} opacity="0.85" />
      <rect x="72" y="146" width="120" height="8" rx="4" fill={bar} />
      <rect x="72" y="166" width="84" height="26" rx="13" fill={accent} />
    </Reveal>
    <Reveal i={2}>
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={72 + c * 108} y="226" width="96" height="84" rx="10" fill={faint} stroke={line} />
          <rect x={84 + c * 108} y="240" width="40" height="6" rx="3" fill={ink} opacity="0.5" />
          <rect x={84 + c * 108} y="256" width="64" height="5" rx="2.5" fill={bar} />
          <rect x={84 + c * 108} y="288" width="30" height="10" rx="5" fill={c === 1 ? accent : accentSoft} />
        </g>
      ))}
    </Reveal>
    <Reveal i={3}>
      <rect x="352" y="132" width="132" height="280" rx="22" fill={paper} stroke={ink} strokeOpacity="0.35" strokeWidth="1.5" />
      <rect x="400" y="142" width="36" height="6" rx="3" fill={faint} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <circle cx="376" cy={182 + r * 52} r="11" fill={r === 0 ? accent : faint} />
          <rect x="396" y={174 + r * 52} width="64" height="7" rx="3.5" fill={ink} opacity="0.55" />
          <rect x="396" y={188 + r * 52} width="44" height="5" rx="2.5" fill={bar} />
        </g>
      ))}
    </Reveal>
    <Reveal i={4}>
      <rect x="64" y="368" width="196" height="38" rx="19" fill={paper} stroke={line} />
      <path d="M86 387l5 5 10-11" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="112" y="391" fontSize="12" fill={ink} opacity="0.7" fontFamily={mono}>
        refactored with AI
      </text>
    </Reveal>
  </Frame>
);

/** Aique: reusable interface components that adapt to several user roles. */
export const AiqueVisual = () => (
  <Frame>
    <Reveal i={0}>
      <rect x="56" y="56" width="448" height="368" rx="16" fill={paper} stroke={line} />
      {["Admin", "Staff", "Member"].map((role, r) => (
        <g key={role}>
          <rect x={80 + r * 92} y="82" width="80" height="28" rx="14" fill={r === 1 ? accent : "none"} stroke={r === 1 ? accent : line} />
          <text x={120 + r * 92} y="100" fontSize="12" textAnchor="middle" fill={r === 1 ? "rgb(var(--primary-foreground))" : ink} opacity={r === 1 ? 1 : 0.65} fontFamily={mono}>
            {role}
          </text>
        </g>
      ))}
    </Reveal>
    <Reveal i={1}>
      <rect x="80" y="138" width="200" height="120" rx="12" fill={faint} stroke={line} />
      <rect x="98" y="156" width="90" height="10" rx="5" fill={ink} opacity="0.7" />
      <rect x="98" y="176" width="150" height="6" rx="3" fill={bar} />
      <rect x="98" y="190" width="120" height="6" rx="3" fill={bar} />
      <rect x="98" y="214" width="72" height="26" rx="13" fill={accent} />
      <rect x="178" y="214" width="72" height="26" rx="13" fill="none" stroke={line} />
    </Reveal>
    <Reveal i={2}>
      <rect x="300" y="138" width="180" height="56" rx="12" fill={paper} stroke={line} />
      <rect x="316" y="156" width="80" height="6" rx="3" fill={bar} />
      <rect x="316" y="170" width="140" height="10" rx="5" fill={faint} />
      <rect x="300" y="206" width="180" height="52" rx="12" fill={paper} stroke={line} />
      <rect x="316" y="224" width="38" height="20" rx="10" fill={accent} />
      <circle cx="343" cy="234" r="7" fill="rgb(var(--primary-foreground))" />
      <rect x="368" y="228" width="84" height="6" rx="3" fill={bar} />
    </Reveal>
    <Reveal i={3}>
      <path d="M180 258v52M390 258v52" stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <rect x="80" y="310" width="400" height="86" rx="12" fill={accentSoft} stroke={accent} strokeOpacity="0.5" />
      <text x="100" y="338" fontSize="12" fill={accent} fontFamily={mono}>GET /api/users?role=staff</text>
      {[0, 1, 2].map((r) => (
        <rect key={r} x="100" y={350 + r * 14} width={300 - r * 60} height="6" rx="3" fill={accent} opacity={0.35 - r * 0.07} />
      ))}
    </Reveal>
  </Frame>
);

/** Beyondgen: multi-step approvals backed by an audit trail. */
export const BeyondgenVisual = () => {
  const reduce = useReducedMotion();
  return (
    <Frame>
      <Reveal i={0}>
        <rect x="56" y="64" width="448" height="156" rx="16" fill={paper} stroke={line} />
      </Reveal>
      <motion.path
        d="M150 142H280M280 142H410"
        stroke={accent}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
      {[
        { x: 120, label: "Submitted", done: true },
        { x: 280, label: "Reviewed", done: true },
        { x: 440, label: "Approved", done: false },
      ].map((n, i) => (
        <Reveal key={n.label} i={i + 1}>
          <circle cx={n.x - (i === 2 ? 30 : 0)} cy="142" r="22" fill={n.done ? accent : paper} stroke={n.done ? accent : line} strokeWidth="1.5" />
          {n.done ? (
            <path d={`M${n.x - 8 - (i === 2 ? 30 : 0)} 142l6 6 11-12`} stroke="rgb(var(--primary-foreground))" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <circle cx={n.x - 30} cy="142" r="4" fill={bar} />
          )}
          <text x={n.x - (i === 2 ? 30 : 0)} y="186" fontSize="12" textAnchor="middle" fill={ink} opacity="0.7" fontFamily={mono}>
            {n.label}
          </text>
        </Reveal>
      ))}
      <Reveal i={4}>
        <rect x="56" y="244" width="448" height="180" rx="16" fill={paper} stroke={line} />
        <text x="80" y="274" fontSize="12" fill={ink} opacity="0.55" fontFamily={mono}>AUDIT LOG</text>
        {[
          ["status → reviewed", "11:42"],
          ["approver assigned", "11:40"],
          ["supplier form submitted", "11:31"],
        ].map(([evt, t], r) => (
          <g key={evt}>
            <circle cx="88" cy={304 + r * 36} r="4" fill={r === 0 ? accent : line} />
            <text x="108" y={308 + r * 36} fontSize="13" fill={ink} opacity="0.8" fontFamily={mono}>{evt}</text>
            <text x="470" y={308 + r * 36} fontSize="12" textAnchor="end" fill={ink} opacity="0.4" fontFamily={mono}>{t}</text>
            {r < 2 && <path d={`M88 ${310 + r * 36}v26`} stroke={line} />}
          </g>
        ))}
      </Reveal>
    </Frame>
  );
};

/** KeepItSimpleOS: trainer-client messaging next to performance tracking. */
export const KeepItSimpleVisual = () => (
  <Frame>
    <Reveal i={0}>
      <rect x="48" y="56" width="260" height="368" rx="16" fill={paper} stroke={line} />
      <circle cx="82" cy="92" r="14" fill={accentSoft} stroke={accent} strokeOpacity="0.6" />
      <rect x="106" y="82" width="80" height="8" rx="4" fill={ink} opacity="0.65" />
      <rect x="106" y="96" width="48" height="6" rx="3" fill={bar} />
      <path d="M48 124h260" stroke={line} />
    </Reveal>
    {[
      { y: 144, w: 150, mine: false },
      { y: 190, w: 120, mine: true },
      { y: 236, w: 170, mine: false },
      { y: 282, w: 100, mine: true },
    ].map((m, i) => (
      <Reveal key={m.y} i={i + 1}>
        <rect x={m.mine ? 288 - m.w : 68} y={m.y} width={m.w} height="32" rx="16" fill={m.mine ? accent : faint} />
        <rect x={(m.mine ? 288 - m.w : 68) + 14} y={m.y + 13} width={m.w - 28} height="6" rx="3" fill={m.mine ? "rgb(var(--primary-foreground))" : ink} opacity={m.mine ? 0.85 : 0.35} />
      </Reveal>
    ))}
    <Reveal i={5}>
      <rect x="64" y="362" width="228" height="38" rx="19" fill="none" stroke={line} />
      <rect x="84" y="378" width="90" height="6" rx="3" fill={bar} />
    </Reveal>
    <Reveal i={6}>
      <rect x="328" y="56" width="188" height="170" rx="16" fill={paper} stroke={line} />
      <text x="346" y="84" fontSize="12" fill={ink} opacity="0.55" fontFamily={mono}>WEEKLY PROGRESS</text>
      <path d="M346 196l32-24 32 12 32-44 32 18 26-30" stroke={accent} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M346 196l32-24 32 12 32-44 32 18 26-30V210H346z" fill={accentSoft} />
    </Reveal>
    <Reveal i={7}>
      <rect x="328" y="242" width="188" height="182" rx="16" fill={paper} stroke={line} />
      {[0.82, 0.6, 0.9].map((v, r) => (
        <g key={r}>
          <rect x="346" y={272 + r * 44} width="60" height="6" rx="3" fill={ink} opacity="0.5" />
          <rect x="346" y={288 + r * 44} width="152" height="8" rx="4" fill={faint} />
          <rect x="346" y={288 + r * 44} width={152 * v} height="8" rx="4" fill={accent} opacity={0.5 + r * 0.15} />
        </g>
      ))}
    </Reveal>
  </Frame>
);

/** BuildFast: script lines turned into a video timeline. */
export const BuildFastVisual = () => {
  const reduce = useReducedMotion();
  return (
    <Frame>
      <Reveal i={0}>
        <rect x="48" y="56" width="236" height="200" rx="16" fill={paper} stroke={line} />
        <text x="68" y="84" fontSize="12" fill={ink} opacity="0.55" fontFamily={mono}>SCRIPT</text>
        {[190, 160, 200, 130, 176].map((w, r) => (
          <rect key={r} x="68" y={102 + r * 28} width={w} height="8" rx="4" fill={r === 1 ? accent : line} opacity={r === 1 ? 0.9 : 1} />
        ))}
      </Reveal>
      <Reveal i={1}>
        <rect x="304" y="56" width="212" height="200" rx="16" fill={faint} stroke={line} />
        <circle cx="410" cy="156" r="26" fill={paper} stroke={line} />
        <path d="M402 144l22 12-22 12z" fill={accent} />
      </Reveal>
      <Reveal i={2}>
        <path d="M284 156h20" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3" />
      </Reveal>
      <Reveal i={3}>
        <rect x="48" y="280" width="468" height="144" rx="16" fill={paper} stroke={line} />
        {[
          [68, 120, 0.9],
          [196, 90, 0.45],
          [292, 140, 0.9],
          [438, 58, 0.45],
        ].map(([x, w, o], c) => (
          <rect key={c} x={x} y="304" width={w} height="24" rx="6" fill={accent} opacity={o} />
        ))}
        {[
          [68, 170],
          [246, 120],
          [374, 122],
        ].map(([x, w], c) => (
          <rect key={c} x={x} y="338" width={w} height="24" rx="6" fill={faint} stroke={line} />
        ))}
        <rect x="68" y="372" width="380" height="8" rx="4" fill={faint} />
      </Reveal>
      <motion.path
        d="M300 292V412"
        stroke={ink}
        strokeWidth="1.5"
        initial={reduce ? false : { x: -120 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </Frame>
  );
};

export const experienceVisuals = {
  freelance: FreelanceVisual,
  aique: AiqueVisual,
  beyondgen: BeyondgenVisual,
  keepitsimpleos: KeepItSimpleVisual,
  buildfast: BuildFastVisual,
} as const;
