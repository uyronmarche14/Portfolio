"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import profile from "../../public/images/ronron.jpg";
import { serviceCards } from "../data/services";
import { technologies } from "../data/about";
import AboutTimeline from "./ui/aboutTimeline";
import { getTechIcon } from "../utils/techIcons";
import AnimatedBackground from "./AnimatedBackground";
import { AboutDoGrid } from "./ui/aboutDo";

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section id="about" className="bg-background min-h-screen py-16 px-4 flex justify-center relative overflow-hidden snap-start">
      <AnimatedBackground />

      <div className="relative max-w-7xl w-full rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        {/* Header Section with enhanced animations */}
        <motion.div className="relative mb-24" style={{ opacity, scale }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rounded-lg rotate-12"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -bottom-4 -right-4 w-8 h-8 bg-secondary/20 rounded-full"
          />

          {/* Section Title */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10"
          >
            <span className="text-primary/60 uppercase tracking-wider text-sm mb-2 block">
              About Me
            </span>
            <h1 className="text-5xl font-bold text-headline mb-6">
              Developing Application
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Experiences
              </span>
            </h1>
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl"
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
              className="absolute w-[200px] h-[200px] rounded-full bg-secondary/20 blur-3xl"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start"
          >
            {/* Profile Info */}
            <div className="relative">
              <div className="w-[550px] h-[400px] rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg">
                <Image
                  src={profile}
                  alt="Profile photo"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg"
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
              <p className="text-paragraph text-lg leading-relaxed">
                I&apos;m a developer who loves building all kinds of applications,
                from web to mobile and beyond. I enjoy creating awesome UIs and
                adding features that make applications feel more alive and
                interactive. I&apos;ve been developing applications for two years
                now, and I&apos;ve learned a lot from my experiences. I&apos;m a
                self-taught developer, and much of my knowledge comes from
                resources available on the internet.
              </p>
            </div>

            {/* Skills (No More Percentages) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-headline">
                Technologies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                    className="p-3 rounded-lg border border-primary/10 hover:border-primary/30 bg-background/50 shadow-sm flex items-center justify-center gap-2 text-base font-medium text-headline transition-all hover:scale-105"
                  >
                    {(() => {
                      const iconData = getTechIcon(tech.iconName);
                      if (!iconData) return null;
                      const IconComponent = iconData.icon;
                      return <IconComponent className="w-4 h-4" color={iconData.color} />;
                    })()}
                    {tech.name}
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* After the Technologies section and before Services section */}
        <section className="mt-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-background/50 rounded-2xl p-8 border border-primary/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Personal Story */}
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

            {/* Quick Facts */}
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

        <AboutDoGrid cards={serviceCards} />

        <AboutTimeline />
      </div>
    </section>
  );
};

export default AboutSection;