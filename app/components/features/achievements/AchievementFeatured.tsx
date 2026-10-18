"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { categoryFilters, type Achievement } from "@/lib/data/achievements";

import { categoryIcons } from "./categoryIcons";

interface AchievementFeaturedProps {
  item: Achievement;
  onOpen: (id: string) => void;
}

/** Large highlight card for the most important achievement. */
export function AchievementFeatured({ item, onOpen }: AchievementFeaturedProps) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;
  const CategoryIcon = categoryIcons[item.category];
  const categoryLabel = categoryFilters.find((f) => f.key === item.category)?.label;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid overflow-hidden rounded-2xl border border-foreground/15 bg-card md:min-h-[400px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
    >
      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-14">
        <Badge variant="accent" className="w-fit">
          {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />}
          {categoryLabel}
        </Badge>
        <p className="font-mono text-xs text-foreground/60">
          {item.date} <span className="mx-1 text-foreground/30">/</span> {item.issuer}
        </p>
        <h3 className="font-display text-3xl text-foreground lg:text-4xl">{item.title}</h3>
        <p className="max-w-md text-base leading-relaxed text-foreground/80">{item.description}</p>
        {item.impact && (
          <p className="max-w-md border-l border-primary/40 pl-3 text-sm italic text-foreground/60">
            {item.impact}
          </p>
        )}
        {item.tags && (
          <ul className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="default">{tag}</Badge>
              </li>
            ))}
          </ul>
        )}
        <div className="pt-2">
          <Button variant="outline" onClick={() => onOpen(item.id)}>
            View details
          </Button>
        </div>
      </div>

      <div className="relative min-h-[300px] md:min-h-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-foreground/30">
            <Icon className="h-16 w-16" aria-hidden="true" />
          </div>
        )}
      </div>
    </motion.article>
  );
}
