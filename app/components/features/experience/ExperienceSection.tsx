"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";

import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience } from "@/lib/data/workExperience";
import { formatDuration, monthsBetween } from "@/lib/tenure";
import { cn } from "@/lib/utils";

import { experienceVisuals } from "./ExperienceVisuals";

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const now = new Date().toISOString().slice(0, 7);
  const entry = workExperience[activeIndex];
  const Visual = experienceVisuals[entry.id as keyof typeof experienceVisuals];
  const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = workExperience.length - 1;
    const next =
      event.key === "ArrowRight" ? (activeIndex === last ? 0 : activeIndex + 1)
      : event.key === "ArrowLeft" ? (activeIndex === 0 ? last : activeIndex - 1)
      : null;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    document.getElementById(`experience-tab-${workExperience[next].id}`)?.focus();
  };

  return (
    <div id="experience" className="relative w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-[min(100%-48px,1270px)]">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="font-sans text-4xl font-medium tracking-tight text-foreground lg:text-5xl">
            Experience
          </h2>
          <p className="mt-4 text-lg text-secondary">
            Where I&apos;ve worked, what I built there, and the stack behind it.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Roles"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {workExperience.map((item, i) => (
            <button
              key={item.id}
              id={`experience-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={i === activeIndex}
              aria-controls="experience-panel"
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                i === activeIndex
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {item.company.split(" / ")[0].split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        <div
          id="experience-panel"
          role="tabpanel"
          aria-labelledby={`experience-tab-${entry.id}`}
          className="mt-8 overflow-hidden rounded-[14px] border border-foreground/15 bg-card"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={entry.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="grid min-h-[480px] md:grid-cols-2"
            >
              <div className="flex flex-col justify-center gap-5 p-8 sm:p-10 lg:p-14">
                <p className="font-mono text-xs text-secondary">
                  {entry.dateRange}
                  {duration ? ` · ${duration}` : ""}
                </p>
                <div>
                  <h3 className="font-sans text-3xl font-medium tracking-tight text-foreground lg:text-4xl">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-base text-primary">{entry.company}</p>
                </div>
                <p className="max-w-lg text-base leading-relaxed text-foreground/70">
                  {entry.summary}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {entry.stack.map((tag) => (
                    <li key={tag}>
                      <Badge variant="outline">{tag}</Badge>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground/60">{entry.highlight}</p>
              </div>

              <div className="relative min-h-[320px] border-t border-foreground/15 bg-foreground/[0.03] md:min-h-0 md:border-l md:border-t-0">
                <div className="absolute inset-0">
                  <Visual />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
