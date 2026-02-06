"use client";
import { CldImage } from "next-cloudinary";
import { lazy, Suspense } from "react";

import HeaderTitle from "@/components/ui/header";
import Heading from "@/components/ui/typography/Heading";
import Text from "@/components/ui/typography/Text";
import { profileData } from "@/lib/data/profile";
import ExperienceBento from "../experience/ExperienceBento";

// Lazy load heavy components to reduce initial bundle size
const AboutDoGrid = lazy(() => import("@/components/ui/aboutDo").then(mod => ({ default: mod.AboutDoGrid })));
const AboutTimeline = lazy(() => import("@/components/ui/timeline/AboutTimeline"));

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex flex-col min-h-screen snap-start justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <div className="relative w-full max-w-6xl mx-auto rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-6 lg:p-8">
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
            {/* Profile Info */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[550px] overflow-hidden rounded-xl sm:rounded-2xl border-2 border-primary/20 shadow-lg">
                {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                    <CldImage
                    src={profileData.photo.src}
                    alt={profileData.photo.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 550px"
                    className="transform rounded-xl object-cover transition-transform duration-700 hover:scale-105"
                    priority
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
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
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-2">
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
              <div className="space-y-3 sm:space-y-4 ">
                {profileData.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary flex-shrink-0 mt-2 sm:mt-0"></span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                      <span className="font-medium text-headline text-sm sm:text-base whitespace-nowrap">
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

        {/* Lazy loaded components with loading states */}
        <Suspense fallback={<div className="py-16 text-center"><div className="animate-pulse text-paragraph">Loading skills...</div></div>}>
          <ExperienceBento />
        </Suspense>
      </div>

      {/* Timeline - Full width accordion with max-w-7xl centered */}
      <Suspense fallback={<div className="py-16 text-center"><div className="animate-pulse text-paragraph">Loading timeline...</div></div>}>
        <AboutTimeline />
      </Suspense>
    </section>
  );
};

export default AboutSection;
