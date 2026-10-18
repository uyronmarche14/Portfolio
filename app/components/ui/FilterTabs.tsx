"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useId, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

export interface FilterTabItem<K extends string = string> {
  key: K;
  label: string;
  count?: number;
  icon?: LucideIcon;
}

interface FilterTabsProps<K extends string> {
  items: FilterTabItem<K>[];
  value: K;
  onChange: (key: K) => void;
  label: string;
  className?: string;
}

/** Segmented tabs with a pill that slides to the active item. */
export function FilterTabs<K extends string>({ items, value, onChange, label, className }: FilterTabsProps<K>) {
  const reduceMotion = useReducedMotion();
  const groupId = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : null;
    if (next === null) return;
    event.preventDefault();
    onChange(items[next].key);
    document.getElementById(`${groupId}-${items[next].key}`)?.focus();
  };

  return (
    <div className={cn("achievement-filter-scroll max-w-full overflow-x-auto pb-2", className)}>
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex min-w-max gap-1 rounded-full border border-foreground/15 bg-foreground/[0.04] p-1"
      >
        {items.map((item, i) => {
          const active = item.key === value;
          return (
            <button
              key={item.key}
              id={`${groupId}-${item.key}`}
              role="tab"
              type="button"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(item.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "text-background" : "text-foreground/70 hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId={`${groupId}-pill`}
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                {item.label}
                {item.count !== undefined && (
                  <span className={cn("ml-1.5 font-mono text-xs", active ? "text-background/60" : "text-foreground/40")}>
                    {item.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
