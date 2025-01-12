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
        {/* Animated background spots */}
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
              My Journey Of Development.
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl text-paragraph max-w-2xl mx-auto"
          >
            I&apos;m a backend, frontend, and mobile developer with a passion
            for data and a love for learning new things related to technology
          </motion.p>
        </div>
      </section>

      {/* Update work section background to be more consistent */}
      <section
        id="works"
        className="bg-background/95 backdrop-blur-sm py-16 md:py-20 relative"
      >
        {/* Add subtle background spot for works section */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-10 text-headline"
          >
            My Recent Works
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-background border border-paragraph/20 rounded-xl overflow-hidden hover:border-primary transition-colors duration-300 p-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-headline">
                  Project {index}
                </h3>
                <p className="text-paragraph">
                  Minimal design solution focusing on user experience.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
