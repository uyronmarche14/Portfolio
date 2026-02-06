"use client";

import HeaderTitle from "@/components/ui/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { timelineYears } from "@/lib/data/about";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";

// Color accents for expanded content
const yearColors = [
  "from-primary/20 to-secondary/10",
  "from-secondary/20 to-accent/10", 
  "from-accent/20 to-primary/10",
  "from-primary/15 to-accent/15",
  "from-secondary/15 to-primary/15",
  "from-accent/15 to-secondary/15",
  "from-primary/20 to-secondary/10",
];

const TimelineRow = ({ year, title }: { year: string; title: string }) => {
  return (
    <div className="flex items-center justify-between w-full py-3 sm:py-4 cursor-pointer group">
      {/* Year - Clean typography */}
      <span className="font-rawkner text-sm sm:text-lg md:text-xl font-bold text-paragraph group-hover:text-foreground transition-colors duration-300 w-14 sm:w-20 md:w-28 shrink-0">
        {year}
      </span>

      {/* Title - Simple text */}
      <span className="flex-1 text-xs sm:text-base md:text-lg font-medium text-paragraph group-hover:text-foreground transition-colors duration-300 line-clamp-1 truncate">
        {title}
      </span>

      {/* Indicator - Minimal dots */}
      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-paragraph/40 group-hover:text-primary transition-colors duration-300 shrink-0 ml-2 sm:ml-4" />
    </div>
  );
};

const AboutTimeline = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 sm:py-16 md:py-24 px-2 sm:px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 sm:mb-12 md:mb-16"
      >
        <HeaderTitle 
          introText="My"  
          highlightText="Journey"
          description="A timeline of growth, learning, and achievements"
        />
      </motion.div>

      {/* Timeline Accordion - Clean borders */}
      <Accordion type="single" collapsible className="w-full">
        {timelineYears.map((yearData, index) => {
          const headerTitle = yearData.features[0]?.title || yearData.year;
          const colorClass = yearColors[index % yearColors.length];
          
          return (
            <motion.div
              key={yearData.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
            <AccordionItem
                value={yearData.year}
                className="border-b border-border/30 hover:border-border/50 transition-colors duration-300"
              >
                <AccordionTrigger className="hover:no-underline py-0 [&>svg]:hidden">
                  <TimelineRow year={yearData.year} title={headerTitle} />
                </AccordionTrigger>
                <AccordionContent className="pt-3 sm:pt-4 pb-4 sm:pb-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 bg-gradient-to-br border border-border/10",
                      colorClass
                    )}
                  >
                    {/* Features Grid */}
                    <div className="space-y-4 sm:space-y-5">
                      {yearData.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="group/feature"
                        >
                          {/* Feature Card */}
                          <div className="flex gap-3 sm:gap-4">
                            {/* Accent Line */}
                            <div className="flex flex-col items-center pt-1 sm:pt-1.5">
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary shadow-sm shadow-primary/50" />
                              {i < yearData.features.length - 1 && (
                                <div className="w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent mt-1.5 sm:mt-2" />
                              )}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 pb-3 sm:pb-4">
                              <h4 className="text-foreground font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 group-hover/feature:text-primary transition-colors duration-300">
                                {feature.title}
                              </h4>
                              <p className="text-paragraph/80 text-xs sm:text-sm md:text-base leading-relaxed">
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
