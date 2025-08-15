"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { serviceCards } from "@/lib/data/services";
import AboutTimeline from "@/components/ui/aboutTimeline";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { AboutDoGrid } from "@/components/ui/aboutDo";
import { CldImage } from "next-cloudinary";

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section
      id="about"
      className="relative flex min-h-screen snap-start justify-center overflow-hidden bg-background px-4 py-16"
    >
      <AnimatedBackground />

      <div className="relative w-full max-w-7xl rounded-2xl p-8 backdrop-blur-sm md:p-12">
        {/* Header Section with enhanced animations */}
        <motion.div className="relative mb-24" style={{ opacity, scale }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -left-6 -top-6 h-12 w-12 rotate-12 rounded-lg bg-primary/20"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-4 -right-4 h-8 w-8 rounded-full bg-secondary/20"
          />

          {/* Section Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10"
          >
            <span className="mb-2 block text-sm uppercase tracking-wider text-primary/60">
              About Me
            </span>
            <h1 className="mb-6 text-5xl font-bold text-headline">
              Developing Application
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Experiences
              </span>
            </h1>
            <motion.div
              className="absolute h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ top: "20%", left: "15%" }}
            />
            <motion.div
              className="absolute h-[200px] w-[200px] rounded-full bg-secondary/20 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{ bottom: "20%", right: "15%" }}
            />
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Column */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start"
          >
            {/* Profile Info */}
            <div className="relative">
              <div className="h-[400px] w-[550px] overflow-hidden rounded-2xl border-2 border-primary/20 shadow-lg">
                <CldImage
                  src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1754823296/photo_7_2025-08-10_18-53-55_y00lcx.jpg"
                  alt="Profile photo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transform rounded-xl object-cover transition-transform duration-700 hover:scale-105 "
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 rounded-lg bg-primary px-4 py-2 text-white shadow-lg"
              >
                Beginner
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-headline">
                Hey there i am
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  Ron Marche Rhyss Q. Uy
                </span>
              </h2>
              <p className="text-lg leading-relaxed text-paragraph">
                I&apos;m a developer who loves building all kinds of
                applications, from web to mobile and beyond. I enjoy creating
                awesome UIs and adding features that make applications feel more
                alive and interactive. I&apos;ve been developing applications
                for two years now, and I&apos;ve learned a lot from my
                experiences. I&apos;m a self-taught developer, and much of my
                knowledge comes from resources available on the internet.
              </p>
            </div>

            {/* Skills (No More Percentages) */}
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
                    <span className="h-2 w-2 rounded-full bg-primary"></span>
                    <span className="font-medium text-headline">
                      {fact.label}:
                    </span>
                    <span className="text-paragraph">{fact.value}</span>
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
