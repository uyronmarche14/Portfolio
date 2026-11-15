import { ChevronDown } from "lucide-react";

import HeaderTitle from "@/components/ui/header";
import { timelineYears } from "@/lib/data/about";

const lastYear = timelineYears[timelineYears.length - 1]?.year;

/** Compact year disclosures keep the full history readable without a long wall of text. */
const AboutTimeline = () => {
  return (
    <section
      id="journey"
      aria-label="My Journey"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8"
    >
      <div className="w-full">
        <div className="mb-10 md:mb-12">
          <HeaderTitle
            introText="Timeline"
            highlightText="My Journey"
            description="From a school website in 2018 to analysing live enterprise systems today."
          />
        </div>

        <ol className="ml-1">
          {timelineYears.map(({ year, features }) => {
            const isLatest = year === lastYear;

            return (
              <li
                key={year}
                className="relative border-l border-foreground/15 pl-5 last:border-l-transparent sm:pl-6"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[3.5px] top-7 h-1.5 w-1.5 rounded-full ring-4 ring-background ${isLatest ? "bg-tone-teal" : "bg-foreground/25"}`}
                />
                <details open={isLatest} className="group border-b border-foreground/10">
                  <summary className="grid min-h-16 cursor-pointer list-none grid-cols-[3rem_minmax(0,1fr)_1.25rem] items-start gap-3 rounded-sm py-5 outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:grid-cols-[4.5rem_minmax(0,1fr)_1.25rem] sm:gap-4 [&::-webkit-details-marker]:hidden">
                    <span className={`font-mono text-sm leading-6 ${isLatest ? "text-primary" : "text-foreground/60"}`}>
                      {year}
                    </span>
                    <span className="min-w-0 text-base font-medium leading-6 text-foreground/85 transition-colors group-hover:text-primary">
                      {features[0]?.title}
                      {features.length > 1 && (
                        <span className="ml-2 inline-block whitespace-nowrap font-mono text-xs font-normal text-foreground/50">
                          +{features.length - 1}
                          <span className="sr-only"> more milestones</span>
                        </span>
                      )}
                      {isLatest && (
                        <span className="ml-2 inline-block font-mono text-[11px] font-normal uppercase tracking-wider text-tone-teal">
                          Now
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 text-foreground/40 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
                    />
                  </summary>

                  <ul className="space-y-4 pb-6 pr-8 sm:pl-[5.5rem]">
                    {features.map((feature, index) => (
                      <li key={feature.title}>
                        {index > 0 && (
                          <h3 className="mb-1 text-base font-medium leading-6 text-foreground/85">
                            {feature.title}
                          </h3>
                        )}
                        <p className="max-w-[68ch] text-base leading-relaxed text-foreground/65">
                          {feature.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default AboutTimeline;
