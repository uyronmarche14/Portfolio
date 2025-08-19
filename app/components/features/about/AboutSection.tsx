"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CldImage } from "next-cloudinary";

import { AboutDoGrid } from "@/components/ui/aboutDo";
import AboutTimeline from "@/components/ui/aboutTimeline";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { serviceCards } from "@/lib/data/services";

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section
      id="about"
      className="relative flex min-h-screen snap-start justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <AnimatedBackground />

      <div className="relative w-full max-w-7xl rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-sm">
        {/* Header Section with enhanced animations */}
        <motion.div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24" style={{ opacity, scale }}>
          {/* Decorative elements - hidden on mobile */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden sm:block absolute -left-3 sm:-left-6 -top-3 sm:-top-6 h-8 w-8 sm:h-12 sm:w-12 rotate-12 rounded-lg bg-primary/20"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-secondary/20"
          />

          {/* Section Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 text-center sm:text-left"
          >
            <span className="mb-2 block text-xs sm:text-sm uppercase tracking-wider text-primary/60">
              About Me
            </span>
            <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-headline leading-tight">
              Developing Application
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Experiences
              </span>
            </h1>
            
            {/* Animated background blobs - reduced size on mobile */}
            <motion.div
              className="absolute h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[300px] md:w-[300px] rounded-full bg-primary/20 blur-3xl -z-10"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ top: "20%", left: "10%" }}
            />
            <motion.div
              className="absolute h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] md:h-[200px] md:w-[200px] rounded-full bg-secondary/20 blur-3xl -z-10"
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ bottom: "20%", right: "10%" }}
            />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2">
          {/* Left Column - Profile Image */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start order-1 lg:order-1"
          >
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
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 rounded-lg bg-primary px-3 py-1.5 sm:px-4 sm:py-2 text-white shadow-lg text-sm sm:text-base"
              >
                Beginner
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-2"
          >
            {/* Bio */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-headline leading-tight">
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
                ].map((fact, index) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start sm:items-center gap-3 sm:gap-4"
                  >
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary flex-shrink-0 mt-2 sm:mt-0"></span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                      <span className="font-medium text-headline text-sm sm:text-base whitespace-nowrap">
                        {fact.label}:
                      </span>
                      <span className="text-paragraph text-sm sm:text-base break-words">
                        {fact.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* After the Technologies section and before Services section 
            - Personal Story 
            - Quick Facts 
        
        <section className="mt-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-background/50 rounded-2xl p-8 border border-primary/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-headline">
                My Journey
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  as a Developer
                </span>
              </h3>
              <div className="space-y-4 text-paragraph">
                <p>
                  My passion for programming began in senior high school. I was
                  fascinated by how applications work and how they can make
                  people&apos;s lives easier.
                </p>
                <p>
                  What drives me is the endless possibility of creating
                  something new and innovative. I love the challenge of solving
                  problems and learning new technologies. During my time at
                  Taguig City University, I served as the Student President
                  (Director) of the Computer Science course, which helped me
                  develop leadership skills and foster a collaborative
                  environment with my peers.
                </p>
                <p>
                  Currently, I&apos;m focused on expanding my knowledge in both
                  web and mobile development, and I enjoy sharing what I&apos;ve
                  learned with others through tutoring and mentorship.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-headline">Quick Facts</h3>
              <div className="space-y-4">
                {[
                  { label: "Based in", value: "Philippines" },
                  { label: "Education", value: "Computer Science" },
                  { label: "Favorite Tech", value: "React & React Native" },
                  { label: "Learning", value: "Advanced Backend Development" },
                  {
                    label: "Hobbies",
                    value: "Gaming, Learning, Teaching, and Coding",
                  },
                ].map((fact, index) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-headline font-medium">
                      {fact.label}:
                    </span>
                    <span className="text-paragraph">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        */}

        <AboutDoGrid cards={serviceCards} />

        <AboutTimeline />
      </div>
    </section>
  );
};

export default AboutSection;
