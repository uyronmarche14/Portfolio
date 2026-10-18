"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/shadcn/badge";
import { categoryFilters, type Achievement } from "@/lib/data/achievements";

import { categoryIcons } from "./categoryIcons";

interface AchievementLedgerProps {
  items: Achievement[];
  /** changes when the filter changes so rows replay their entrance */
  listKey: string;
  onOpen: (id: string) => void;
}

/** Compact, scannable rows: thumbnail, full title, issuer, category and date. */
export function AchievementLedger({ items, listKey, onOpen }: AchievementLedgerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul key={listKey} className="divide-y divide-foreground/10 border-y border-foreground/10">
      {items.map((item, i) => {
        const Icon = item.icon;
        const CategoryIcon = categoryIcons[item.category];
        const categoryLabel = categoryFilters.find((f) => f.key === item.category)?.label;
        return (
          <motion.li
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => onOpen(item.id)}
              className="group grid w-full grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 rounded-lg px-2 py-4 text-left transition-colors duration-200 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[3rem_minmax(0,1fr)_11rem_5rem_1.5rem] sm:px-3"
            >
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-foreground/15 bg-foreground/5 text-foreground/50">
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                ) : (
                  <Icon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-base font-medium text-foreground">{item.title}</span>
                <span className="mt-0.5 block text-sm text-foreground/60">{item.issuer}</span>
              </span>
              <span className="hidden sm:block">
                <Badge variant="default">
                  {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                  {categoryLabel}
                </Badge>
              </span>
              <span className="font-mono text-xs text-foreground/50 sm:text-right">{item.date}</span>
              <ArrowUpRight
                className="hidden h-4 w-4 text-foreground/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transition-none sm:block"
                aria-hidden="true"
              />
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
