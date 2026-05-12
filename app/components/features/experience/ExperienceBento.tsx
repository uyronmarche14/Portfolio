"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import HeaderTitle from "@/components/ui/header";
import { BrutalistCornerPattern } from "@/components/ui/accents/BrutalistCornerPattern";
import { workExperience } from "@/lib/data/workExperience";
import { Briefcase, Code, Laptop, Smartphone } from "lucide-react";

const roleIcons = {
  freelance: <Briefcase className="h-5 w-5 text-primary" />,
  aique: (
    <div className="flex gap-2">
      <Code className="h-4 w-4 text-primary" />
      <Laptop className="h-4 w-4 text-primary" />
    </div>
  ),
  beyondgen: (
    <div className="flex gap-2">
      <Briefcase className="h-4 w-4 text-primary" />
      <Code className="h-4 w-4 text-primary" />
    </div>
  ),
  keepitsimpleos: (
    <div className="flex gap-2">
      <Smartphone className="h-4 w-4 text-primary" />
      <Laptop className="h-4 w-4 text-primary" />
    </div>
  ),
  buildfast: (
    <div className="flex gap-2">
      <Code className="h-4 w-4 text-primary" />
      <Briefcase className="h-4 w-4 text-primary" />
    </div>
  ),
} as const;

const cornerVariants = [
  "confetti",
  "geometric",
  "waves",
  "crosshairs",
  "confetti",
] as const;

const ExperienceBento = () => {
  const items = workExperience.map((entry, index) => ({
    title: entry.role,
    description: (
      <div className="flex h-full flex-col justify-end gap-3">
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary/80">
            {entry.company}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground/60">
            {entry.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {entry.stack.map((tag) => (
            <span
              key={tag}
              className="border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-2 border-t-2 border-foreground/20 pt-2">
          <div className="mb-1 flex items-center gap-2">
            <span className="h-2 w-2 bg-primary" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
              {entry.dateRange}
            </span>
          </div>
          <p className="text-[10px] italic text-foreground/50">
            &quot;{entry.highlight}&quot;
          </p>
        </div>
      </div>
    ),
    header: (
      <div className="group/header relative h-full w-full overflow-hidden bg-foreground/5">
        <div
          className="absolute inset-0 scale-100 bg-cover bg-center grayscale transition-all duration-300 group-hover/bento:scale-105 group-hover/bento:grayscale-0"
          style={{ backgroundImage: `url('${entry.image}')` }}
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover/bento:opacity-100" />
        <BrutalistCornerPattern
          variant={cornerVariants[index % cornerVariants.length]}
          className="top-0 right-0 origin-top-right text-primary opacity-90 transition-transform duration-300 group-hover/bento:scale-110"
        />
      </div>
    ),
    icon: roleIcons[entry.id as keyof typeof roleIcons] || (
      <Briefcase className="h-5 w-5 text-primary" />
    ),
    className:
      index === workExperience.length - 1
        ? "sm:col-span-2 lg:col-span-2"
        : "sm:col-span-1 lg:col-span-1",
  }));

  return (
    <div id="experience" className="relative w-full py-10 sm:py-16 md:py-20">
      <div className="mx-auto mb-8 max-w-6xl px-4 sm:mb-12 sm:px-6 md:mb-16 lg:px-4">
        <HeaderTitle
          introText="Resume-Backed"
          highlightText="Experience"
          description="My work history is prioritized from the updated resume first, then adapted into clearer portfolio summaries for the roles, systems, and product environments I’ve worked in."
        />
      </div>
      <BentoGrid className="max-w-6xl lg:grid-cols-2">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default ExperienceBento;
