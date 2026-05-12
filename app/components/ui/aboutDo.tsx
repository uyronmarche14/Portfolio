"use client";

import React from "react";
import { motion } from "framer-motion";
import HeaderTitle from "@/components/ui/header";

interface AboutDoCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  skills: string[];
  experience: string;
  highlight: string;
  additionalIcons?: React.ComponentType<{ className?: string }>[];
  index?: number;
}

const AboutDoCard: React.FC<AboutDoCardProps> = ({
  icon: Icon,
  title,
  description,
  skills,
  experience,
  highlight,
  additionalIcons = [],
  index = 0,
}) => {
  return (
    <motion.div
      className="group p-8 bg-background border-2 border-foreground shadow-brutal hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-brutal-lg transition-all duration-150 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
    >
      {/* Content */}
      <div className="relative space-y-6">
        {/* Icon and Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icon className="text-4xl text-primary" />
            {additionalIcons.length > 0 && (
              <div className="flex gap-2 ml-2">
                {additionalIcons.map((AdditionalIcon, idx) => (
                  <AdditionalIcon
                    key={idx}
                    className="text-2xl text-foreground/40 hover:text-primary transition-colors duration-150"
                  />
                ))}
              </div>
            )}
          </div>
          <h4 className="text-xl font-bold font-rawkner text-foreground uppercase">{title}</h4>
        </div>

        {/* Description */}
        <p className="text-foreground/60 text-sm leading-relaxed">{description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[10px] px-2 py-1 bg-primary/10 text-primary border border-primary/30 font-mono font-bold uppercase tracking-wider"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Experience and Highlight */}
        <div className="pt-4 border-t-2 border-foreground/20 space-y-2">
          <p className="text-sm text-foreground/60 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">{experience}</span>
          </p>
          <p className="text-sm text-foreground/40 italic">
            &quot;{highlight}&quot;
          </p>
        </div>
      </div>
    </motion.div>
  );
};

interface AboutDoGridProps {
  cards: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    skills: string[];
    experience: string;
    highlight: string;
    additionalIcons?: React.ComponentType<{ className?: string }>[];
  }>;
  title?: string;
  subtitle?: string;
}

export const AboutDoGrid: React.FC<AboutDoGridProps> = ({
  cards,
}) => {
  return (
    <section className="mt-24">
      <div className="text-center mb-16">
          <HeaderTitle 
            introText="About"
            highlightText="My Experiences"
            description="Your nonstop to experience everything"
          />
         
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <AboutDoCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default AboutDoCard;
