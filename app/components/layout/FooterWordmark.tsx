"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Giant "Rhyss" wordmark that fills the full viewport width. The viewBox is
 * fitted to the measured glyph bounds, so side bearings never leave a margin.
 */
export function FooterWordmark() {
  const textRef = useRef<SVGTextElement>(null);
  const [box, setBox] = useState("0 0 1000 340");

  useLayoutEffect(() => {
    const fit = () => {
      const el = textRef.current;
      if (!el) return;
      const b = el.getBBox();
      if (b.width > 0) setBox(`${b.x} ${b.y} ${b.width} ${b.height * 0.82}`);
    };
    fit();
    // re-fit once the display font has loaded
    document.fonts?.ready.then(fit);
  }, []);

  return (
    <svg viewBox={box} className="mt-6 block w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="rhyss-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgb(var(--foreground))" />
          <stop offset="0.55" stopColor="rgb(var(--foreground))" stopOpacity="0.7" />
          <stop offset="1" stopColor="rgb(var(--foreground))" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <text
        ref={textRef}
        x="0"
        y="300"
        fontSize="380"
        fontFamily="var(--font-display), sans-serif"
        fill="url(#rhyss-fade)"
      >
        Rhyss
      </text>
    </svg>
  );
}
