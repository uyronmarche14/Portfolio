import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DocsLayoutProps {
  /** left navigation (pages or roles) */
  sidebar: ReactNode;
  /** right "On this page" list */
  rail?: ReactNode;
  children: ReactNode;
}

/** Class for a link in the docs sidebar. */
export const docsLinkClass = (active: boolean) =>
  cn(
    "block rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
    active
      ? "bg-background font-medium text-foreground shadow-soft-sm ring-1 ring-foreground/10"
      : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground"
  );

/**
 * Full-width documentation layout: navigation pinned to the left edge, a
 * reading column in the middle and an "On this page" rail on the right.
 */
export function DocsLayout({ sidebar, rail, children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen w-full pt-24">
      <aside className="hidden w-[300px] shrink-0 p-4 lg:block">
        <div className="sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-foreground/10 bg-gradient-to-b from-card to-card/60 p-5 shadow-soft-lg">
          {sidebar}
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-6 pb-24 pt-10 md:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-[780px]">{children}</div>
      </main>
      {rail && (
        <aside className="hidden w-[240px] shrink-0 border-l border-foreground/10 xl:block">
          <div className="sticky top-24 px-6 py-8">{rail}</div>
        </aside>
      )}
    </div>
  );
}

interface DocsRailProps {
  items: Array<{ id: string; label: string }>;
  active: string | null;
}

/** "On this page" list with the current section highlighted. */
export function DocsRail({ items, active }: DocsRailProps) {
  return (
    <>
      <p className="text-sm font-semibold text-foreground">On this page</p>
      <ul className="mt-3 space-y-0.5 border-l border-foreground/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors duration-150",
                active === item.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-foreground/60 hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
