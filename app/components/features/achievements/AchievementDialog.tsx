"use client";

import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { KeyboardEvent } from "react";

import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { categoryFilters, type Achievement } from "@/lib/data/achievements";

import { categoryIcons } from "./categoryIcons";

interface AchievementDialogProps {
  items: Achievement[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}

/** Detail view for one achievement, with previous/next inside the current list. */
export function AchievementDialog({ items, openId, onOpenChange }: AchievementDialogProps) {
  const index = items.findIndex((item) => item.id === openId);
  const item = index >= 0 ? items[index] : null;

  const go = (step: number) => {
    if (!items.length || index < 0) return;
    onOpenChange(items[(index + step + items.length) % items.length].id);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  const Icon = item?.icon;
  const CategoryIcon = item ? categoryIcons[item.category] : undefined;
  const categoryLabel = item ? categoryFilters.find((f) => f.key === item.category)?.label : "";

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && onOpenChange(null)}>
      <DialogContent
        onKeyDown={onKeyDown}
        className="max-h-[90vh] max-w-3xl gap-0 overflow-y-auto rounded-2xl p-0"
      >
        {item && Icon && (
          <>
            <div className="relative aspect-[16/9] w-full bg-foreground/5">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-foreground/30">
                  <Icon className="h-16 w-16" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <Badge variant="accent">
                {CategoryIcon && <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                {categoryLabel}
              </Badge>
              <div>
                <DialogTitle className="font-display text-3xl text-foreground">{item.title}</DialogTitle>
                <p className="mt-1 font-mono text-xs text-foreground/60">
                  {item.date} <span className="mx-1 text-foreground/30">/</span> {item.issuer}
                </p>
              </div>
              <DialogDescription className="text-base leading-relaxed text-foreground/80">
                {item.description}
              </DialogDescription>
              {item.impact && (
                <p className="border-l border-primary/40 pl-3 text-sm italic text-foreground/60">{item.impact}</p>
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
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {item.certificateUrl ? (
                  <Button asChild variant="accent">
                    <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      View certificate
                    </a>
                  </Button>
                ) : (
                  <span />
                )}
                {items.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-foreground/50">
                      {index + 1} / {items.length}
                    </span>
                    <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Previous achievement">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Next achievement">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
