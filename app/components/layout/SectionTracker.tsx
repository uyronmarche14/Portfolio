"use client";

import { useMemo } from "react";

import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

export const TRACKED_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "journey", label: "Journey" },
  { id: "activities", label: "Activities" },
  { id: "achievements", label: "Achievements" },
  { id: "projects", label: "Projects" },
  { id: "work-with-me", label: "Work with me" },
  { id: "contact", label: "Contact" },
] as const;

/** Vertical tracker fixed to the middle of the left edge; one mark per section. */
export function SectionTracker() {
  const ids = useMemo(() => TRACKED_SECTIONS.map((section) => section.id), []);
  const active = useScrollSpy(ids, "30%");

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-start gap-1">
        {TRACKED_SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="group/mark relative">
              <button
                type="button"
                onClick={() => jump(section.id)}
                aria-label={section.label}
                aria-current={isActive ? "true" : undefined}
                className="flex h-5 w-5 items-center justify-center focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    isActive
                      ? "h-5 w-1.5 bg-primary"
                      : "h-1.5 w-1.5 bg-foreground/25 group-hover/mark:bg-foreground/60 group-focus-within/mark:bg-foreground/60"
                  )}
                />
              </button>
              <span
                className={cn(
                  "pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-foreground/15 bg-card px-2 py-1 text-xs text-foreground opacity-0 shadow-soft-sm transition-opacity duration-200 group-hover/mark:opacity-100 group-focus-within/mark:opacity-100",
                  isActive && "text-primary"
                )}
              >
                {section.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
