"use client";

import React from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  // Add animation variants for letters
  const letterAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  };

  const name = "Rhyss".split("");

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
        {/* Enhanced animated background spots */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-[100px]"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ top: "20%", left: "15%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-l from-secondary/30 to-primary/30 blur-[80px]"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
            scale: [1, 0.8, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ bottom: "20%", right: "15%" }}
        />
        {/* Additional floating light spot */}
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 blur-[60px]"
          animate={{
            x: [0, 70, -70, 0],
            y: [0, -70, 70, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-headline leading-tight mb-6"
          >
            I&apos;m{" "}
            <span className="text-primary inline-block">
              {name.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterAnimation}
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
              My Journey To Be A Developer.
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-paragraph max-w-2xl mx-auto"
          >
            I&apos;m a backend, frontend, and mobile developer with a passion
            for data and a love for learning new things related to technology.
          </motion.p>
        </div>
      </section>

      {/* Update work section background to be more consistent */}
    </>
  );
};

export default Home;
