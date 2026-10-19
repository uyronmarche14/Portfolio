"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BackLink } from "@/components/layout/BackLink";
import { docsLinkClass } from "@/components/layout/DocsLayout";
import { workExperience } from "@/lib/data/workExperience";

/** Left navigation for the Experience docs: overview plus one page per role. */
export function ExperienceSidebar() {
  const pathname = usePathname();

  return (
    <>
      <BackLink href="/">Back to home</BackLink>
      <p className="mt-8 font-mono text-xs text-foreground/50">Experience</p>
      <ul className="mt-3 space-y-0.5">
        <li>
          <Link href="/experience" className={docsLinkClass(pathname === "/experience")}>
            Overview
          </Link>
        </li>
      </ul>
      <p className="mt-8 font-mono text-xs text-foreground/50">Roles</p>
      <ul className="mt-3 space-y-0.5">
        {workExperience.map((entry) => (
          <li key={entry.id}>
            <Link href={`/experience/${entry.id}`} className={docsLinkClass(pathname === `/experience/${entry.id}`)}>
              <span className="block">{entry.company.split(" / ")[0]}</span>
              <span className="block font-mono text-xs text-foreground/50">{entry.dateRange}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
