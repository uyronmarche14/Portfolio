import Image from "next/image";
import Link from "next/link";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience } from "@/lib/data/workExperience";

import { ExperienceSidebar } from "./ExperienceSidebar";
import { TenureChart } from "./TenureChart";

/** Docs landing page: an overlap chart for all roles, then one card per role on a timeline spine. */
export default function ExperienceIndex() {
  const now = new Date().toISOString().slice(0, 7);

  return (
    <>
      <DocsLayout sidebar={<ExperienceSidebar />}>
        <header>
          <p className="font-mono text-xs text-primary">Experience</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Where I&apos;ve worked
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-foreground/70">
            Six roles from analysis to full-stack delivery. Each one has its own page with what I did, the stack
            behind it, and a photo where I have one.
          </p>
        </header>

        <section aria-label="Roles on one timeline" className="mt-10 rounded-2xl border border-foreground/15 bg-card p-5 sm:p-6">
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted">All roles, one timeline</h2>
          <div className="mt-2">
            <TenureChart entries={workExperience} now={now} />
          </div>
        </section>

        <ol className="relative mt-12 space-y-5 pl-7 sm:pl-9">
          {/* timeline spine */}
          <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-foreground/15 sm:left-[9px]" />
          {workExperience.map((entry, i) => (
            <li key={entry.id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-7 top-8 h-[15px] w-[15px] rounded-full border-2 border-primary bg-background sm:-left-9 sm:h-[19px] sm:w-[19px]"
              />
              <Link
                href={`/experience/${entry.id}`}
                data-cursor="Read role"
                className="group grid gap-5 rounded-2xl border border-foreground/15 bg-card p-5 transition-colors duration-200 hover:border-primary sm:p-6 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs text-foreground/60">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2 text-foreground/30">/</span>
                    {entry.dateRange}
                  </p>
                  <h2 className="mt-2 font-display text-xl tracking-tight text-foreground sm:text-2xl">{entry.role}</h2>
                  <p className="mt-1 text-sm text-foreground/70">{entry.company}</p>
                  <p className="mt-4 line-clamp-3 max-w-[68ch] text-sm leading-relaxed text-foreground/70">{entry.summary}</p>
                  {entry.id === "iopex" && (
                    <p className="mt-3 text-sm text-primary">Includes business analysis, data sources, and a sample dashboard.</p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {entry.stack.map((tag) => (
                      <li key={tag}>
                        <Badge variant="default">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-block text-sm font-medium text-foreground group-hover:text-primary">Read role &rarr;</span>
                </div>
                {entry.image && (
                  <div className="relative hidden aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-lg border border-foreground/15 md:block">
                    <Image src={entry.image} alt="" fill loading="lazy" sizes="128px" className="object-cover" />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ol>
      </DocsLayout>
      <Footer compact />
    </>
  );
}
