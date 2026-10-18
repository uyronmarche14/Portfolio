"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";

import { FilterTabs } from "@/components/ui/FilterTabs";
import HeaderTitle from "@/components/ui/header";
import { workExperience, type WorkExperienceEntry } from "@/lib/data/workExperience";
import { formatDuration, monthsBetween } from "@/lib/tenure";
import { cn } from "@/lib/utils";

import { HighlightedText } from "./HighlightedText";
import { PhotoThumb } from "./PhotoThumb";
import { experienceVisuals } from "./ExperienceVisuals";

interface ExperienceCardProps {
  entry: WorkExperienceEntry;
  index: number;
  now: string;
}

/** Each role gets its own accent: it recolors the card's artwork, number and links. */
const ROLE_TONE: Record<string, string | undefined> = {
  aique: "--tone-violet",
  beyondgen: "--tone-teal",
  keepitsimpleos: "--tone-rose",
  buildfast: "--tone-amber",
};

const ExperienceCard = ({ entry, index, now }: ExperienceCardProps) => {
  const [view, setView] = useState<"art" | "photo">("art");
  const reduceMotion = useReducedMotion();
  const Visual = experienceVisuals[entry.id as keyof typeof experienceVisuals];
  const num = String(index + 1).padStart(2, "0");
  const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));
  const reversed = index % 2 === 1;
  const tone = ROLE_TONE[entry.id];

  return (
    <motion.article
      style={tone ? ({ "--primary": `var(${tone})` } as CSSProperties) : undefined}
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
            <PhotoThumb src={entry.image} label={entry.company} />
            <p className="text-base text-foreground/70">{entry.company}</p>
          </div>
        </div>
        <p className="max-w-md text-base leading-relaxed text-foreground/80">
          <HighlightedText text={entry.summary} terms={entry.highlights} />
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {entry.stack.slice(0, 4).map((tag) => (
            <li key={tag}>
              <Badge variant="default">{tag}</Badge>
            </li>
          ))}
        </ul>
        <Link
          href={`/experience#${entry.id}`}
          className="w-fit text-sm font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          Read more
        </Link>
      </div>

      <div
        className={cn(
          "relative min-h-[300px] md:min-h-0",
          reversed && "md:order-1"
        )}
      >
        <div className="absolute inset-0">
          {view === "art" ? (
            <div className="h-full w-full p-4 sm:p-6">
              <Visual />
            </div>
          ) : (
            <Image
              src={entry.image}
              alt={`${entry.company} work photo`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
        <div className={cn("absolute top-4 z-10 rounded-full bg-card/80 backdrop-blur", reversed ? "left-4" : "right-4")}>
          <FilterTabs
            label={`${entry.company} view`}
            className="pb-0"
            value={view}
            onChange={setView}
            items={[
              { key: "art", label: "Visual" },
              { key: "photo", label: "Photo" },
            ]}
          />
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

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg">
          <Link href="/experience">Read the full experience</Link>
        </Button>
      </div>
    </div>
  );
};

export default ExperienceSection;
