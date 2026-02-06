"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface CleanGridBackgroundProps {
  cellSize?: number;
  className?: string;
}

/**
 * Theme-aware background component
 * - Light theme: Grainy noise texture
 * - Dark/BW themes: Clean grid pattern
 */
export const CleanGridBackground: React.FC<CleanGridBackgroundProps> = ({
  cellSize = 20,
  className = "",
}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show nothing until mounted to prevent hydration issues
  if (!mounted) {
    return <div className={`absolute inset-0 h-full w-full pointer-events-none ${className}`} />;
  }

  const isLightTheme = resolvedTheme === "light";

  return (
    <div className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}>
      {isLightTheme ? (
        /* Grainy Noise Background for Light Theme */
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.25,
            mixBlendMode: "overlay",
          }}
        />
      ) : (
        /* Grid Background for Dark/BW Themes */
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(var(--foreground) / var(--grid-border, 0.05)) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(var(--foreground) / var(--grid-border, 0.05)) 1px, transparent 1px)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            opacity: `var(--grid-opacity, 0.5)`,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
};