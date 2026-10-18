"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState, type KeyboardEvent } from "react";

import HeaderTitle from "@/components/ui/header";
import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience } from "@/lib/data/workExperience";
import { formatDuration, monthsBetween } from "@/lib/tenure";
import { cn } from "@/lib/utils";

import { experienceVisuals } from "./ExperienceVisuals";

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState<"art" | "photo">("art");
  const reduceMotion = useReducedMotion();
  const now = new Date().toISOString().slice(0, 7);
  const entry = workExperience[activeIndex];
  const num = String(activeIndex + 1).padStart(2, "0");
  const Visual = experienceVisuals[entry.id as keyof typeof experienceVisuals];
  const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));

  const select = (index: number) => {
    setActiveIndex(index);
    setView("art");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = workExperience.length - 1;
    const next =
      event.key === "ArrowRight" ? (activeIndex === last ? 0 : activeIndex + 1)
      : event.key === "ArrowLeft" ? (activeIndex === 0 ? last : activeIndex - 1)
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    document.getElementById(`experience-tab-${workExperience[next].id}`)?.focus();
  };

  return (
    <div id="experience" className="relative w-full py-8 sm:py-10 md:py-12">
      <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6 md:mb-10 lg:px-4">
        <HeaderTitle
          index="02"
          introText="Resume-Backed"
          highlightText="Experience"
          description="My work history is prioritized from the updated resume first, then adapted into clearer portfolio summaries for the roles, systems, and product environments I’ve worked in."
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-4">
        <div
          role="tablist"
          aria-label="Roles"
          className="flex flex-wrap gap-2"
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
              onClick={() => select(i)}
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
                  <h3 className="font-display text-3xl text-foreground lg:text-4xl">
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
                  {view === "art" ? (
                    <Visual />
                  ) : (
                    <figure className="relative h-full w-full">
                      <Image
                        src={entry.image}
                        alt={`${entry.company} work photo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <figcaption className="absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1 font-mono text-xs text-foreground backdrop-blur">
                        Fig. {num} / {entry.company}
                      </figcaption>
                    </figure>
                  )}
                </div>
                <div
                  role="group"
                  aria-label="Visual"
                  className="absolute right-4 top-4 z-10 flex rounded-full border border-foreground/15 bg-background/85 p-0.5 backdrop-blur"
                >
                  {(["art", "photo"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      aria-pressed={view === mode}
                      onClick={() => setView(mode)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        view === mode ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground"
                      )}
                    >
                      {mode === "art" ? "Illustration" : "Photo"}
                    </button>
                  ))}
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
