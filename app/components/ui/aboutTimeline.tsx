"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { timelineYears } from "@/lib/data/about";

const AboutTimeline = () => {
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section className="mt-16 md:mt-24 mb-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto min-h-screen"
      >
        <div className="text-center mb-12 md:mb-16">
          <motion.h3 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-headline mb-4"
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
            className="text-paragraph/70 max-w-md mx-auto text-sm sm:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A timeline of growth, learning, and achievements
          </motion.p>
        </div>

        <div className="relative min-h-[800px]">
          {/* Central line - Desktop only */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
          
          {timelineYears.map((yearData, yearIndex) => {
            const isLeft = yearIndex % 2 === 0;
            const isYearHovered = hoveredYear === yearData.year;
            
            return (
              <motion.div
                key={yearData.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: yearIndex * 0.1, duration: 0.6 }}
                className={`relative mb-12 md:mb-16 lg:mb-20`}
                onMouseEnter={() => setHoveredYear(yearData.year)}
                onMouseLeave={() => setHoveredYear(null)}
              >
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-start gap-4">
                    {/* Mobile timeline dot */}
                    <motion.div
                      className="flex-shrink-0 mt-2"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 border-background transition-all duration-300 ${
                        isYearHovered ? "bg-primary shadow-lg shadow-primary/50" : "bg-primary/80"
                      }`} />
                    </motion.div>
                    
                    {/* Mobile content */}
                    <div className="flex-1">
                      {/* Year header */}
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-base font-bold transition-all duration-300 ${
                          isYearHovered 
                            ? "bg-primary text-background shadow-lg" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {yearData.year}
                        </span>
                      </div>

                      {/* Features list */}
                      <div className="space-y-3">
                        {yearData.features.map((feature, featureIndex) => {
                          const featureKey = `${yearData.year}-${featureIndex}`;
                          const isFeatureHovered = hoveredFeature === featureKey;
                          
                          return (
                            <motion.div
                              key={featureKey}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: (yearIndex * 0.1) + (featureIndex * 0.05) }}
                              className={`relative overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-300 min-h-[80px] ${
                                isFeatureHovered 
                                  ? "bg-primary/5 border border-primary/20 shadow-lg shadow-primary/10" 
                                  : "bg-background/80 border border-primary/10 shadow-md"
                              }`}
                              onMouseEnter={() => setHoveredFeature(featureKey)}
                              onMouseLeave={() => setHoveredFeature(null)}
                            >
                              <div className="p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-start gap-2 flex-1 min-w-0">
                                    <div className={`mt-1 w-1.5 h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                                      isFeatureHovered ? "bg-primary" : "bg-primary/60"
                                    }`} />
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-semibold text-headline mb-1 leading-tight break-words">
                                        {feature.title}
                                      </h4>
                                    </div>
                                  </div>
                                  
                                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium transition-all duration-300 flex-shrink-0 ml-2 ${
                                    isFeatureHovered 
                                      ? "bg-primary text-background" 
                                      : "bg-primary/10 text-primary"
                                  }`}>
                                    {yearData.year}
                                  </span>
                                </div>
                                
                                <div className="ml-3.5">
                                  <p className="text-paragraph/80 text-xs leading-relaxed break-words">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-start">
                  {/* Desktop timeline dot */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={`w-6 h-6 rounded-full border-4 border-background transition-all duration-300 ${
                      isYearHovered ? "bg-primary shadow-lg shadow-primary/50" : "bg-primary/80"
                    }`} />
                  </motion.div>

                  {/* Desktop content */}
                  <motion.div
                    className={`w-6/12 ${isLeft ? "pr-8" : "pl-8 ml-auto"}`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Desktop Year header */}
                    <div className={`mb-6 ${isLeft ? "text-right" : "text-left"}`}>
                      <span className={`inline-block px-4 py-2 rounded-full text-lg font-bold transition-all duration-300 ${
                        isYearHovered 
                          ? "bg-primary text-background shadow-lg" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        {yearData.year}
                      </span>
                    </div>

                    {/* Desktop Features list */}
                    <div className="space-y-4">
                      {yearData.features.map((feature, featureIndex) => {
                        const featureKey = `${yearData.year}-${featureIndex}`;
                        const isFeatureHovered = hoveredFeature === featureKey;
                        
                        return (
                          <motion.div
                            key={featureKey}
                            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (yearIndex * 0.1) + (featureIndex * 0.05) }}
                            className={`relative overflow-hidden rounded-lg backdrop-blur-sm transition-all duration-300 min-h-[80px] ${
                              isFeatureHovered 
                                ? "bg-primary/5 border border-primary/20 shadow-lg shadow-primary/10" 
                                : "bg-background/80 border border-primary/10 shadow-md"
                            }`}
                            onMouseEnter={() => setHoveredFeature(featureKey)}
                            onMouseLeave={() => setHoveredFeature(null)}
                          >
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  <div className={`mt-1.5 w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                                    isFeatureHovered ? "bg-primary" : "bg-primary/60"
                                  }`} />
                                  
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-base font-semibold text-headline mb-1 leading-tight break-words">
                                      {feature.title}
                                    </h4>
                                  </div>
                                </div>
                                
                                <span className={`px-2 py-1 rounded text-xs font-medium transition-all duration-300 flex-shrink-0 ml-2 ${
                                  isFeatureHovered 
                                    ? "bg-primary text-background" 
                                    : "bg-primary/10 text-primary"
                                }`}>
                                  {yearData.year}
                                </span>
                              </div>
                              
                              <div className="ml-5">
                                <p className="text-paragraph/80 text-sm leading-relaxed break-words">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Connection line to center */}
                    <div className={`absolute top-8 transform -translate-y-1/2 w-8 h-px bg-gradient-to-r transition-all duration-300 ${
                      isLeft 
                        ? "right-0 from-primary/30 to-transparent" 
                        : "left-0 from-transparent to-primary/30"
                    } ${isYearHovered ? "opacity-100" : "opacity-50"}`} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* End marker */}
        <motion.div
          className="text-center mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-primary">Present Day</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutTimeline;