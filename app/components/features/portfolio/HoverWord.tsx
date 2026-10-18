"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";

interface HoverWordProps {
  children: ReactNode;
  /** short explanation shown in the card */
  text: string;
  title?: string;
  image?: string;
}

/**
 * Inline word with a dotted underline. Hover or keyboard focus opens a small
 * card with an optional picture; tapping focuses it on touch screens.
 */
export function HoverWord({ children, text, title, image }: HoverWordProps) {
  const id = useId();
  return (
    <span className="group/word relative inline-block">
      <span
        tabIndex={0}
        aria-describedby={id}
        className="cursor-help underline decoration-primary/60 decoration-dotted underline-offset-4 outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
      >
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-full left-0 z-30 mb-3 w-64 origin-bottom-left translate-y-1 scale-95 overflow-hidden rounded-xl border border-foreground/15 bg-card text-left opacity-0 shadow-soft-lg transition duration-200 ease-out group-hover/word:visible group-hover/word:translate-y-0 group-hover/word:scale-100 group-hover/word:opacity-100 group-focus-within/word:visible group-focus-within/word:translate-y-0 group-focus-within/word:scale-100 group-focus-within/word:opacity-100 motion-reduce:transition-none"
      >
        {image && (
          <span className="relative block aspect-[16/10] w-full bg-foreground/5">
            <Image src={image} alt="" fill sizes="256px" className="object-cover" />
          </span>
        )}
        <span className="block p-3">
          {title && <span className="block text-sm font-medium text-foreground">{title}</span>}
          <span className="mt-0.5 block text-sm leading-snug text-foreground/70">{text}</span>
        </span>
      </span>
    </span>
  );
}
