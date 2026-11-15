"use client";

import { Branches, Exploded, Hub, Laptop, Relay, Router, Stack, Terrain } from "@lucasmarkes/hairline/react";
import type { CSSProperties } from "react";

const FIGURES = {
  exploded: Exploded,
  stack: Stack,
  laptop: Laptop,
  terrain: Terrain,
  branches: Branches,
  hub: Hub,
  relay: Relay,
  router: Router,
} as const;

export type HairlineFigureName = keyof typeof FIGURES;

/** Maps Hairline's plate/stroke variables onto the site's theme tokens so it follows the active theme. */
const themeVars = {
  "--hairline-plate": "rgb(var(--background))",
  "--hairline-hi": "rgb(var(--primary))",
  "--hairline-edge": "rgb(var(--foreground))",
  "--hairline-mid": "rgb(var(--secondary))",
  "--hairline-lo": "rgb(var(--muted))",
} as CSSProperties;

interface HairlineFigureProps {
  figure: HairlineFigureName;
  label: string;
  className?: string;
  /** Walk the figure through its answer on its own until the pointer arrives */
  play?: boolean;
}

/** Interactive isometric figure. Always dark-styled: the V2 identity is dark. */
export function HairlineFigure({ figure, label, className, play }: HairlineFigureProps) {
  const Figure = FIGURES[figure];
  return (
    <div style={themeVars} className={className}>
      <div className="origin-center scale-[1.3]">
      <Figure theme="dark" label={label} intensity={0.6} play={play} />
      </div>
    </div>
  );
}

export default HairlineFigure;
