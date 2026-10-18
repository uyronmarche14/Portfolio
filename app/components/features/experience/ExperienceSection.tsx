"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import HeaderTitle from "@/components/ui/header";
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
      className={cn(
        "grid overflow-hidden rounded-2xl border border-foreground/15 bg-card md:min-h-[460px]",
        reversed
          ? "md:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]"
          : "md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]"
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-14",
          reversed && "md:order-2"
        )}
      >
        <p className="font-mono text-xs text-foreground/60">
          <span className="text-primary">{num}</span>
          <span className="mx-2 text-foreground/30">/</span>
          {entry.dateRange}
          {duration ? ` · ${duration}` : ""}
        </p>
        <div>
          <h3 className="font-sans text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            {entry.role}
          </h3>
          <div className="mt-3 flex items-center gap-3">
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5">
              <Image
                src={entry.image}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <p className="text-base text-foreground/70">{entry.company}</p>
          </div>
        </div>
        <p className="max-w-md text-base leading-relaxed text-foreground/80">{entry.summary}</p>
        <p className="font-mono text-xs text-foreground/60">
          {entry.stack.slice(0, 4).join("  ·  ")}
        </p>
      </div>

      <div
        className={cn(
          "relative min-h-[300px] bg-foreground/[0.05] md:min-h-0",
          reversed && "md:order-1"
        )}
      >
        <div className="absolute inset-0 p-4 sm:p-6">
          <Visual />
        </div>
      </div>
    </motion.article>
  );
};

const ExperienceSection = () => {
  const now = new Date().toISOString().slice(0, 7);

  return (
    <div id="experience" className="relative w-full py-12 md:py-16">
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 md:mb-12 lg:px-4">
        <HeaderTitle
          index="02"
          introText="Resume-Backed"
          highlightText="Experience"
          description="My work history is prioritized from the updated resume first, then adapted into clearer portfolio summaries for the roles, systems, and product environments I’ve worked in."
        />
      </div>

      <ol className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6 md:space-y-8 lg:px-4">
        {workExperience.map((entry, i) => (
          <li key={entry.id}>
            <ExperienceCard entry={entry} index={i} now={now} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ExperienceSection;
