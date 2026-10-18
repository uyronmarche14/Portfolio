"use client";

import Image from "next/image";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/shadcn/dialog";

interface PhotoThumbProps {
  src: string;
  label: string;
}

/** Small round photo that previews larger on hover and opens full size on click. */
export function PhotoThumb({ src, label }: PhotoThumbProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group/thumb relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View photo from ${label}`}
        className="relative block h-11 w-11 overflow-hidden rounded-full border border-foreground/15 bg-foreground/5 transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-card"
      >
        <Image src={src} alt="" fill sizes="44px" className="object-cover" />
      </button>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-full z-20 mt-3 hidden aspect-[4/3] w-64 origin-top-left scale-95 overflow-hidden rounded-xl border border-foreground/15 bg-card opacity-0 shadow-soft-lg transition duration-200 ease-out group-hover/thumb:scale-100 group-hover/thumb:opacity-100 group-focus-within/thumb:scale-100 group-focus-within/thumb:opacity-100 motion-reduce:transition-none md:block"
      >
        <Image src={src} alt="" fill sizes="256px" className="object-cover" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-hidden rounded-2xl p-2">
          <DialogTitle className="sr-only">{label}</DialogTitle>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image src={src} alt={`Photo from ${label}`} fill sizes="(max-width: 768px) 95vw, 768px" className="object-cover" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
