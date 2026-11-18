import { BUSINESS_ANALYSIS_CONTENT as content } from "@/lib/data/businessAnalysis";

/** Shared capability documentation for the dashboard and the Business Analyst role page. */
export function BusinessAnalysisContent({
  headingAs: Heading = "h3",
  sourcesId,
}: {
  headingAs?: "h2" | "h3";
  sourcesId: string;
}) {
  const SourceHeading = Heading === "h2" ? "h3" : "h4";

  return (
    <div className="min-w-0">
      <p className="font-mono text-xs text-primary">{content.eyebrow}</p>
      <Heading className="mt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground">
        {content.title}
      </Heading>
      <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-foreground/75">{content.introduction}</p>

      <dl className="mt-6 divide-y divide-foreground/10 border-y border-foreground/10">
        {content.signals.map((signal) => (
          <div key={signal.title} className="grid gap-1.5 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-5">
            <dt className="text-sm font-medium text-foreground">{signal.title}</dt>
            <dd className="text-sm leading-relaxed text-foreground/70">{signal.description}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-foreground/65">{content.method}</p>

      <SourceHeading id={sourcesId} className="mt-8 scroll-mt-28 text-lg font-medium text-foreground">
        Sources and signals I can work with
      </SourceHeading>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
        These are examples of analysis opportunities and useful fields to capture. The working
        recruitment sample uses applications and appointments only.
      </p>
      <div className="mt-4 divide-y divide-foreground/10 border-y border-foreground/10">
        {content.sources.map((source) => (
          <details key={source.title} className="group py-4">
            <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-3 rounded-sm text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
              {source.title}
              <span aria-hidden="true" className="font-mono text-xs text-foreground/50 group-open:hidden">show</span>
              <span aria-hidden="true" className="hidden font-mono text-xs text-foreground/50 group-open:inline">hide</span>
            </summary>
            <dl className="mt-3 space-y-3 text-sm">
              {[
                ["Records", source.examples],
                ["Question", source.question],
                ["What to capture", source.capture],
              ].map(([label, text]) => (
                <div key={label} className="grid gap-1 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="font-mono text-xs text-foreground/55">{label}</dt>
                  <dd className="leading-relaxed text-foreground/75">{text}</dd>
                </div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </div>
  );
}
