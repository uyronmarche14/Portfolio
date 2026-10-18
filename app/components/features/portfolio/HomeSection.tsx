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
    <div className="relative flex min-h-screen w-full snap-start flex-col items-start justify-center overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-left sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs font-medium text-secondary">Portfolio / 2026</p>

        <h1 className="mb-6 font-display text-5xl font-semibold leading-[0.95] text-headline sm:text-6xl md:text-7xl lg:text-8xl">
          {HOME_CONTENT.name}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xl text-secondary sm:text-2xl md:text-3xl">
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
            mainClassName="inline-flex justify-center whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 font-medium text-primary overflow-hidden"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg md:text-xl">
          {HOME_CONTENT.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="#projects">See my work</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsStackExpanded(!isStackExpanded)}
            aria-expanded={isStackExpanded}
          >
            {isStackExpanded ? "Hide tech stack" : "Tech stack & tools"}
          </Button>
        </div>

        <AnimatePresence>
          {isStackExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-foreground/15 bg-card p-5 sm:p-6">
                <p className="mb-5 font-mono text-xs text-secondary">
                  {HERO_SKILL_GROUPS.length} groups / {totalSkills}+ tools
                </p>
                <div className="space-y-5">
                  {HERO_SKILL_GROUPS.map((group, i) => (
                    <div
                      key={group.title}
                      className="flex flex-col gap-3 border-t border-foreground/10 pt-5 first:border-t-0 first:pt-0 lg:flex-row lg:gap-8"
                    >
                      <div className="shrink-0 lg:w-56">
                        <p className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")} / {group.eyebrow}
                        </p>
                        <h4 className="mt-1 font-display text-xl font-semibold text-foreground">
                          {group.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap items-start gap-2">
                        {group.skills.map((skill) => (
                          <Badge key={`${group.title}-${skill}`} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HomeSection;
