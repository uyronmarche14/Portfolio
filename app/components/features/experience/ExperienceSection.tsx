"use client";

import Image from "next/image";
import { useState } from "react";

import HeaderTitle from "@/components/ui/header";
import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience } from "@/lib/data/workExperience";
import { formatDuration, monthsBetween } from "@/lib/tenure";

import { ExperienceTenureStrip } from "./ExperienceTenureStrip";

const ExperienceSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-4">
        <ExperienceTenureStrip entries={workExperience} activeId={activeId} onActiveChange={setActiveId} />

        <ol className="mt-8 border-b border-foreground/15 md:mt-10">
          {workExperience.map((entry, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isActive = activeId === entry.id;
            const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));

            return (
              <li
                key={entry.id}
                onMouseEnter={() => setActiveId(entry.id)}
                onMouseLeave={() => setActiveId(null)}
                className="grid gap-5 border-t border-foreground/15 py-8 md:grid-cols-[11rem_minmax(0,1fr)_13rem] md:gap-8"
              >
                <div className="font-mono text-xs text-secondary">
                  <p className={isActive ? "text-primary" : undefined}>{entry.dateRange}</p>
                  {duration && <p className="mt-1 text-foreground/50">{duration}</p>}
                </div>

                <div>
                  <h3 className="font-display text-2xl text-foreground md:text-3xl">
                    <span className="mr-3 font-mono text-sm font-medium text-primary">{num}</span>
                    {entry.role}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-primary">{entry.company}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
                    {entry.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {entry.stack.map((tag) => (
                      <li key={tag}>
                        <Badge variant="outline">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-l border-primary/40 pl-3 text-sm italic text-foreground/60">
                    {entry.highlight}
                  </p>
                </div>

                <figure className="hidden md:block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-foreground/15 bg-foreground/5">
                    <Image
                      src={entry.image}
                      alt={`${entry.company} work photo`}
                      fill
                      sizes="208px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-xs text-foreground/50">
                    Fig. {num} / {entry.company}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ExperienceSection;
