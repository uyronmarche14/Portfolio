"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { HoverWord } from "./HoverWord";
import { achievementsData } from "@/lib/data/achievements";
import { projects } from "@/lib/data/projects";
import { workExperience } from "@/lib/data/workExperience";
import { HERO_SKILL_GROUPS, HOME_CONTENT } from "@/lib/data/homeContent";
import { profileData } from "@/lib/data/profile";

const cumLaude = achievementsData.find((item) => item.id === "cum-laude-2025");
const iopex = workExperience.find((entry) => entry.id === "iopex");
const beyondgen = workExperience.find((entry) => entry.id === "beyondgen");
const codex = projects.find((project) => project.id === "codex-express");

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
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div>
        <Badge variant="default" className="mb-8 h-7 px-3 text-[13px]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tone-teal" />
              {profileData.quickFacts.find((fact) => fact.label === "Based in")?.value}
            </Badge>

        <h1 className="mb-8 font-display text-6xl leading-[0.9] text-headline sm:text-7xl md:text-8xl lg:text-8xl">
          {HOME_CONTENT.nameLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </h1>

        <p className="max-w-xl text-balance text-xl leading-snug text-foreground/80 md:text-2xl">
              {HOME_CONTENT.subtitle}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
              I turn{" "}
              <HoverWord
                title="Technical Business Analyst"
                href="#about"
                text="Translating business needs into clear, testable specifications before any code is written."
              >
                business requirements
              </HoverWord>{" "}
              into{" "}
              <HoverWord
                title="AI Architecture"
                href="#projects"
                text="Designing AI-assisted systems and workflows that fit the problem they solve."
              >
                AI-assisted software
              </HoverWord>
              . I graduated{" "}
              <HoverWord
                title={cumLaude?.title}
                href="#achievements"
                text={`${cumLaude?.issuer}, ${cumLaude?.date}`}
                image={cumLaude?.image}
              >
                Cum Laude
              </HoverWord>
              , and I&apos;m now a Technical Business Analyst at{" "}
              <HoverWord
                title={iopex?.company}
                href="/experience/iopex"
                text={`${iopex?.role}, ${iopex?.dateRange}`}
              >
                iOPEX Technologies
              </HoverWord>
              , analyzing live enterprise workflows and building KPI dashboards. Before that I worked on supplier
              quality management at{" "}
              <HoverWord
                title={beyondgen?.company}
                href="/experience/beyondgen"
                text={`${beyondgen?.role}, ${beyondgen?.dateRange}`}
                image={beyondgen?.image}
              >
                Beyondgen
              </HoverWord>
              , and built projects like{" "}
              <HoverWord
                title={codex?.title}
                href="/projects/codex-express"
                text="An appointment scheduling web app built with Next.js and TypeScript."
                image={codex?.screenshots[0]}
              >
                Codex Express
              </HoverWord>
              . Next, I&apos;m going deeper into {currentlyLearning}.
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
          </div>

          <figure data-cursor="Hi, I'm Ron" className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-tone-violet/15 via-transparent to-primary/15 blur-xl"
              />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-foreground/15 bg-foreground/5">
              <Image
                src={profileData.photo.src}
                alt={profileData.photo.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-4 right-4 rounded-xl border border-foreground/15 bg-card/95 px-4 py-3 shadow-soft-lg backdrop-blur sm:left-auto sm:right-auto sm:-left-6 sm:max-w-[16rem] lg:-left-10">
              <span className="block font-mono text-xs text-primary">Role</span>
              <span className="mt-1 block text-sm text-foreground">{HOME_CONTENT.subtitle}</span>
            </figcaption>
          </figure>
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
