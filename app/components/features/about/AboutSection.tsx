"use client";
import React, { lazy, Suspense } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
import { CldImage } from "next-cloudinary";

import HeaderTitle from "@/components/ui/header";


// Lazy load heavy components to reduce initial bundle size
const AboutDoGrid = lazy(() => import("@/components/ui/aboutDo").then(mod => ({ default: mod.AboutDoGrid })));
const AboutTimeline = lazy(() => import("@/components/ui/aboutTimeline"));

// import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { serviceCards } from "@/lib/data/services";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen snap-start justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <div className="relative w-full max-w-6xl rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-4 lg:p-4 backdrop-blur-sm">
        <div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="relative z-10 text-center sm:text-left">         
            <HeaderTitle 
               introText="About "
               highlightText="Me"
               description="Developing Application"
             />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            {/* Profile Info */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <div className="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[550px] overflow-hidden rounded-xl sm:rounded-2xl border-2 border-primary/20 shadow-lg">
                <CldImage
                  src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1754823296/photo_7_2025-08-10_18-53-55_y00lcx.jpg"
                  alt="Profile photo"
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 550px"
                  className="transform rounded-xl object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 order-2 lg:order-2">
            {/* Bio */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="font-rawkner text-xl sm:text-2xl md:text-3xl font-bold text-headline leading-tight">
                Hey there i am
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  Ron Marche Rhyss Q. Uy
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-paragraph">
                I&apos;m a developer who loves building all kinds of
                applications, from web to mobile and beyond. I enjoy creating
                awesome UIs and adding features that make applications feel more
                alive and interactive. I&apos;ve been developing applications
                for two years now, and I&apos;ve learned a lot from my
                experiences. I&apos;m a self-taught developer, and much of my
                knowledge comes from resources available on the internet.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-headline">Quick Facts</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: "Based in", value: "Philippines" },
                  { label: "Education", value: "Computer Science" },
                  { label: "Favorite Tech", value: "React & React Native" },
                  { label: "Learning", value: "Advanced Backend Development" },
                  {
                    label: "Hobbies",
                    value: "Gaming, Learning, Teaching, and Coding",
                  },
                ].map((fact) => (
               
                  <div key={fact.label} className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary flex-shrink-0 mt-2 sm:mt-0"></span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                      <span className="font-medium text-headline text-sm sm:text-base whitespace-nowrap">
                        {fact.label}:
                      </span>
                      <span className="text-paragraph text-sm sm:text-base break-words">
                        {fact.value}
                      </span>
                    </div>
                  </div>
                  // </motion.div>
                ))}
              </div>
            </div>
          {/* </motion.div> */}
          </div>
        </div>

        

        {/* Lazy loaded components with loading states */}
        <Suspense fallback={<div className="py-16 text-center"><div className="animate-pulse text-paragraph">Loading skills...</div></div>}>
          <AboutDoGrid cards={serviceCards} />
        </Suspense>

        <Suspense fallback={<div className="py-16 text-center"><div className="animate-pulse text-paragraph">Loading timeline...</div></div>}>
          <AboutTimeline />
        </Suspense>
      </div>
    </section>
  );
};

export default AboutSection;
