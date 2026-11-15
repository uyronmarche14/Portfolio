"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import ProjectCard from "@/components/ui/projectCard";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type LegacyProject } from "@/lib/data/projects";
import { PROJECTS_CONTENT } from "@/lib/data/projectsContent";
import { getTech } from "@/lib/data/techStack";

import { FeaturedProject } from "./FeaturedProject";

/** Major systems shown first. Ids must exist in projects.ts. */
const FEATURED_IDS = ["sqm-supplier-quality", "archon-project-workspace", "swiftpass-guard", "ai-script-video-generator"];
/** The rest of the projects. Featured ones are shown above, so the archive does not repeat them. */
const archive = projects.filter((project) => !FEATURED_IDS.includes(project.id));
const featured = FEATURED_IDS.map((id) => projects.find((project) => project.id === id)).filter(
  (project): project is LegacyProject => Boolean(project)
);

type Filter = "all" | "web" | "mobile" | "desktop" | "ai" | "in-development";

const MOBILE_TECH = ["React Native", "Expo", "Android Studio", "Android", "iOS"];
const WEB_TECH = ["Next.js", "Vite", "Tailwind CSS", "TailwindCSS"];

/** Kinds are derived from each project's declared technologies and status, not stored separately. */
const matchesFilter = (project: LegacyProject, filter: Filter): boolean => {
  const tech = project.technologies;
  switch (filter) {
    case "all":
      return true;
    case "web":
      return tech.some((name) => WEB_TECH.includes(name));
    case "mobile":
      return tech.some((name) => MOBILE_TECH.includes(name));
    case "desktop":
      return tech.includes("WinForms");
    case "ai":
      return tech.some((name) => getTech(name).category === "AI");
    case "in-development":
      return project.status === "in-development";
  }
};

const FILTER_LABELS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "desktop", label: "Desktop" },
  { key: "ai", label: "AI" },
  { key: "in-development", label: "In development" },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      FILTER_LABELS.map(({ key, label }) => ({
        key,
        label,
        count: archive.filter((project) => matchesFilter(project, key)).length,
      })).filter((item) => item.key === "all" || item.count > 0),
    []
  );

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return archive.filter(
      (project) =>
        matchesFilter(project, filter) &&
        (!needle ||
          `${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(needle))
    );
  }, [filter, query]);

  return (
    <section id="projects" className="relative w-full snap-start overflow-hidden py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          title={PROJECTS_CONTENT.sectionTitle}
          subtitle={PROJECTS_CONTENT.sectionDescription}
        />

        <div>
          {featured.map((project, index) => (
            <FeaturedProject key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 border-t border-foreground/15 pt-10">
          <h3 className="text-center font-display text-2xl text-foreground md:text-3xl">More projects</h3>
          <p className="mt-2 text-center font-mono text-xs text-muted">
            {results.length} of {archive.length} shown
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="w-full overflow-x-auto pb-1">
              <FilterTabs centered label="Filter projects" value={filter} onChange={setFilter} items={items} />
            </div>
            <label className="relative block w-full max-w-sm">
              <span className="sr-only">Search projects</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects or technologies"
                className="h-11 w-full rounded-md border border-foreground/15 bg-card pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>

          {results.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {results.map((project) => (
                <ProjectCard key={project.id} project={project} index={projects.indexOf(project) + 1} />
              ))}
            </div>
          ) : (
            <div role="status" className="mt-10 rounded-xl border border-dashed border-foreground/20 px-6 py-14 text-center">
              <p className="text-foreground">No projects match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-3 text-sm text-primary underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
