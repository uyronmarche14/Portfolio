"use client";

import Image from "next/image";
import { useState } from "react";

import HeaderTitle from "@/components/ui/header";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { hobbiesData } from "@/lib/data/hobbies";

const INITIAL_COUNT = 6;

export default function HobbyCarousel() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? hobbiesData : hobbiesData.slice(0, INITIAL_COUNT);

  return (
    <section id="activities" className="relative w-full py-10 sm:py-14">
      <div className="mx-auto mb-8 w-full max-w-6xl px-4 sm:px-6 md:mb-10 lg:px-4">
        <HeaderTitle
          index="03"
          introText="Off Screen"
          highlightText="Activities"
          description="A visual look at the activities, leadership roles, competitions, event work, and campus experiences that shaped me outside the core project list."
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((hobby, i) => {
            const num = String(i + 1).padStart(2, "0");
            const Icon = hobby.icon;
            return (
              <article key={hobby.id} className="flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-foreground/15 bg-foreground/5">
                  {hobby.image ? (
                    <Image
                      src={hobby.image}
                      alt={hobby.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-foreground/40">
                      <Icon className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <p className="mt-3 font-mono text-xs text-foreground/50">
                  {num}
                  {hobby.years ? ` / ${hobby.years}` : ""}
                </p>
                <h3 className="mt-2 font-display text-xl text-foreground md:text-2xl">
                  {hobby.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/70">
                  {hobby.description}
                </p>

                {hobby.tags && hobby.tags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {hobby.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>
                        <Badge variant="outline">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                )}

                {hobby.links && hobby.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-4 text-sm font-medium">
                    {hobby.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target={link.url.startsWith("#") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="text-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {hobbiesData.length > INITIAL_COUNT && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
              {showAll ? "Show fewer" : `Show all ${hobbiesData.length}`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
