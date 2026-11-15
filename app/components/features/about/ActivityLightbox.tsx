"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, type KeyboardEvent } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/shadcn/dialog";
import type { Hobby } from "@/lib/data/hobbies";

interface ActivityLightboxProps {
  /** Only activities that have a photo */
  items: Hobby[];
  openId: string | null;
  onOpenChange: (id: string | null) => void;
}

/** Fullscreen photo viewer: uncropped image, caption, prev/next buttons, arrow keys and Esc. */
export function ActivityLightbox({ items, openId, onOpenChange }: ActivityLightboxProps) {
  const index = items.findIndex((item) => item.id === openId);
  const current = index >= 0 ? items[index] : null;

  const go = useCallback(
    (step: number) => {
      if (items.length === 0 || index < 0) return;
      onOpenChange(items[(index + step + items.length) % items.length].id);
    },
    [index, items, onOpenChange]
  );

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  return (
    <Dialog open={Boolean(current)} onOpenChange={(open) => !open && onOpenChange(null)}>
      <DialogContent
        onKeyDown={onKeyDown}
        className="left-0 top-0 h-dvh w-screen max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-background/95 p-0 sm:rounded-none"
      >
        {current?.image && (
          <div className="flex h-full flex-col">
            <div className="relative min-h-0 flex-1">
              <Image
                key={current.id}
                src={current.image}
                alt={`${current.title}: photo`}
                fill
                priority
                sizes="100vw"
                className="object-contain p-4 sm:p-10"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-foreground/15 px-4 py-4 sm:px-8">
              <div className="min-w-0">
                <DialogTitle className="truncate font-display text-lg text-foreground">{current.title}</DialogTitle>
                <DialogDescription className="mt-1 line-clamp-2 max-w-2xl text-sm text-foreground/70">
                  {current.description}
                </DialogDescription>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="font-mono text-xs text-muted" aria-live="polite">
                  {index + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ActivityLightbox;
