"use client";

import React from "react";
import { motion } from "framer-motion";
import { timelineEvents } from "@/lib/data/about";

const AboutTimeline = () => {
  return (
    <section className="mt-24 mb-8">
      <motion.div
        className="bg-background/50 rounded-2xl p-8 border border-primary/10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-headline mb-8">
          My Timeline
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {" "}
            Journey
          </span>
        </h3>

        <div className="relative border-l-2 border-primary/20 ml-4">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={`${event.year}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="mb-8 ml-6 relative cursor-pointer"
            >
              <div className="absolute -left-[2.2rem] w-4 h-4 rounded-full bg-primary border-4 border-background" />
              <div className="flex flex-col gap-1">
                <span className="text-primary font-bold">{event.year}</span>
                <h4 className="text-headline font-semibold">
                  {event.title}
                </h4>
                <p className="text-paragraph text-sm">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTimeline;