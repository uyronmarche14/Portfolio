import HeaderTitle from "@/components/ui/header";
import { timelineYears } from "@/lib/data/about";

const lastYear = timelineYears[timelineYears.length - 1]?.year;

/** Minimal career timeline: one row per year, milestones as plain text between hairlines. */
const AboutTimeline = () => {
  return (
    <div id="journey" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mb-12 md:mb-14">
        <HeaderTitle
          introText="Timeline"
          highlightText="My Journey"
          description="From a school website in 2018 to analysing live enterprise systems today."
        />
      </div>

      <ol className="border-t border-foreground/15">
        {timelineYears.map((year) => (
          <li key={year.year} className="grid gap-4 border-b border-foreground/15 py-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-10 md:py-10">
            <h3 className="flex items-baseline gap-3 self-start font-display text-2xl leading-none text-foreground md:text-3xl">
              {year.year}
              {year.year === lastYear && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Now
                </span>
              )}
            </h3>
            <ul className="space-y-6">
              {year.features.map((feature) => (
                <li key={feature.title}>
                  <h4 className="text-lg font-medium leading-snug text-foreground">{feature.title}</h4>
                  <p className="mt-1.5 max-w-[68ch] text-base leading-relaxed text-foreground/70">{feature.description}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default AboutTimeline;
