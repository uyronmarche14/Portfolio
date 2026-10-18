import Image from "next/image";

import { HighlightedText } from "@/components/features/experience/HighlightedText";
import { Badge } from "@/components/ui/shadcn/badge";
import type { WorkExperienceEntry } from "@/lib/data/workExperience";
import { formatDuration, monthsBetween } from "@/lib/tenure";

import { CodeBlock } from "./CodeBlock";

interface RoleSectionProps {
  entry: WorkExperienceEntry;
  index: number;
  now: string;
  prev: WorkExperienceEntry | null;
  next: WorkExperienceEntry | null;
}

const H3 = "font-sans mb-3 mt-12 scroll-mt-28 text-xl font-semibold tracking-tight text-foreground";

/** One role, written as a reading page: facts, overview, stack, highlight, photo, data. */
export function RoleSection({ entry, index, now, prev, next }: RoleSectionProps) {
  const num = String(index + 1).padStart(2, "0");
  const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));
  const json = JSON.stringify(
    { role: entry.role, company: entry.company, period: entry.dateRange, stack: entry.stack },
    null,
    2
  );

  const facts: Array<[string, string]> = [
    ["Role", entry.role],
    ["Company", entry.company],
    ["Period", entry.dateRange],
    ...(duration ? ([["Duration", duration]] as Array<[string, string]>) : []),
  ];

  return (
    <section id={entry.id} className="scroll-mt-28 border-t border-foreground/10 pt-16 first:border-t-0 first:pt-0">
      <p className="font-mono text-xs text-foreground/60">
        <span className="text-primary">{num}</span> / {entry.dateRange}
      </p>
      <h2 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-foreground">{entry.role}</h2>
      <p className="mt-2 text-lg text-foreground/70">{entry.company}</p>

      <dl className="mt-8 divide-y divide-foreground/10 border-y border-foreground/10 text-sm">
        {facts.map(([term, value]) => (
          <div key={term} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 py-3">
            <dt className="font-mono text-xs text-foreground/60">{term}</dt>
            <dd className="text-foreground">{value}</dd>
          </div>
        ))}
      </dl>

      <h3 id={`${entry.id}-overview`} className={H3}>Overview</h3>
      <p className="max-w-[66ch] text-[17px] leading-[1.75] text-foreground/80">
        <HighlightedText text={entry.summary} terms={entry.highlights} variant="plain" />
      </p>
      {entry.details && entry.details.length > 0 && (
        <ul className="mt-4 max-w-[66ch] list-disc space-y-2 pl-5 text-[17px] leading-[1.75] text-foreground/80 marker:text-foreground/30">
          {entry.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}

      <h3 id={`${entry.id}-stack`} className={H3}>Stack</h3>
      <ul className="flex flex-wrap gap-2">
        {entry.stack.map((tag) => (
          <li key={tag}>
            <Badge variant="default" className="h-7 px-2.5 text-[13px]">{tag}</Badge>
          </li>
        ))}
      </ul>

      <h3 id={`${entry.id}-highlight`} className={H3}>Highlight</h3>
      <p className="max-w-[66ch] rounded-r-lg border-l-2 border-primary/50 bg-foreground/[0.03] px-5 py-4 text-[17px] leading-[1.7] text-foreground/85">
        {entry.highlight}
      </p>

      {entry.image && (
        <>
      <h3 id={`${entry.id}-photo`} className={H3}>Photo</h3>
      <figure>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-foreground/15 bg-foreground/5">
          <Image
            src={entry.image}
            alt={`${entry.company} work photo`}
            fill
            sizes="(max-width: 1280px) 100vw, 720px"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-3 font-mono text-xs text-foreground/60">{entry.company}</figcaption>
      </figure>
        </>
      )}

      <h3 id={`${entry.id}-data`} className={H3}>Data</h3>
      <CodeBlock label={`experience/${entry.id}`} code={json} />

      <nav aria-label="Role navigation" className="mt-12 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <a href={`#${prev.id}`} className="rounded-xl border border-foreground/15 p-4 transition-colors hover:border-foreground/40">
            <span className="font-mono text-xs text-foreground/60">Previous</span>
            <span className="mt-1 block text-sm font-medium text-foreground">{prev.company}</span>
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`#${next.id}`} className="rounded-xl border border-foreground/15 p-4 text-right transition-colors hover:border-foreground/40">
            <span className="font-mono text-xs text-foreground/60">Next</span>
            <span className="mt-1 block text-sm font-medium text-foreground">{next.company}</span>
          </a>
        )}
      </nav>
    </section>
  );
}
