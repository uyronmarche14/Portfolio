"use client";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

import HeaderTitle from "@/components/ui/header";
import { factIcons } from "@/components/ui/icons/factIcons";
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[62ch] text-base leading-relaxed text-foreground/70 md:text-lg"
          >
            {profileData.about.body}
          </motion.p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2">
          {profileData.about.pillars.map((pillar, i) => (
            <motion.li
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-foreground/15 bg-card p-6 transition-colors duration-200 hover:border-foreground/35"
            >
              <span
                aria-hidden="true"
                className={`block h-1 w-8 rounded-full transition-all duration-300 group-hover:w-14 ${TONE_BAR[pillar.tone]}`}
              />
              <h3 className="mt-4 font-sans text-lg font-semibold tracking-tight text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{pillar.text}</p>
            </motion.li>
          ))}
        </ul>

        <dl className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-6 border-t border-foreground/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {profileData.quickFacts.slice(0, 4).map((fact) => {
            const FactIcon = factIcons[fact.label];
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <dt className="flex items-center gap-2 font-mono text-xs text-foreground/60">
                  {FactIcon && <FactIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-snug text-foreground">{fact.value}</dd>
              </motion.div>
            );
          })}
        </dl>
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
