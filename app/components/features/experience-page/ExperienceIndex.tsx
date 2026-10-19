import Link from "next/link";

import { DocsLayout } from "@/components/layout/DocsLayout";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/shadcn/badge";
import { workExperience } from "@/lib/data/workExperience";

import { ExperienceSidebar } from "./ExperienceSidebar";

/** Docs landing page: a short intro and one card per role. */
export default function ExperienceIndex() {
  return (
    <>
      <DocsLayout sidebar={<ExperienceSidebar />}>
        <header>
          <p className="font-mono text-xs text-primary">Experience</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Where I&apos;ve worked
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-foreground/70">
            Six roles from analysis to full-stack delivery. Each one has its own page with what I did, the stack
            behind it, and a photo where I have one.
          </p>
        </header>

        <ul className="mt-12 grid gap-4">
          {workExperience.map((entry, i) => (
            <li key={entry.id}>
              <Link
                href={`/experience/${entry.id}`}
                className="group block rounded-2xl border border-foreground/15 bg-card p-6 transition-colors duration-200 hover:border-foreground/35 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-foreground/60">
                      <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mx-2 text-foreground/30">/</span>
                      {entry.dateRange}
                    </p>
                    <h2 className="mt-2 font-sans text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {entry.role}
                    </h2>
                    <p className="mt-1 text-sm text-foreground/70">{entry.company}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-foreground/30 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary motion-reduce:transition-none"
                  >
                    &rarr;
                  </span>
                </div>
                <p className="mt-4 line-clamp-2 max-w-[68ch] text-sm leading-relaxed text-foreground/70">
                  {entry.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {entry.stack.map((tag) => (
                    <li key={tag}>
                      <Badge variant="default">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </DocsLayout>
      <Footer />
    </>
  );
}
