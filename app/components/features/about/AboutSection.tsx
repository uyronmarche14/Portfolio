"use client";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { profileData } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { workExperience } from "@/lib/data/workExperience";
import ExperienceSection from "../experience/ExperienceSection";

const AboutDoGrid = lazy(() => import("@/components/ui/aboutDo").then(mod => ({ default: mod.AboutDoGrid })));
const AboutTimeline = lazy(() => import("@/components/ui/timeline/AboutTimeline"));

const TONE_TEXT: Record<string, string> = {
  violet: "text-tone-violet",
  teal: "text-tone-teal",
  amber: "text-tone-amber",
  rose: "text-tone-rose",
};

const ABOUT_STATS = [
  { label: "Roles", value: String(workExperience.length) },
  { label: "Projects", value: String(projects.length) },
  { label: "Degree", value: "Cum Laude" },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col snap-start overflow-hidden py-12 md:py-16 w-full"
    >
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16 lg:px-4">
        {/* left: sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-xs font-medium text-tone-violet">01 / About</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-headline">
            {profileData.about.title}
          </h2>
          <dl className="mt-8 hidden gap-6 border-t border-foreground/15 pt-6 lg:grid">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-xs text-foreground/60">{stat.label}</dt>
                <dd className="mt-1 font-display text-3xl text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* right: lead and working style */}
        <div>
          <ScrollRevealText
            text={profileData.about.lead}
            className="font-sans text-2xl font-medium leading-[1.4] tracking-tight text-foreground sm:text-3xl"
          />

          <ol className="mt-12 divide-y divide-foreground/10 border-y border-foreground/10">
            {profileData.about.pillars.map((pillar, i) => (
              <motion.li
                key={pillar.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-6"
              >
                <span className={`font-mono text-xs ${TONE_TEXT[pillar.tone]}`}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-foreground/70">{pillar.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <dl className="mt-10 grid grid-cols-3 gap-6 lg:hidden">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-xs text-foreground/60">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Experience Bento */}
      <Suspense fallback={<div className="py-16 text-center"><div className="font-mono text-xs text-foreground/40">Loading skills...</div></div>}>
        <ExperienceSection />
      </Suspense>

      {/* Timeline */}
      <Suspense fallback={<div className="py-16 text-center"><div className="font-mono text-xs text-foreground/40">Loading timeline...</div></div>}>
        <AboutTimeline />
      </Suspense>
    </section>
  );
};

export default AboutSection;
