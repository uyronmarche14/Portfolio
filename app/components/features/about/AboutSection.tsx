"use client";
import { CldImage } from "next-cloudinary";
import { lazy, Suspense } from "react";

import HeaderTitle from "@/components/ui/header";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { profileData } from "@/lib/data/profile";
import ExperienceBento from "../experience/ExperienceBento";

const AboutDoGrid = lazy(() => import("@/components/ui/aboutDo").then(mod => ({ default: mod.AboutDoGrid })));
const AboutTimeline = lazy(() => import("@/components/ui/timeline/AboutTimeline"));

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col min-h-screen snap-start justify-center overflow-hidden py-8 sm:py-12 md:py-16 w-full"
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative z-10 text-center sm:text-left">         
            <HeaderTitle
               introText={profileData.header.intro}
               highlightText={profileData.header.highlight}
               description={profileData.header.description}
             />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            {/* Profile Image — Brutalist frame */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[450px] mx-auto lg:mx-0 overflow-hidden border-2 border-foreground shadow-brutal">
                {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                    <CldImage
                    src={profileData.photo.src}
                    alt={profileData.photo.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 450px"
                    className="object-cover"
                    priority
                    />
                ) : (
                    <div className="w-full h-full bg-foreground/5 flex items-center justify-center text-foreground/40 font-mono text-sm uppercase">
                        No Cloudinary Configured
                    </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 order-2 lg:order-2">
            {/* Bio */}
            <div className="space-y-3 sm:space-y-4">
              <Heading as="h2" className="text-xl sm:text-2xl md:text-3xl">
                {profileData.bio.title}
                <span className="text-primary ml-2">
                  {profileData.bio.highlight}
                </span>
              </Heading>
              <Text variant="default">
                {profileData.bio.description}
              </Text>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4 sm:space-y-6">
              <Heading as="h3" className="text-lg sm:text-xl md:text-2xl">Quick Facts</Heading>
              <div className="space-y-3 sm:space-y-4">
                {profileData.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <span className="h-2 w-2 bg-primary flex-shrink-0 mt-2 sm:mt-0" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                      <span className="font-mono font-bold text-headline text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
                        {fact.label}:
                      </span>
                      <Text as="span" variant="small" className="text-sm sm:text-base break-words">
                        {fact.value}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Bento */}
      <Suspense fallback={<div className="py-16 text-center"><div className="font-mono text-xs uppercase tracking-wider text-foreground/40">Loading skills...</div></div>}>
        <ExperienceBento />
      </Suspense>

      {/* Timeline */}
      <Suspense fallback={<div className="py-16 text-center"><div className="font-mono text-xs uppercase tracking-wider text-foreground/40">Loading timeline...</div></div>}>
        <AboutTimeline />
      </Suspense>
    </section>
  );
};

export default AboutSection;
