"use client";

import { useEffect, useState } from "react";

/**
 * True while the user is scrolling down past the top of a page, false when
 * scrolling up. Listens to scroll events from any scroll container, so it works
 * with both the window and the nested scroller used on the home page.
 */
export function useHideOnScroll(disabled = false): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const lastTop = new WeakMap<EventTarget, number>();

    const onScroll = (event: Event) => {
      const target = event.target;
      if (!target) return;
      const isPage = target === document || target === document.documentElement || target === window;
      const top = isPage ? window.scrollY : (target as HTMLElement).scrollTop;
      const previous = lastTop.get(target) ?? 0;
      const delta = top - previous;
      if (Math.abs(delta) < 6) return;
      lastTop.set(target, top);
      setHidden(top > 80 && delta > 0);
    };

    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => document.removeEventListener("scroll", onScroll, true);
  }, []);

  return disabled ? false : hidden;
}
