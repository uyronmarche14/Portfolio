"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { HeroPortrait } from "./HeroPortrait";
import { HoverWord } from "./HoverWord";
import { workExperience } from "@/lib/data/workExperience";
import { HOME_CONTENT } from "@/lib/data/homeContent";
import { profileData } from "@/lib/data/profile";
import { customStagger, editorialReveal } from "@/lib/utils/animations";

const iopex = workExperience.find((entry) => entry.id === "iopex");
const heroSequence = customStagger(0.06, 0.02);

const HomeSection = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="hero-wrap relative flex w-full snap-start flex-col items-start overflow-hidden pb-12 pt-32 md:pb-16">
      <div className="relative z-10 w-full text-left">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <motion.div
            variants={heroSequence}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
        <motion.div variants={editorialReveal} className="mb-8 flex flex-wrap items-center gap-3">
        <Badge variant="default" className="h-7 px-3 text-[13px]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tone-teal" />
              {profileData.quickFacts.find((fact) => fact.label === "Based in")?.value}
            </Badge>
        </motion.div>

        <motion.h1 variants={editorialReveal} className="mb-8 font-display text-5xl leading-[0.95] min-[420px]:text-6xl text-headline sm:text-7xl md:text-8xl lg:text-8xl">
          {HOME_CONTENT.nameLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
        </motion.h1>

        <motion.p variants={editorialReveal} className="max-w-xl text-balance text-xl leading-snug text-foreground/80 md:text-2xl">
              {HOME_CONTENT.subtitle}
            </motion.p>

            <motion.p variants={editorialReveal} className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
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
              . Cum Laude graduate, now at{" "}
              <HoverWord
                title={iopex?.company}
                href="/experience/iopex"
                text={`${iopex?.role}, ${iopex?.dateRange}`}
              >
                iOPEX Technologies
              </HoverWord>
              , building KPI dashboards from live enterprise workflows.
            </motion.p>

        <motion.div variants={editorialReveal} className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">View resume</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#contact">Contact</a>
          </Button>
        </motion.div>

        <motion.div variants={editorialReveal} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a href="#projects" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
            Explore projects
          </a>
        </motion.div>
          </motion.div>

          <HeroPortrait />
        </div>

      </div>
    </div>
  );
};

export default HomeSection;
