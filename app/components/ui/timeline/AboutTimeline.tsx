"use client";

import HeaderTitle from "@/components/ui/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { timelineYears } from "@/lib/data/about";
import { Plus } from "lucide-react";

const TimelineRow = ({ year, title }: { year: string; title: string }) => {
  return (
    <div className="flex w-full items-center gap-4 py-4 text-left sm:gap-6 sm:py-5">
      <span className="w-14 shrink-0 font-display text-base text-foreground/60 transition-colors duration-150 group-hover:text-foreground group-data-[state=open]:text-primary sm:w-20 sm:text-xl md:w-24">
        {year}
      </span>
      <span className="flex-1 truncate font-sans text-sm font-medium text-foreground/70 transition-colors duration-150 group-hover:text-foreground group-data-[state=open]:text-foreground sm:text-base">
        {title}
      </span>
      <Plus className="h-4 w-4 shrink-0 text-foreground/40 transition-transform duration-200 group-hover:text-primary group-data-[state=open]:rotate-45 group-data-[state=open]:text-primary sm:h-5 sm:w-5" />
    </div>
  );
};

const AboutTimeline = () => {
  return (
    <div id="journey" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-4">
      <div className="mb-10 md:mb-12">
        <HeaderTitle
          introText="Timeline"
          highlightText="My Journey"
          description="A timeline of growth, learning, and achievements"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {timelineYears.map((yearData) => {
          const headerTitle = yearData.features[0]?.title || yearData.year;

          return (
            <AccordionItem
              key={yearData.year}
              value={yearData.year}
              className="border-b border-foreground/15 transition-colors duration-150 hover:border-foreground/30"
            >
              <AccordionTrigger className="group w-full py-0 hover:no-underline hover:text-inherit [&>svg]:hidden">
                <TimelineRow year={yearData.year} title={headerTitle} />
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-0 sm:pl-[6.5rem] md:pl-[7rem]">
                <div className="space-y-5 border-l border-primary/30 pl-5">
                  {yearData.features.map((feature, i) => (
                    <div key={i}>
                      <h4 className="font-display text-base text-foreground sm:text-lg">
                        {feature.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/70 sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AboutTimeline;
