"use client";

import React from "react";
import { motion } from "framer-motion";
import { BACKGROUND_ANIMATIONS, BACKGROUND_TRANSITIONS } from "@/data/animatedBackground";

const AnimatedBackground = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Large blur elements */}
    <motion.div
      animate={BACKGROUND_ANIMATIONS.blur1}
      transition={BACKGROUND_TRANSITIONS.slow}
      className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
    />
    <motion.div
      animate={BACKGROUND_ANIMATIONS.blur2}
      transition={BACKGROUND_TRANSITIONS.medium}
      className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-secondary/10 to-tertiary/10 rounded-full blur-3xl"
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-tertiary/5 rounded-full blur-3xl" />

    {/* Floating decorative elements */}
    <motion.div
      animate={BACKGROUND_ANIMATIONS.float1}
      transition={BACKGROUND_TRANSITIONS.fast}
      className="absolute top-32 right-20 w-8 h-8 border-2 border-primary/20 rounded-lg rotate-12"
    />
    <motion.div
      animate={BACKGROUND_ANIMATIONS.float2}
      transition={BACKGROUND_TRANSITIONS.slowFloat}
      className="absolute bottom-32 left-20 w-6 h-6 border-2 border-secondary/20 rounded-full"
    />
  </div>
));

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;