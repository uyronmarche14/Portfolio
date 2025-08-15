"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { timelineEvents } from "@/lib/data/about";

const AboutTimeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="mt-24 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h3 
            className="text-3xl md:text-4xl font-bold text-headline mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            My{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Journey
            </span>
          </motion.h3>
          <motion.p 
            className="text-paragraph/70 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A timeline of growth, learning, and achievements
          </motion.p>
        </div>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={`${event.year}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative flex items-center mb-16 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-10"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className={`w-4 h-4 rounded-full border-4 border-background transition-all duration-300 ${
                    isHovered ? "bg-primary shadow-lg shadow-primary/50" : "bg-primary/80"
                  }`} />
                </motion.div>

                {/* Content card */}
                <motion.div
                  className={`w-6/12 ${isLeft ? "pr-8" : "pl-8"}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 ${
                    isHovered 
                      ? "bg-primary/5 border border-primary/20 shadow-xl shadow-primary/10" 
                      : "bg-background/80 border border-primary/10 shadow-lg"
                  }`}>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                          isHovered 
                            ? "bg-primary text-background" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {event.year}
                        </span>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-headline mb-2 leading-tight">
                        {event.title}
                      </h4>
                      
                      <p className="text-paragraph/80 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  
                  {/* Connection line to center */}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 w-8 h-px bg-gradient-to-r transition-all duration-300 ${
                    isLeft 
                      ? "right-0 from-primary/30 to-transparent" 
                      : "left-0 from-transparent to-primary/30"
                  } ${isHovered ? "opacity-100" : "opacity-50"}`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* End marker */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Present Day</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutTimeline;