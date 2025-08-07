"use client";

import React from "react";
import { motion } from "framer-motion";

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
      className="group p-8 rounded-2xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
                    className="text-2xl text-paragraph/60 hover:text-primary transition-colors"
                  />
                ))}
              </div>
            )}
          </div>
          <h4 className="text-xl font-bold text-headline">{title}</h4>
        </div>

        {/* Description */}
        <p className="text-paragraph text-sm leading-relaxed">{description}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Experience and Highlight */}
        <div className="pt-4 border-t border-primary/10 space-y-2">
          <p className="text-sm text-paragraph flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/60" />
            {experience}
          </p>
          <p className="text-sm text-paragraph/80 italic">
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
  title = "Experiences",

  subtitle,
}) => {
  return (
    <section className="mt-24">
      <motion.h2
        className="text-3xl font-extrabold text-headline mb-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {title}
        {subtitle && (
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {" "}
            {subtitle}
          </span>
        )}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <AboutDoCard key={card.title} {...card} index={index} />
        ))}
      </div>
    </section>
  );
};

export default AboutDoCard;
