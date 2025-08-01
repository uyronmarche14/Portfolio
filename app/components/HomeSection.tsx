"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOME_CONTENT, BACKGROUND_ANIMATIONS, LETTER_ANIMATION } from "../data/homeContent";

const HomeSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden snap-start">
      {/* Enhanced animated background spots */}
      {BACKGROUND_ANIMATIONS.map((bg, index) => (
        <motion.div
          key={index}
          className={bg.className}
          animate={bg.animate}
          transition={bg.transition}
          style={bg.style}
        />
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl md:text-6xl font-bold text-headline leading-tight mb-6"
        >
          I&apos;m{" "}
            <span className="text-primary inline-block">
              {HOME_CONTENT.name.split("").map((letter, i) => (
                <motion.span
                  key={`letter-${i}`}
                  custom={i}
                  variants={LETTER_ANIMATION}
                  initial="initial"
                  animate="animate"
                  className="inline-block hover:text-secondary transition-colors"
                >
                  {letter}
                </motion.span>
              ))}
            </span>{" "}
            <br className="hidden md:block" />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {HOME_CONTENT.title}
            </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-paragraph max-w-2xl mx-auto"
        >
          {HOME_CONTENT.description}
        </motion.p>
      </div>
    </section>
  );
};

export default HomeSection;