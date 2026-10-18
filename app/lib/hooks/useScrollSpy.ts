"use client";

import { useEffect, useState } from "react";

type Line = number | `${number}%`;

const resolveLine = (line: Line) =>
  typeof line === "string" ? (window.innerHeight * parseFloat(line)) / 100 : line;

/**
 * Returns the id of the last element (from `ids`, in document order) whose top
 * has passed the reading line, measured from the top of the viewport. It looks
 * elements up by id on every update, so lazily mounted or re-created sections
 * are always found. Scroll events are caught from any scrolling ancestor.
 */
export function useScrollSpy(ids: string[], line: Line = 140): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = resolveLine(line);
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) current = id;
      }
      if (current) setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // capture: true also catches scrolling inside nested scroll containers
    document.addEventListener("scroll", schedule, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    // sections can mount after the first paint, so re-measure a few times
    const timers = [200, 800, 2000].map((ms) => window.setTimeout(schedule, ms));
    schedule();

    return () => {
      document.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      timers.forEach(window.clearTimeout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, line]);

  return active;
}
