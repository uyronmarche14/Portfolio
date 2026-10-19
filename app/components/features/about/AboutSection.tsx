"use client";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

import HeaderTitle from "@/components/ui/header";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { profileData } from "@/lib/data/profile";
import ExperienceSection from "../experience/ExperienceSection";

const AboutDoGrid = lazy(() => import("@/components/ui/aboutDo").then(mod => ({ default: mod.AboutDoGrid })));
const AboutTimeline = lazy(() => import("@/components/ui/timeline/AboutTimeline"));

const TONE_BAR: Record<string, string> = {
  violet: "bg-tone-violet",
  teal: "bg-tone-teal",
  amber: "bg-tone-amber",
  rose: "bg-tone-rose",
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col snap-start overflow-hidden py-12 md:py-16 w-full"
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="relative mb-10 md:mb-14">
          <div className="relative z-10 text-center">
            <HeaderTitle
              index="01"
              introText="About"
              highlightText={profileData.about.title}
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <ScrollRevealText
            text={profileData.about.lead}
            className="font-sans text-2xl font-medium leading-[1.4] tracking-tight text-foreground sm:text-3xl"
          />
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-5 border-t border-foreground/15 pt-8 sm:grid-cols-2">
          {profileData.about.pillars.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span aria-hidden="true" className={`h-5 w-1 rounded-full ${TONE_BAR[pillar.tone]}`} />
              <span className="text-base font-medium text-foreground">{pillar.title}</span>
            </motion.li>
          ))}
        </ul>
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
