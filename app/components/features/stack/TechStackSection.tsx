"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data/projects";
import { getTech, techStack, type TechCategory } from "@/lib/data/techStack";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER: TechCategory[] = ["Frontend", "Mobile", "Backend", "Data", "AI", "Infra", "Hardware", "Tools"];

interface StackItem {
  name: string;
  category: TechCategory;
  icon: ReturnType<typeof getTech>["icon"];
  projectIds: string[];
}

/** Built from the projects data. Aliases that share a registry entry (e.g. "Tailwind CSS" / "TailwindCSS") merge into one item. */
function buildStack(): StackItem[] {
  const items = new Map<unknown, StackItem>();
  for (const project of projects) {
    for (const name of project.technologies) {
      const entry = techStack[name] ?? getTech(name);
      const existing = items.get(entry) ?? {
        name,
        category: entry.category,
        icon: entry.icon,
        projectIds: [],
      };
      if (!existing.projectIds.includes(project.id)) existing.projectIds.push(project.id);
      items.set(entry, existing);
    }
  }
  return [...items.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const TechStackSection = () => {
  const stack = useMemo(() => buildStack(), []);
  const [selected, setSelected] = useState<string | null>(null);

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: stack.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  const selectedItem = stack.find((item) => item.name === selected);
  const selectedProjects = selectedItem ? projects.filter((project) => selectedItem.projectIds.includes(project.id)) : [];

  return (
    <section id="stack" className="relative w-full py-10 md:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          title="Tech stack"
          subtitle="The tools behind the work. Pick one to see where I used it."
        />

        {/* Quiet, static index: category label, then tools as small neutral logo + name. No motion. */}
        <div className="grid gap-x-12 border-t border-foreground/15 md:grid-cols-2 xl:grid-cols-3">
          {groups.map(({ category, items }) => (
            <div key={category} className="border-b border-foreground/15 py-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{category}</h3>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-0">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isSelected = item.name === selectedItem?.name;
                  return (
                    <li key={item.name}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelected(isSelected ? null : item.name)}
                        className={cn(
                          "inline-flex min-h-8 items-center gap-2 rounded-sm text-[15px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                          isSelected
                            ? "text-foreground underline decoration-primary decoration-2 underline-offset-[10px]"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        <span aria-hidden="true" className={cn("shrink-0 transition-colors", isSelected ? "text-primary" : "text-foreground/50")}>
                          <Icon size={15} />
                        </span>
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div aria-live="polite" className="mt-6 min-h-12">
          {selectedItem && (
            <p className="text-base text-foreground/80">
              <span className="font-mono text-xs uppercase tracking-wider text-primary">{selectedItem.name} in</span>{" "}
              {selectedProjects.map((project, i) => (
                <span key={project.id}>
                  {i > 0 && <span className="text-foreground/40">, </span>}
                  <Link href={`/projects/${project.id}`} className="underline underline-offset-4 transition-colors hover:text-primary">
                    {project.title}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
