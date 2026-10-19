"use client";

import type { ComponentType, CSSProperties } from "react";

import { CodexExpress } from "./visuals/CodexExpress";
import { ReservationDesktop } from "./visuals/ReservationDesktop";
import { Jobint } from "./visuals/Jobint";
import { BestBrew } from "./visuals/BestBrew";
import { SwiftPass } from "./visuals/SwiftPass";
import { SolaceHotel } from "./visuals/SolaceHotel";
import { Lms } from "./visuals/Lms";
import { Sqm } from "./visuals/Sqm";
import { Cict } from "./visuals/Cict";
import { Archon } from "./visuals/Archon";
import { CommandCenter } from "./visuals/CommandCenter";
import { AiLead } from "./visuals/AiLead";

export const projectVisuals: Record<string, ComponentType> = {
  "codex-express": CodexExpress,
  "reservation-desktop": ReservationDesktop,
  "jobint-ai-interview": Jobint,
  "best-brew-coffee": BestBrew,
  "swiftpass-guard": SwiftPass,
  "solace-hotel": SolaceHotel,
  "lms-learning-management": Lms,
  "sqm-supplier-quality": Sqm,
  "cict-organization-website": Cict,
  "archon-project-workspace": Archon,
  "ai-command-center-fitness": CommandCenter,
  "ai-script-video-generator": AiLead,
};

const PROJECT_TONE: Record<string, string> = {
  "reservation-desktop": "--tone-teal",
  "jobint-ai-interview": "--tone-violet",
  "best-brew-coffee": "--tone-amber",
  "swiftpass-guard": "--tone-teal",
  "solace-hotel": "--tone-rose",
  "lms-learning-management": "--tone-violet",
  "sqm-supplier-quality": "--tone-teal",
  "cict-organization-website": "--tone-amber",
  "archon-project-workspace": "--tone-violet",
  "ai-command-center-fitness": "--tone-rose",
  "ai-script-video-generator": "--tone-violet",
};

export const hasProjectVisual = (id: string): boolean => id in projectVisuals;

/** Renders a project's scene, tinted with its own accent, or nothing when it has none. */
export function ProjectVisual({ id, className }: { id: string; className?: string }) {
  const Scene = projectVisuals[id];
  if (!Scene) return null;
  const tone = PROJECT_TONE[id];
  const style = tone ? ({ "--primary": `var(${tone})` } as CSSProperties) : undefined;
  return (
    <div className={className} style={style}>
      <Scene />
    </div>
  );
}
