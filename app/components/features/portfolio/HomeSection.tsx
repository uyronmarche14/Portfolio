"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import RotatingText from "@/components/ui/textChange";
import { HERO_SKILL_GROUPS, HOME_CONTENT } from "@/lib/data/homeContent";

const HomeSection: React.FC = () => {
  const [isStackExpanded, setIsStackExpanded] = useState(false);
  const totalSkills = HERO_SKILL_GROUPS.reduce(
    (count, group) => count + group.skills.length,
    0
  );

  return (
    <div className="relative w-full flex min-h-screen snap-start flex-col items-start justify-center overflow-hidden">
      <div className="w-full relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-left">
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground/50 sm:mb-6 sm:text-sm">
          Portfolio / 2026
        </div>

        <h1 className="mb-4 text-4xl font-bold font-rawkner leading-none text-headline sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl uppercase">
          I&apos;m{" "}
          <span className="inline-block bg-primary px-2 py-1 text-background sm:px-3">
            {HOME_CONTENT.name}
          </span>
          <br />
          <span className="flex flex-col items-start gap-3 pt-3">
            <span>{HOME_CONTENT.title}</span>
            <RotatingText
              texts={[
                "Full Stack Developer",
                "AI Engineer",
                "Software Engineer",
                "Project Manager",
                "DevOps Engineer",
                "Data Scientist",
              ]}
              mainClassName="inline-flex justify-center whitespace-nowrap border-2 border-foreground bg-foreground px-2 sm:px-3 py-1 sm:py-2 text-background overflow-hidden"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>

        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setIsStackExpanded(!isStackExpanded)}
            className="rounded-none border-2 border-foreground bg-primary px-6 py-5 font-mono text-xs font-bold uppercase text-background shadow-brutal-sm transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal sm:text-sm"
          >
            {isStackExpanded ? "Hide Tech Stack & Tools" : "View Tech Stack & Tools"}
          </Button>

          <AnimatePresence>
            {isStackExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-2 border-foreground bg-background p-4 shadow-brutal-sm sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-3 border-b-2 border-foreground pb-3">
                    <span className="border-2 border-foreground bg-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background">
                        Resume Driven
                    </span>
                    <h3 className="font-rawkner text-xl uppercase text-primary sm:text-2xl">
                      Tech Stack & Arsenal
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                      {HERO_SKILL_GROUPS.length} groups / {totalSkills}+ tools
                    </span>
                  </div>

                  <div className="space-y-3">
                    {HERO_SKILL_GROUPS.map((group) => {
                      return (
                        <div
                          key={group.title}
                          className="border-b border-foreground/20 pb-3 last:border-b-0 last:pb-0"
                        >
                          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-4">
                            <div className="shrink-0 lg:w-56">
                              <div className="flex items-center gap-2">
                                <span className="h-2 w-2 bg-primary" />
                                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                                  {group.eyebrow}
                                </span>
                              </div>
                              <h4 className="mt-1 font-rawkner text-lg uppercase text-foreground sm:text-xl">
                                {group.title}
                              </h4>
                              <p className="mt-1 max-w-xs font-mono text-[11px] leading-relaxed text-foreground/60 sm:text-xs">
                                {group.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-start gap-2">
                            {group.skills.map((skill) => (
                              <Badge
                                key={`${group.title}-${skill}`}
                                  className="border border-foreground/30 bg-transparent px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-foreground transition-colors duration-150 hover:bg-foreground hover:text-background sm:text-xs"
                                variant="outline"
                              >
                                {skill}
                              </Badge>
                            ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
          {HOME_CONTENT.description}
        </p>

        <div className="mt-8 h-1 w-24 bg-primary" />
      </div>
    </div>
  );
};

export default HomeSection;
