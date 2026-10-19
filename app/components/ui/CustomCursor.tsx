"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Cursor accent and idle label for each area of the site. */
function contextFor(pathname: string) {
  if (pathname.startsWith("/experience")) return { color: "--tone-violet", label: "Reading" };
  if (pathname.startsWith("/projects")) return { color: "--tone-amber", label: "Exploring" };
  if (pathname.startsWith("/process")) return { color: "--tone-teal", label: "Mapping" };
  return { color: "--primary", label: "Rhyss" };
}

/** Label for the element under the pointer, or null for the page default. */
function labelFor(target: Element | null): string | null {
  if (!target) return null;
  const custom = target.closest("[data-cursor]");
  if (custom) return custom.getAttribute("data-cursor");
  if (target.closest("input, textarea, select")) return "";
  if (target.closest("a[href^='mailto:'], a[href^='tel:']")) return "Contact";
  if (target.closest("a[target='_blank']")) return "Open";
  if (target.closest("a")) return "Go";
  if (target.closest("button, [role='button'], [role='tab']")) return "Click";
  if (target.closest("img, svg[viewBox], figure")) return "Look";
  return null;
}

/**
 * Miro-style cursor: a sharp arrow at the pointer plus a name chip that trails
 * it with a soft spring. The chip changes with what is under the pointer and
 * with the page, and the arrow squeezes while the button is held.
 */
export function CustomCursor() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const chipX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const chipY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setLabel(labelFor(e.target as Element | null));
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ctx = contextFor(pathname);
  const text = label === null ? ctx.label : label;
  const color = `rgb(var(${ctx.color}))`;
  const hide = !visible || label === "";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div style={{ x, y, opacity: hide ? 0 : 1 }} className="absolute left-0 top-0">
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          animate={{ scale: down ? 0.82 : 1, rotate: down ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{ transformOrigin: "2px 2px" }}
        >
          <path
            d="M2 2l15 6.2-6.1 2.1-2.4 6.2L2 2z"
            fill={color}
            stroke="rgb(var(--background))"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>

      {text && (
        <motion.div
          style={{ x: chipX, y: chipY, opacity: hide ? 0 : 1 }}
          className="absolute left-0 top-0"
        >
          <motion.span
            key={text}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: down ? 0.92 : 1 }}
            transition={{ duration: 0.16 }}
            style={{ backgroundColor: color, transformOrigin: "left top" }}
            className="ml-5 mt-5 inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium text-[rgb(var(--primary-foreground))] shadow-soft-sm"
          >
            {text}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
