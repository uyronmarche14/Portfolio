"use client";

import { Command } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { socialLinks } from "@/lib/data/contacts";
import { NAV_ITEMS } from "@/lib/data/navbar";
import { projects } from "@/lib/data/projects";
import { workExperience } from "@/lib/data/workExperience";

const RESUME_URL = "/resume.pdf";

const itemClass =
  "flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-foreground aria-selected:bg-foreground/10";
const groupClass =
  "px-1 py-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted";

/** Global Ctrl/Cmd+K palette. All entries derive from the portfolio data files. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const technologies = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.technologies))).sort(),
    []
  );

  const run = useCallback((action: () => void) => {
    setOpen(false);
    setSearch("");
    action();
  }, []);

  const goTo = (href: string) =>
    run(() => {
      if (href.startsWith("#")) {
        if (pathname === "/") {
          document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          router.push("/" + href);
        }
      } else {
        router.push(href);
      }
    });

  const external = (href: string) => run(() => window.open(href, "_blank", "noopener,noreferrer"));

  const social = (label: string) => socialLinks.find((link) => link.label === label);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Portfolio command palette"
      filter={(value, query, keywords) =>
        `${value} ${(keywords ?? []).join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()) ? 1 : 0
      }
      overlayClassName="fixed inset-0 z-[100] bg-background/70 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[15vh] z-[101] w-[min(92vw,36rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-foreground/15 bg-popover shadow-soft-lg"
    >
      <DialogPrimitive.Title className="sr-only">Search portfolio</DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">
        Type to find sections, projects, experience and technologies, then press Enter.
      </DialogPrimitive.Description>
      <div className="flex items-center gap-2 border-b border-foreground/15 px-4">
        <Search className="h-4 w-4 text-muted" aria-hidden="true" />
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search sections, projects, technologies…"
          className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        />
        <kbd className="hidden rounded border border-foreground/15 px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
          Esc
        </kbd>
      </div>
      <Command.List className="max-h-[50vh] overflow-y-auto p-1">
        <Command.Empty className="px-4 py-8 text-center text-sm text-muted">No results found.</Command.Empty>

        <Command.Group heading="Navigate" className={groupClass}>
          {NAV_ITEMS.map((item) => (
            <Command.Item key={item.href} value={`go ${item.label}`} onSelect={() => goTo(item.href)} className={itemClass}>
              {item.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Experience" className={groupClass}>
          {workExperience.map((entry) => (
            <Command.Item
              key={entry.id}
              value={`experience ${entry.company} ${entry.role}`}
              keywords={entry.stack}
              onSelect={() => goTo(`/experience/${entry.id}`)}
              className={itemClass}
            >
              <span>{entry.company}</span>
              <span className="truncate text-xs text-muted">{entry.role}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects" className={groupClass}>
          {projects.map((project) => (
            <Command.Item
              key={project.id}
              value={`project ${project.title}`}
              keywords={project.technologies}
              onSelect={() => goTo(`/projects/${project.id}`)}
              className={itemClass}
            >
              <span>{project.title}</span>
              <span className="truncate text-xs text-muted">{project.technologies.slice(0, 3).join(" · ")}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Technologies" className={groupClass}>
          {technologies.map((tech) => (
            <Command.Item key={tech} value={`tech ${tech}`} onSelect={() => setSearch(tech)} className={itemClass}>
              {tech}
              <span className="text-xs text-muted">filter projects</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Links" className={groupClass}>
          <Command.Item value="open resume" onSelect={() => external(RESUME_URL)} className={itemClass}>
            Open resume
          </Command.Item>
          {["GitHub", "LinkedIn"].map((label) => {
            const link = social(label);
            return link ? (
              <Command.Item key={label} value={`open ${label}`} onSelect={() => external(link.href)} className={itemClass}>
                Open {label}
              </Command.Item>
            ) : null;
          })}
          <Command.Item value="open contact" onSelect={() => goTo("#contact")} className={itemClass}>
            Contact
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

export default CommandPalette;
