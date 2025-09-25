"use client";

import React from "react";
import { Badge } from '@/components/ui/shadcn/badge';

// import { motion } from "framer-motion";
import RotatingText from '@/components/ui/textChange'
  

import {
  HOME_CONTENT,
  // BACKGROUND_ANIMATIONS,
  // LETTER_ANIMATION,
} from "@/lib/data/homeContent";

const HomeSection: React.FC = () => {
  return (
    <div className="relative flex min-h-screen snap-start flex-col items-center justify-center overflow-hidden">
      {/* Enhanced animated background spots - COMMENTED OUT FOR PERFORMANCE
      {BACKGROUND_ANIMATIONS.map((bg, index) => (
        <motion.div
          key={index}
          className={bg.className}
          animate={bg.animate}
          transition={bg.transition}
          style={bg.style}
        />
      ))}
      */}
      


      <div className="container relative z-10 mx-auto px-4 text-center">
        {/* <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-4xl font-bold leading-tight text-headline md:text-6xl"
        > */}
        <h1 className="mb-4 text-4xl font-bold font-rawkner leading-tight text-headline sm:mb-6 sm:text-5xl md:text-6xl">
          I&apos;m{" "}
          <span className="inline-block text-primary">
            {HOME_CONTENT.name.split("").map((letter, i) => (
              <span key={`letter-${i}`} className="inline-block transition-colors hover:text-secondary">
                {letter}
              </span>
            ))}
          </span>{" "}
          <br className="hidden md:block" />
          <span className="inline-flex flex-col items-center gap-1 pt-2 md:flex-row md:gap-2">
            {HOME_CONTENT.title}
            <RotatingText
              texts={['Developer', '3d Artist', 'Software Engi', 'Project Manager', 'Dev Ops']} 
              mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-xl"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <Badge className="text-xs sm:text-sm md:text-base font-rawkner bg-transparent border border-white text-white hover:shadow-md hover:shadow-primary px-2 py-1 sm:px-3 sm:py-1.5" variant="default">React Dev</Badge>
          <Badge className="text-xs sm:text-sm md:text-base font-rawkner bg-transparent border border-white text-white hover:shadow-md hover:shadow-primary px-2 py-1 sm:px-3 sm:py-1.5" variant="default">Typescript</Badge>
          <Badge className="text-xs sm:text-sm md:text-base font-rawkner bg-transparent border border-white text-white hover:shadow-md hover:shadow-primary px-2 py-1 sm:px-3 sm:py-1.5" variant="default">Python</Badge>
          <Badge className="text-xs sm:text-sm md:text-base font-rawkner bg-transparent border border-white text-white hover:shadow-md hover:shadow-primary px-2 py-1 sm:px-3 sm:py-1.5" variant="default">Figma</Badge>
          <Badge className="text-xs sm:text-sm md:text-base font-rawkner bg-transparent border border-white text-white hover:shadow-md hover:shadow-primary px-2 py-1 sm:px-3 sm:py-1.5" variant="default">Blender</Badge>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-base text-paragraph sm:text-lg md:text-xl">
          {HOME_CONTENT.description}
        </p>
        {/* </motion.p> */}
      </div>
    </div>
  );
};

export default HomeSection;
