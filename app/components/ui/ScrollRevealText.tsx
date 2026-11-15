"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface WordProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word = ({ word, range, progress }: WordProps) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {word}
    </motion.span>
  );
};

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

/** Nearest ancestor that scrolls vertically; the page scrolls in an inner container, not the window. */
function findScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null;
  while (el) {
    const overflowY = getComputedStyle(el).overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) return el;
    el = el.parentElement;
  }
  return null;
}

/**
 * Large paragraph whose words light up one by one as the block scrolls through
 * the viewport. With reduced motion it simply renders the text.
 */
export function ScrollRevealText({ text, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  // container falls back to the window when no scrolling ancestor exists (e.g. a page that scrolls normally)
  const { scrollYProgress } = useScroll({ container: containerRef, target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(/\s+/);

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p
      ref={(node) => {
        ref.current = node;
        containerRef.current = findScrollParent(node);
      }}
      className={cn("flex flex-wrap gap-x-[0.28em] gap-y-1", className)}
      aria-label={text}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={`${word}-${i}`} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </p>
  );
}
