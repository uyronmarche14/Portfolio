"use client";

import Link from "next/link";
import { useMemo } from "react";

import Footer from "@/components/layout/footer";
import { workExperience } from "@/lib/data/workExperience";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

import { RoleSection } from "./RoleSection";

const SUBSECTIONS = [
  { key: "overview", label: "Overview" },
  { key: "stack", label: "Stack" },
  { key: "highlight", label: "Highlight" },
  { key: "photo", label: "Photo" },
  { key: "data", label: "Data" },
] as const;

const linkClass = (active: boolean) =>
  cn(
    "block rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
    active ? "bg-foreground/[0.07] font-medium text-foreground" : "text-foreground/60 hover:text-foreground"
  );

export default function ExperiencePage() {
  const now = new Date().toISOString().slice(0, 7);
  const roleIds = useMemo(() => workExperience.map((e) => e.id), []);
  const subIds = useMemo(
    () => workExperience.flatMap((e) => SUBSECTIONS.map((s) => `${e.id}-${s.key}`)),
    []
  );
  const activeRole = useScrollSpy(roleIds) ?? roleIds[0];
  const activeSub = useScrollSpy(subIds);

  return (
    <>
      <main className="mx-auto w-full max-w-[1240px] px-6 pb-24 pt-28 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,720px)_200px] xl:justify-center xl:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Link href="/" className="text-sm text-foreground/60 transition-colors hover:text-foreground">
                &larr; Back to home
              </Link>
              <p className="mt-8 text-sm font-semibold text-foreground">Experience</p>
              <ul className="mt-3 space-y-0.5">
                {workExperience.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`} className={linkClass(activeRole === entry.id)}>
                      <span className="block">{entry.company.split(" / ")[0]}</span>
                      <span className="block font-mono text-xs text-foreground/50">{entry.dateRange}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="min-w-0">
            <header className="mb-14">
              <Link href="/" className="text-sm text-foreground/60 hover:text-foreground lg:hidden">
                &larr; Back to home
              </Link>
              <p className="mt-6 font-mono text-xs text-primary lg:mt-0">Resume-backed</p>
              <h1 className="mt-3 font-sans text-5xl font-semibold tracking-tight text-foreground">Experience</h1>
              <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-foreground/70">
                Where I&apos;ve worked, what I built there, and the stack behind it, one role at a time.
              </p>
            </header>
            <div className="sticky top-[84px] z-10 -mx-6 mb-10 overflow-x-auto bg-background/90 px-6 py-2 backdrop-blur lg:hidden">
              <ul className="flex min-w-max gap-2">
                {workExperience.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={cn(
                        "block rounded-full border px-3 py-1 text-sm transition-colors",
                        activeRole === entry.id
                          ? "border-foreground bg-foreground text-background"
                          : "border-foreground/15 text-foreground/70"
                      )}
                    >
                      {entry.company.split(" / ")[0].split(" ").slice(0, 2).join(" ")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-20">
              {workExperience.map((entry, i) => (
                <RoleSection
                  key={entry.id}
                  entry={entry}
                  index={i}
                  now={now}
                  prev={workExperience[i - 1] ?? null}
                  next={workExperience[i + 1] ?? null}
                />
              ))}
            </div>
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <p className="text-sm font-semibold text-foreground">On this page</p>
              <ul className="mt-3 space-y-0.5 border-l border-foreground/10">
                {SUBSECTIONS.map((sub) => {
                  const id = `${activeRole}-${sub.key}`;
                  return (
                    <li key={sub.key}>
                      <a
                        href={`#${id}`}
                        className={cn(
                          "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-150",
                          activeSub === id
                            ? "border-primary text-foreground"
                            : "border-transparent text-foreground/60 hover:text-foreground"
                        )}
                      >
                        {sub.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
