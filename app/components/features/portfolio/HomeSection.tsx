"use client";

import React from "react";
import { motion } from "framer-motion";

import {
  HOME_CONTENT,
  BACKGROUND_ANIMATIONS,
  LETTER_ANIMATION,
} from "@/lib/data/homeContent";

const HomeSection: React.FC = () => {
  return (
    <div className="relative flex min-h-screen snap-start flex-col items-center justify-center overflow-hidden">
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

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-4xl font-bold leading-tight text-headline md:text-6xl"
        >
          I&apos;m{" "}
          <span className="inline-block text-primary">
            {HOME_CONTENT.name.split("").map((letter, i) => (
              <motion.span
                key={`letter-${i}`}
                custom={i}
                variants={LETTER_ANIMATION}
                initial="initial"
                animate="animate"
                className="inline-block transition-colors hover:text-secondary"
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
          className="mx-auto mt-4 max-w-2xl text-lg text-paragraph md:text-xl"
        >
          {HOME_CONTENT.description}
        </motion.p>
      </div>
    </div>
  );
};

export default HomeSection;
