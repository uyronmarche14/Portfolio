"use client";

import type { ComponentType, CSSProperties } from "react";

import dynamic from "next/dynamic";

import { SceneMode } from "./visuals/kit";

// each scene loads on its own, so a page (or a card) only downloads the scenes it shows
const scene = <K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) =>
  dynamic(() => load().then((m) => ({ default: m[name] })), { ssr: false, loading: () => <div aria-hidden="true" className="h-full w-full" /> });

export const projectVisuals: Record<string, ComponentType> = {
  "codex-express": scene(() => import("./visuals/CodexExpress"), "CodexExpress"),
  "reservation-desktop": scene(() => import("./visuals/ReservationDesktop"), "ReservationDesktop"),
  "jobint-ai-interview": scene(() => import("./visuals/Jobint"), "Jobint"),
  "best-brew-coffee": scene(() => import("./visuals/BestBrew"), "BestBrew"),
  "swiftpass-guard": scene(() => import("./visuals/SwiftPass"), "SwiftPass"),
  "solace-hotel": scene(() => import("./visuals/SolaceHotel"), "SolaceHotel"),
  "lms-learning-management": scene(() => import("./visuals/Lms"), "Lms"),
  "sqm-supplier-quality": scene(() => import("./visuals/Sqm"), "Sqm"),
  "cict-organization-website": scene(() => import("./visuals/Cict"), "Cict"),
  "archon-project-workspace": scene(() => import("./visuals/Archon"), "Archon"),
  "ai-command-center-fitness": scene(() => import("./visuals/CommandCenter"), "CommandCenter"),
  "ai-script-video-generator": scene(() => import("./visuals/AiLead"), "AiLead"),
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
export function ProjectVisual({ id, className, mode = "page" }: { id: string; className?: string; mode?: "page" | "card" }) {
  const Scene = projectVisuals[id];
  if (!Scene) return null;
  const tone = PROJECT_TONE[id];
  const style = tone ? ({ "--primary": `var(${tone})` } as CSSProperties) : undefined;
  return (
    <div className={className} style={style}>
      <SceneMode.Provider value={mode}>
        <Scene />
      </SceneMode.Provider>
    </div>
  );
}
