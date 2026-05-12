"use client";

import HeaderTitle from "@/components/ui/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { timelineYears } from "@/lib/data/about";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

const TimelineRow = ({ year, title }: { year: string; title: string }) => {
  return (
    <div className="flex items-center justify-between w-full py-3 sm:py-4 cursor-pointer group">
      {/* Year */}
      <span className="font-rawkner text-sm sm:text-lg md:text-xl font-bold text-foreground/50 group-hover:text-foreground transition-colors duration-150 w-14 sm:w-20 md:w-28 shrink-0">
        {year}
      </span>

      {/* Title */}
      <span className="flex-1 font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider text-foreground/50 group-hover:text-foreground transition-colors duration-150 line-clamp-1 truncate">
        {title}
      </span>

      {/* Indicator */}
      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/20 group-hover:text-primary transition-colors duration-150 shrink-0 ml-2 sm:ml-4" />
    </div>
  );
};

const AboutTimeline = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mb-8 sm:mb-12 md:mb-16"
      >
        <HeaderTitle 
          introText="My"  
          highlightText="Journey"
          description="A timeline of growth, learning, and achievements"
        />
      </motion.div>

      {/* Timeline Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {timelineYears.map((yearData, index) => {
          const headerTitle = yearData.features[0]?.title || yearData.year;
          
          return (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
            <AccordionItem
                value={yearData.year}
                className="border-b-2 border-foreground/20 hover:border-foreground/40 transition-colors duration-150"
              >
                <AccordionTrigger className="hover:no-underline py-0 [&>svg]:hidden">
                  <TimelineRow year={yearData.year} title={headerTitle} />
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-2 border-foreground/20 bg-foreground/5 p-4 sm:p-5 md:p-6"
                  >
                    {/* Features */}
                    <div className="space-y-4 sm:space-y-5">
                      {yearData.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                          className="group/feature"
                        >
                          <div className="flex gap-3 sm:gap-4">
                            {/* Accent Line */}
                            <div className="flex flex-col items-center pt-1 sm:pt-1.5">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary" />
                              {i < yearData.features.length - 1 && (
                                <div className="w-px flex-1 bg-primary/30 mt-1.5 sm:mt-2" />
                              )}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 pb-3 sm:pb-4">
                              <h4 className="text-foreground font-bold font-rawkner text-sm sm:text-base md:text-lg mb-1 sm:mb-2 group-hover/feature:text-primary transition-colors duration-150 uppercase">
                                {feature.title}
                              </h4>
                              <p className="text-foreground/60 text-xs sm:text-sm md:text-base leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AboutTimeline;
