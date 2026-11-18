"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { HighlightedText } from "@/components/features/experience/HighlightedText";
import { BusinessAnalysisShowcase } from "@/components/features/experience/BusinessAnalysisShowcase";
import { DocsLayout, DocsRail } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/shadcn/badge";
import { projects } from "@/lib/data/projects";
import { workExperience } from "@/lib/data/workExperience";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { formatDuration, monthsBetween } from "@/lib/tenure";

import { ExperienceSidebar } from "./ExperienceSidebar";
import { RoleBadge } from "./RoleBadge";
import { TenureChart } from "./TenureChart";

const H2 = "scroll-mt-28 font-display text-2xl tracking-tight text-foreground";

/** One role as its own docs page. */
export default function ExperienceRolePage({ id }: { id: string }) {
  const index = workExperience.findIndex((entry) => entry.id === id);
  const entry = workExperience[index];
  const prev = workExperience[index - 1] ?? null;
  const next = workExperience[index + 1] ?? null;
  const related = projects.filter((project) => project.experienceId === id);

  const sections = useMemo(
    () =>
      [
        { id: `${id}-overview`, label: "Overview", show: true },
        { id: `${id}-did`, label: "What I did", show: !!entry?.details?.length },
        { id: `${id}-analysis`, label: "Business analysis", show: id === "iopex" },
        { id: `${id}-data-sources`, label: "Data sources", show: id === "iopex" },
        { id: `${id}-records`, label: "Sample records", show: id === "iopex" },
        { id: `${id}-stack`, label: "Stack", show: true },
        { id: `${id}-highlight`, label: "Highlight", show: true },
        { id: `${id}-related`, label: "Related project", show: related.length > 0 },
      ].filter((section) => section.show),
    [id, entry, related.length]
  );
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const active = useScrollSpy(ids);

  if (!entry) return null;

  const now = new Date().toISOString().slice(0, 7);
  const duration = entry.approximate ? null : formatDuration(monthsBetween(entry, now));
  const num = String(index + 1).padStart(2, "0");

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

        {/* Solid header band with a ghost numeral and the role's place on the shared timeline */}
        <header className="relative mt-6 overflow-hidden rounded-2xl border border-foreground/15 bg-card p-6 md:p-8">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 -top-8 select-none font-display text-[11rem] leading-none text-transparent md:text-[14rem]"
            style={{ WebkitTextStroke: "1px rgb(var(--foreground) / 0.09)" }}
          >
            {num}
          </span>
          <p className="relative font-mono text-xs text-foreground/60">
            <span className="text-primary">{num}</span>
            <span className="mx-2 text-foreground/30">/</span>
            {entry.dateRange}
            {duration && <span className="text-foreground/50"> · {duration}</span>}
          </p>
          <h1 className="relative mt-3 max-w-[22ch] font-display text-3xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
            {entry.role}
          </h1>
          <p className="relative mt-3 text-lg text-foreground/70">{entry.company}</p>

          <RoleBadge entry={entry} />

          <div className="relative mt-8 border-t border-foreground/15 pt-2">
            <TenureChart entries={workExperience} now={now} activeId={entry.id} compact />
          </div>
        </header>

        {entry.image && (
          <figure className="mt-6">
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl border border-foreground/15 bg-foreground/5">
              <Image
                src={entry.image}
                alt={`${entry.company} work photo`}
                fill
                preload
                fetchPriority="high"
                quality={55}
                sizes="(max-width: 1280px) 100vw, 780px"
                className="object-cover"
              />
            </div>
          </figure>
        )}

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
                <li key={detail} className="py-3.5">
                  <p className="max-w-[66ch] text-[16px] leading-relaxed text-foreground/80">{detail}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {id === "iopex" && (
          <section className="pt-14">
            <h2 id={`${id}-analysis`} className={H2}>Business analysis & dashboards</h2>
            <div className="mt-6">
              <BusinessAnalysisShowcase />
            </div>
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

        {related.length > 0 && (
          <section className="pt-14">
            <h2 id={`${id}-related`} className={H2}>Related project</h2>
            <ul className="mt-5 grid gap-3">
              {related.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="group block rounded-xl border border-foreground/15 bg-card p-5 transition-colors hover:border-primary"
                  >
                    <span className="font-mono text-xs text-primary">{project.category ?? "Project"}</span>
                    <span className="mt-1 block font-display text-xl text-foreground">{project.title}</span>
                    <span className="mt-2 block max-w-[66ch] text-sm leading-relaxed text-foreground/70">{project.description}</span>
                    <span className="mt-3 inline-block text-sm font-medium text-foreground group-hover:text-primary">Case study &rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

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
      <Footer compact />
    </>
  );
}
