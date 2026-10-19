"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { HighlightedText } from "@/components/features/experience/HighlightedText";
import { DocsLayout, DocsRail } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience } from "@/lib/data/workExperience";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { formatDuration, monthsBetween } from "@/lib/tenure";

import { CodeBlock } from "./CodeBlock";
import { ExperienceSidebar } from "./ExperienceSidebar";

const H2 = "scroll-mt-28 font-sans text-2xl font-semibold tracking-tight text-foreground";

/** One role as its own docs page. */
export default function ExperienceRolePage({ id }: { id: string }) {
  const index = workExperience.findIndex((entry) => entry.id === id);
  const entry = workExperience[index];
  const prev = workExperience[index - 1] ?? null;
  const next = workExperience[index + 1] ?? null;

  const sections = useMemo(
    () =>
      [
        { id: `${id}-overview`, label: "Overview", show: true },
        { id: `${id}-did`, label: "What I did", show: !!entry?.details?.length },
        { id: `${id}-stack`, label: "Stack", show: true },
        { id: `${id}-highlight`, label: "Highlight", show: true },
        { id: `${id}-photo`, label: "Photo", show: !!entry?.image },
        { id: `${id}-data`, label: "Data", show: true },
      ].filter((section) => section.show),
    [id, entry]
  );
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const active = useScrollSpy(ids);

  if (!entry) return null;

  const now = new Date().toISOString().slice(0, 7);
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
    <>
      <DocsLayout sidebar={<ExperienceSidebar />} rail={<DocsRail items={sections} active={active} />}>
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-foreground/60">
          <Link href="/experience" className="hover:text-foreground">
            Experience
          </Link>
          <span className="mx-2 text-foreground/30">/</span>
          <span className="text-foreground/80">{entry.company}</span>
        </nav>

        <header className="mt-6">
          <p className="font-mono text-xs text-foreground/60">
            <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2 text-foreground/30">/</span>
            {entry.dateRange}
          </p>
          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {entry.role}
          </h1>
          <p className="mt-3 text-lg text-foreground/70">{entry.company}</p>
        </header>

        <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {facts.map(([term, value]) => (
            <div key={term} className="rounded-xl border border-foreground/15 bg-card p-4">
              <dt className="font-mono text-xs text-foreground/60">{term}</dt>
              <dd className="mt-1.5 text-sm font-medium leading-snug text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="pt-14">
          <h2 id={`${id}-overview`} className={H2}>Overview</h2>
          <p className="mt-4 max-w-[66ch] text-[17px] leading-[1.75] text-foreground/80">
            <HighlightedText text={entry.summary} terms={entry.highlights} variant="plain" />
          </p>
        </section>

        {entry.details && entry.details.length > 0 && (
          <section className="pt-14">
            <h2 id={`${id}-did`} className={H2}>What I did</h2>
            <ul className="mt-5 divide-y divide-foreground/10 border-y border-foreground/10">
              {entry.details.map((detail) => (
                <li key={detail} className="max-w-[66ch] py-3.5 text-[16px] leading-relaxed text-foreground/80">
                  {detail}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pt-14">
          <h2 id={`${id}-stack`} className={H2}>Stack</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {entry.stack.map((tag) => (
              <li key={tag}>
                <Badge variant="default" className="h-7 px-2.5 text-[13px]">{tag}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-14">
          <h2 id={`${id}-highlight`} className={H2}>Highlight</h2>
          <p className="mt-5 max-w-[66ch] rounded-r-xl border-l-2 border-primary/50 bg-foreground/[0.03] px-5 py-4 text-[17px] leading-[1.7] text-foreground/85">
            {entry.highlight}
          </p>
        </section>

        {entry.image && (
          <section className="pt-14">
            <h2 id={`${id}-photo`} className={H2}>Photo</h2>
            <figure className="mt-5">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-foreground/15 bg-foreground/5">
                <Image
                  src={entry.image}
                  alt={`${entry.company} work photo`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 780px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-foreground/60">{entry.company}</figcaption>
            </figure>
          </section>
        )}

        <section className="pt-14">
          <h2 id={`${id}-data`} className={H2}>Data</h2>
          <div className="mt-5">
            <CodeBlock label={`experience/${entry.id}`} code={json} />
          </div>
        </section>

        <nav aria-label="Role navigation" className="mt-16 grid gap-3 border-t border-foreground/10 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/experience/${prev.id}`} className="group rounded-xl border border-foreground/15 p-4 transition-colors hover:border-foreground/40">
              <span className="font-mono text-xs text-foreground/60">&larr; Previous</span>
              <span className="mt-1 block text-sm font-medium text-foreground">{prev.company}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/experience/${next.id}`} className="group rounded-xl border border-foreground/15 p-4 text-right transition-colors hover:border-foreground/40">
              <span className="font-mono text-xs text-foreground/60">Next &rarr;</span>
              <span className="mt-1 block text-sm font-medium text-foreground">{next.company}</span>
            </Link>
          )}
        </nav>
      </DocsLayout>
      <Footer />
    </>
  );
}
