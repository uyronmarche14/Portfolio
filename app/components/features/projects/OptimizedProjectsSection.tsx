"use client";

import * as React from "react";
import { Project } from "@/lib/types";
import { useProjects } from "@/lib/hooks/useProjects";
import {
  ProjectGridSkeleton,
  ProjectCardSkeleton,
  DataErrorMessage,
} from "@/components/ui";
import { createLazyComponent } from "@/lib/utils/codeSplitting";
import { usePerformanceMonitor, debounce } from "@/lib/utils/performance";
import { useCachedData } from "@/lib/utils/caching";
import { LazySection } from "@/components/layout/PerformantLayout";
import { cn } from "@/lib/utils";

// Lazy load heavy components
const ProjectCard = createLazyComponent(
  () => import("@/components/ui/projectCard"),
  { displayName: "ProjectCard" }
);

const ProjectFilters = createLazyComponent(() => import("./ProjectFilters"), {
  displayName: "ProjectFilters",
});

interface OptimizedProjectsSectionProps {
  className?: string;
  showFilters?: boolean;
  maxProjects?: number;
  enableVirtualization?: boolean;
}

/**
 * Optimized projects section with performance enhancements
 */
export const OptimizedProjectsSection: React.FC<
  OptimizedProjectsSectionProps
> = ({
  className,
  showFilters = true,
  maxProjects,
  enableVirtualization = false,
}) => {
  const { startMeasure, endMeasure } = usePerformanceMonitor(
    "OptimizedProjectsSection"
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState({});
  const [visibleProjects, setVisibleProjects] = React.useState(6);

  // Use cached data for better performance
  const {
    projects,
    filteredProjects,
    isLoading,
    error,
    refetch,
    canRetry,
    retry,
  } = useProjects({
    initialFilters: filters,
    enableCaching: true,
    autoRefresh: false,
    onError: (error) => {
      console.error("Projects loading error:", error);
    },
  });

  // Debounced search to avoid excessive API calls
  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string) => {
        startMeasure("search");
        setSearchQuery(query);
        endMeasure("search");
      }, 300),
    [startMeasure, endMeasure]
  );

  // Memoized filtered and sorted projects
  const displayProjects = React.useMemo(() => {
    startMeasure("filter_sort");

    let result = filteredProjects;

    // Apply search query
    if (searchQuery) {
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply max projects limit
    if (maxProjects) {
      result = result.slice(0, maxProjects);
    }

    endMeasure("filter_sort");
    return result;
  }, [filteredProjects, searchQuery, maxProjects, startMeasure, endMeasure]);

  // Virtualized projects for large lists
  const virtualizedProjects = React.useMemo(() => {
    if (!enableVirtualization) return displayProjects;
    return displayProjects.slice(0, visibleProjects);
  }, [displayProjects, enableVirtualization, visibleProjects]);

  // Load more projects for virtualization
  const loadMoreProjects = React.useCallback(() => {
    setVisibleProjects((prev) => Math.min(prev + 6, displayProjects.length));
  }, [displayProjects.length]);

  // Intersection observer for infinite scroll
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!enableVirtualization || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleProjects < displayProjects.length) {
          loadMoreProjects();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [
    enableVirtualization,
    visibleProjects,
    displayProjects.length,
    loadMoreProjects,
  ]);

  // Error state
  if (error && !projects.length) {
    return (
      <section className={cn("py-12", className)}>
        <div className="container mx-auto px-4">
          <DataErrorMessage
            error={error}
            onRetry={canRetry ? retry : undefined}
            className="mx-auto max-w-md"
          />
        </div>
      </section>
    );
  }

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            A collection of projects showcasing my skills and experience in web
            development, mobile applications, and software engineering.
          </p>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <LazySection
            sectionName="project-filters"
            fallback={
              <div className="mb-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="h-10 w-64 animate-pulse rounded bg-muted" />
                  <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-20 animate-pulse rounded-full bg-muted"
                      />
                    ))}
                  </div>
                </div>
              </div>
            }
            className="mb-8"
          >
            <React.Suspense
              fallback={<div className="h-16 animate-pulse rounded bg-muted" />}
            >
              <ProjectFilters
                onSearchChange={debouncedSearch}
                onFiltersChange={setFilters}
                currentFilters={filters}
              />
            </React.Suspense>
          </LazySection>
        )}

        {/* Projects Grid */}
        <div className="space-y-8">
          {isLoading && !projects.length ? (
            <ProjectGridSkeleton count={6} />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {virtualizedProjects.map((project, index) => (
                  <LazySection
                    key={project.id}
                    sectionName={`project-${project.id}`}
                    fallback={<ProjectCardSkeleton />}
                  >
                    <React.Suspense fallback={<ProjectCardSkeleton />}>
                      <ProjectCard
                        project={project}
                        priority={index < 3} // Prioritize first 3 images
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                    </React.Suspense>
                  </LazySection>
                ))}
              </div>

              {/* Load More Trigger for Virtualization */}
              {enableVirtualization &&
                visibleProjects < displayProjects.length && (
                  <div ref={loadMoreRef} className="py-8 text-center">
                    <div className="text-muted-foreground inline-flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Loading more projects...
                    </div>
                  </div>
                )}

              {/* No Results */}
              {displayProjects.length === 0 && !isLoading && (
                <div className="py-12 text-center">
                  <h3 className="mb-2 text-lg font-semibold">
                    No projects found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({});
                    }}
                    className="text-primary-foreground rounded-md bg-primary px-4 py-2 hover:bg-primary/90"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Loading State for Additional Data */}
        {isLoading && projects.length > 0 && (
          <div className="mt-8">
            <ProjectGridSkeleton count={3} />
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * Lightweight version for better performance on slower devices
 */
export const LightweightProjectsSection: React.FC<
  OptimizedProjectsSectionProps
> = (props) => {
  return (
    <OptimizedProjectsSection
      {...props}
      showFilters={false}
      maxProjects={6}
      enableVirtualization={false}
    />
  );
};

export default OptimizedProjectsSection;
