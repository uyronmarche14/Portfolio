import * as React from "react";

export type MascotPose = "wave" | "think" | "present";

export interface MascotProps extends React.SVGProps<SVGSVGElement> {
  pose?: MascotPose;
  /** Accessible label; omit for purely decorative use. */
  title?: string;
}

const ink = "rgb(var(--foreground))";
const paper = "rgb(var(--card))";
const accent = "rgb(var(--primary))";
const tone1 = "rgb(var(--tone-teal))";
const tone2 = "rgb(var(--tone-violet))";
const tone3 = "rgb(var(--tone-amber))";

const stroke = { stroke: ink, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Analyst bot: a clipboard-bodied robot. Colors come from theme CSS variables. */
export function Mascot({ pose = "wave", title, ...props }: MascotProps) {
  return (
    <svg
      viewBox="0 0 240 280"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      {/* ground shadow */}
      <ellipse cx="120" cy="268" rx="62" ry="8" fill={ink} opacity="0.12" />

      {/* legs */}
      <path d="M96 232v26M144 232v26" {...stroke} fill="none" />
      <path d="M86 260h22M134 260h22" {...stroke} fill="none" />

      {/* clipboard body */}
      <rect x="62" y="118" width="116" height="116" rx="14" fill={paper} {...stroke} />
      <rect x="98" y="108" width="44" height="18" rx="6" fill={accent} {...stroke} />
      {/* checklist */}
      <path d="M82 152l6 6 10-12" fill="none" {...stroke} stroke={tone1} />
      <path d="M108 152h48" {...stroke} fill="none" opacity="0.5" />
      <path d="M82 180l6 6 10-12" fill="none" {...stroke} stroke={tone1} />
      <path d="M108 180h36" {...stroke} fill="none" opacity="0.5" />
      <circle cx="90" cy="212" r="6" fill="none" {...stroke} />
      <path d="M108 212h42" {...stroke} fill="none" opacity="0.5" />

      {/* head */}
      <path d="M120 40V22" {...stroke} fill="none" />
      <circle cx="120" cy="16" r="7" fill={accent} {...stroke} />
      <rect x="72" y="40" width="96" height="66" rx="22" fill={paper} {...stroke} />
      <rect x="84" y="54" width="72" height="38" rx="14" fill="#0f0f0f" />
      {/* eyes */}
      {pose === "think" ? (
        <>
          <path d="M98 72h14" stroke={tone3} strokeWidth="5" strokeLinecap="round" />
          <circle cx="138" cy="72" r="6" fill={tone3} />
        </>
      ) : (
        <>
          <circle cx="104" cy="72" r="6" fill={tone1} />
          <circle cx="136" cy="72" r="6" fill={tone1} />
        </>
      )}
      <path d="M110 84q10 6 20 0" fill="none" stroke={tone1} strokeWidth="3" strokeLinecap="round" />
      {/* cheeks */}
      <circle cx="82" cy="98" r="4" fill={accent} opacity="0.5" />
      <circle cx="158" cy="98" r="4" fill={accent} opacity="0.5" />

      {/* arms + props per pose */}
      {pose === "wave" && (
        <>
          <path d="M62 160q-22 6-26 28" {...stroke} fill="none" />
          <path d="M178 150q26-6 34-40" {...stroke} fill="none" />
          <circle cx="214" cy="104" r="9" fill={paper} {...stroke} />
          <path d="M226 90l8-8M228 104h10M224 118l8 6" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {pose === "think" && (
        <>
          <path d="M62 160q-22 6-26 28" {...stroke} fill="none" />
          <path d="M178 156q14-4 6-30q-6-14-30-22" {...stroke} fill="none" />
          <circle cx="152" cy="104" r="7" fill={paper} {...stroke} />
          <circle cx="206" cy="46" r="5" fill={paper} {...stroke} />
          <circle cx="196" cy="70" r="3" fill={paper} {...stroke} />
          <rect x="170" y="8" width="62" height="34" rx="17" fill={paper} {...stroke} />
          <text x="201" y="31" textAnchor="middle" fontSize="20" fontWeight="700" fill={accent}>?</text>
        </>
      )}
      {pose === "present" && (
        <>
          <path d="M62 160q-22 6-26 28" {...stroke} fill="none" />
          <path d="M178 150q20 0 26-34" {...stroke} fill="none" />
          <rect x="190" y="38" width="44" height="64" rx="8" fill={paper} {...stroke} />
          <rect x="198" y="74" width="7" height="18" fill={tone2} />
          <rect x="209" y="62" width="7" height="30" fill={accent} />
          <rect x="220" y="50" width="7" height="42" fill={tone1} />
        </>
      )}
    </svg>
  );
}

export default Mascot;
