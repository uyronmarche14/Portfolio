"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Fragment, useState } from "react";

import HeaderTitle from "@/components/ui/header";
import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience, type WorkExperienceEntry } from "@/lib/data/workExperience";
import { formatDuration, monthsBetween } from "@/lib/tenure";
import { cn } from "@/lib/utils";

import { experienceVisuals } from "./ExperienceVisuals";

interface ExperienceCardProps {
  entry: WorkExperienceEntry;
  index: number;
  now: string;
}

const ExperienceCard = ({ entry, index, now }: ExperienceCardProps) => {
  const [view, setView] = useState<"art" | "photo">("art");
  const reduceMotion = useReducedMotion();
  const Visual = experienceVisuals[entry.id as keyof typeof experienceVisuals];
  const num = String(index + 1).padStart(2, "0");
  const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid overflow-hidden rounded-[14px] border border-foreground/15 bg-card md:min-h-[440px] md:grid-cols-2"
    >
      <div
        className={cn(
          "flex flex-col justify-center gap-5 p-8 sm:p-10 lg:p-14",
          reversed && "md:order-2"
        )}
      >
        <p className="font-mono text-xs text-secondary">
          <span className="text-primary">{num}</span> / {entry.dateRange}
          {duration ? ` · ${duration}` : ""}
        </p>
        <div>
          <h3 className="font-display text-3xl text-foreground lg:text-4xl">{entry.role}</h3>
          <p className="mt-1 text-base text-primary">{entry.company}</p>
        </div>
        <p className="max-w-lg text-base leading-relaxed text-foreground/70">{entry.summary}</p>
        <ul className="flex flex-wrap gap-1.5">
          {entry.stack.map((tag) => (
            <li key={tag}>
              <Badge variant="outline">{tag}</Badge>
            </li>
          ))}
        </ul>
        <p className="text-sm text-foreground/60">{entry.highlight}</p>
      </div>

      <div
        className={cn(
          "relative min-h-[320px] border-t border-foreground/15 md:min-h-0 md:border-t-0",
          reversed ? "md:order-1 md:border-r" : "md:border-l"
        )}
      >
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
          aria-label={`${entry.company} visual`}
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
    </motion.article>
  );
};

const ExperienceSection = () => {
  const now = new Date().toISOString().slice(0, 7);

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

      <ol className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-4">
        {workExperience.map((entry, i) => (
          <Fragment key={entry.id}>
            {i > 0 && (
              <li aria-hidden="true" className="flex flex-col items-center py-1">
                <span className="h-8 w-px bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="h-8 w-px bg-foreground/15" />
              </li>
            )}
            <li>
              <ExperienceCard entry={entry} index={i} now={now} />
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
};

export default ExperienceSection;
