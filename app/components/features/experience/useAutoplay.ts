"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Autoplay that hands control to the visitor. It steps through `count` states while the element is on screen, and stops for good on the
 * first call to `select` (a click, tap or key press). `resume` turns the loop back on. No autoplay at all under reduced motion.
 */
export function useAutoplay(count: number, ms = 3000, enabled = true, amount = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(enabled);

  useEffect(() => {
    if (!enabled || !auto || reduce || !inView) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [enabled, auto, reduce, inView, count, ms]);

  const select = useCallback((i: number) => {
    setIndex(i);
    setAuto(false);
  }, []);
  const resume = useCallback(() => setAuto(true), []);

  return { ref, index, select, auto, resume, reduce: Boolean(reduce) };
}

/** Small "Auto" chip shown once the visitor has taken over, to bring the loop back. */
export const AUTO_CHIP_CLASS =
  "shrink-0 rounded-full border border-foreground/15 px-3 py-1 font-mono text-xs text-foreground/75 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
