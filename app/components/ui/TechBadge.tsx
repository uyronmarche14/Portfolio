'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiReact, 
  SiPrisma, 
  SiPostgresql, 
  SiMysql, 
  SiFirebase, 
  SiNodedotjs, 
  SiJavascript, 
  SiGooglemaps, 
  SiStripe, 
  SiRedux
} from 'react-icons/si';
import { IconType } from 'react-icons';

const techIconMap: Record<string, IconType> = {
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'TailwindCSS': SiTailwindcss,
  'React': SiReact,
  'Prisma': SiPrisma,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Firebase': SiFirebase,
  'Node.js': SiNodedotjs,
  'JavaScript': SiJavascript,
  'Google Maps API': SiGooglemaps,
  'Stripe API': SiStripe,
  'Redux': SiRedux,
  'C#': SiReact,
  'Java': SiReact,
  'Android Studio': SiReact,
  'WinForms': SiReact,
  'OpenAI API': SiReact,
};

interface TechBadgeProps {
  technology: string;
  index?: number;
}

export default function TechBadge({ technology, index = 0 }: TechBadgeProps) {
  const IconComponent = techIconMap[technology] || SiReact;
  const colors = [
    'bg-primary/10 text-primary border-primary/20',
    'bg-secondary/10 text-secondary border-secondary/20',
    'bg-accent/10 text-accent border-accent/20',
    'bg-primary/20 text-primary-foreground border-primary/30',
    'bg-secondary/20 text-secondary-foreground border-secondary/30',
    'bg-accent/20 text-accent-foreground border-accent/30',
    'bg-primary/30 text-primary-foreground border-primary/40',
    'bg-secondary/30 text-secondary-foreground border-secondary/40',
  ];

  const colorClass = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${colorClass}`}
    >
      <IconComponent size={16} />
      <span>{technology}</span>
    </motion.div>
  );
}