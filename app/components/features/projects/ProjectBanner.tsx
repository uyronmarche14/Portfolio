import * as React from "react";

/**
 * Large flat-editorial banner for a flagship project. Pure SVG, colored only from theme variables, so it follows dark mode and the
 * per-project accent (which overrides --primary on the project page). Decorative: the surrounding text carries the meaning.
 */

const ink = "rgb(var(--foreground))";
const paper = "rgb(var(--card))";
const accent = "rgb(var(--primary))";
const line = { stroke: ink, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Card({ x, y, w, h, fill = paper }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={12} fill={fill} {...line} />;
}

function Approval() {
  const steps = ["Draft", "Submitted", "Checker", "Approver"];
  return (
    <>
      {steps.map((label, i) => {
        const x = 40 + i * 180;
        return (
          <g key={label}>
            <Card x={x} y={70} w={140} h={90} fill={i === 3 ? accent : paper} />
            <text x={x + 70} y={122} textAnchor="middle" fontSize={20} fontWeight={700} fill={i === 3 ? "rgb(var(--primary-foreground))" : ink}>{label}</text>
            {i < 3 && <path d={`M${x + 144} 115h28m-8 -8l8 8l-8 8`} fill="none" {...line} />}
          </g>
        );
      })}
      <path d="M110 160v46h540v-46" fill="none" {...line} strokeDasharray="6 7" />
      <Card x={250} y={196} w={260} h={44} />
      <text x={380} y={225} textAnchor="middle" fontSize={17} fill={ink}>Returned for revision</text>
    </>
  );
}

function Attendance() {
  return (
    <>
      <Card x={40} y={50} w={230} h={190} />
      <rect x={40} y={50} width={230} height={44} rx={12} fill={accent} {...line} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={62 + (i % 3) * 66} y={118 + Math.floor(i / 3) * 58} width={52} height={42} rx={8} fill={i === 4 ? accent : "none"} {...line} />
      ))}
      <path d="M280 145h74m-10 -9l10 9l-10 9" fill="none" {...line} />
      <Card x={370} y={60} w={150} h={170} />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4].map((c) => ((r * 3 + c * 7) % 3 !== 0 ? <rect key={`${r}${c}`} x={392 + c * 22} y={84 + r * 26} width={16} height={18} rx={3} fill={ink} /> : null))
      )}
      <path d="M540 145h60m-10 -9l10 9l-10 9" fill="none" {...line} />
      <Card x={610} y={80} w={110} h={130} />
      <circle cx={665} cy={128} r={20} fill="none" {...line} />
      <path d="M653 128l9 9l16 -18" fill="none" {...line} stroke={accent} strokeWidth={4} />
      <text x={665} y={186} textAnchor="middle" fontSize={16} fill={ink}>Recorded</text>
    </>
  );
}

function Storage() {
  return (
    <>
      <Card x={40} y={60} w={200} h={170} />
      <rect x={60} y={82} width={160} height={78} rx={8} fill={accent} {...line} />
      <path d="M126 105l36 20l-36 20z" fill="rgb(var(--primary-foreground))" />
      <path d="M62 184h110M62 206h70" {...line} opacity={0.5} fill="none" />
      <path d="M252 145h70m-10 -9l10 9l-10 9" fill="none" {...line} />
      <Card x={334} y={90} w={160} h={110} />
      <path d="M356 140a22 22 0 0 1 8-40a30 30 0 0 1 56 6a20 20 0 0 1 4 40z" fill="none" {...line} transform="translate(8 12)" />
      <text x={414} y={188} textAnchor="middle" fontSize={16} fill={ink}>Object storage</text>
      <path d="M506 145h70m-10 -9l10 9l-10 9" fill="none" {...line} />
      <Card x={588} y={60} w={140} h={170} />
      <circle cx={658} cy={112} r={24} fill="none" {...line} />
      <path d="M624 200a34 34 0 0 1 68 0" fill="none" {...line} />
      <text x={658} y={222} textAnchor="middle" fontSize={15} fill={ink}>Scoped link</text>
    </>
  );
}

const SCENES: Record<string, React.ReactNode> = {
  "sqm-supplier-quality": <Approval />,
  "cict-organization-website": <Attendance />,
  "lms-learning-management": <Storage />,
};

export function hasProjectBanner(id: string): boolean {
  return id in SCENES;
}

export function ProjectBanner({ id, className }: { id: string; className?: string }) {
  const scene = SCENES[id];
  if (!scene) return null;
  return (
    <svg viewBox="0 0 760 290" aria-hidden="true" className={className} fontFamily="var(--font-mono), ui-monospace, monospace">
      <rect width={760} height={290} rx={20} fill="rgb(var(--primary) / 0.10)" />
      {scene}
    </svg>
  );
}
