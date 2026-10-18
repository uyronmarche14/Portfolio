"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, type MouseEvent, type ReactNode } from "react";

interface HoverWordProps {
  children: ReactNode;
  /** short explanation shown in the card */
  text: string;
  title?: string;
  image?: string;
  /** `#section` scrolls to a section on this page; any other value is a route */
  href?: string;
}

/**
 * Inline word with a dotted underline. Hover or keyboard focus opens a small
 * card with an optional picture; tapping focuses it on touch screens.
 */
export function HoverWord({ children, text, title, image, href }: HoverWordProps) {
  const id = useId();
  const className =
    "underline decoration-primary/60 decoration-dotted underline-offset-4 outline-none transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring " +
    (href ? "cursor-pointer" : "cursor-help");

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(href!.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <span className="group/word relative inline-block">
      {href?.startsWith("#") ? (
        <a href={href} onClick={scrollToSection} aria-describedby={id} className={className}>
          {children}
        </a>
      ) : href ? (
        <Link href={href} aria-describedby={id} className={className}>
          {children}
        </Link>
      ) : (
        <span tabIndex={0} aria-describedby={id} className={className}>
          {children}
        </span>
      )}
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
          {href && <span className="mt-2 block font-mono text-xs text-primary">Click to open</span>}
        </span>
      </span>
    </span>
  );
}
