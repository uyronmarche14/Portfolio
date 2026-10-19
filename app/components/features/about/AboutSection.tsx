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

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col snap-start overflow-hidden py-12 md:py-16 w-full"
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="relative mb-8 sm:mb-10 md:mb-12">
          <div className="relative z-10 text-center">
            <HeaderTitle
               index="01"
               introText="About"
               highlightText={profileData.header.highlight}
               description={profileData.header.description}
             />
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <ScrollRevealText
            text={profileData.bio.description}
            className="font-sans text-2xl font-medium leading-[1.35] tracking-tight text-foreground sm:text-3xl md:text-4xl"
          />

          <dl className="mt-14 grid gap-x-10 gap-y-6 border-t border-foreground/15 pt-8 sm:grid-cols-2">
            {profileData.quickFacts.map((fact) => {
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
                  <dd className="mt-1.5 text-base text-foreground">{fact.value}</dd>
                </motion.div>
              );
            })}
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
