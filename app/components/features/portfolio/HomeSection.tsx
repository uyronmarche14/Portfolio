"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { factIcons } from "@/components/ui/icons/factIcons";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { HERO_SKILL_GROUPS, HOME_CONTENT } from "@/lib/data/homeContent";
import { profileData } from "@/lib/data/profile";

const HomeSection: React.FC = () => {
  const currentlyLearning =
    profileData.quickFacts.find((fact) => fact.label === "Learning")?.value ?? "";
  const [isStackExpanded, setIsStackExpanded] = useState(false);
  const totalSkills = HERO_SKILL_GROUPS.reduce(
    (count, group) => count + group.skills.length,
    0
  );

  return (
    <div className="relative flex w-full snap-start flex-col items-start overflow-hidden pb-12 pt-32 md:pb-16">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-left sm:px-6 lg:px-8">
        <p className="mb-8 font-mono text-xs font-medium text-secondary">Portfolio / 2026</p>

        <h1 className="mb-8 font-display text-6xl leading-[0.9] text-headline sm:text-7xl md:text-8xl lg:text-9xl">
          {HOME_CONTENT.nameLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h1>

        <p className="mb-5 flex items-center gap-2 font-mono text-sm font-medium text-primary">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          Currently learning {currentlyLearning}
        </p>

        <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl md:text-2xl">
          {HOME_CONTENT.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {HOME_CONTENT.roles.map((role) => (
            <li key={role}>
              <Badge variant="outline">{role}</Badge>
            </li>
          ))}
        </ul>

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

        <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-6 border-t border-foreground/15 pt-6 sm:grid-cols-3">
          {profileData.quickFacts
            .filter((fact) => ["Based in", "Education", "Favorite Tech"].includes(fact.label))
            .map((fact) => {
              const FactIcon = factIcons[fact.label];
              return (
              <div key={fact.label}>
                <dt className="flex items-center gap-1.5 font-mono text-xs text-secondary">
                  {FactIcon && <FactIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
              </div>
              );
            })}
        </dl>

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
