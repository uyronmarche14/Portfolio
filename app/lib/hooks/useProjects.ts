/**
 * Projects data fetching and management hook
 * Provides specialized functionality for project data with filtering, searching, and caching
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import type {
  Project,
  ProjectFilters,
  ProjectSearchParams,
  ProjectStatistics,
} from "@/lib/types";
import { RepositoryRegistry } from "@/lib/data/repositories";

export interface UseProjectsOptions {
  initialFilters?: ProjectFilters;
  initialSearchParams?: ProjectSearchParams;
  enableCaching?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onError?: (error: string) => void;
  onSuccess?: (projects: Project[]) => void;
}

export interface UseProjectsReturn {
  // Data
  projects: Project[];
  filteredProjects: Project[];
  featuredProjects: Project[];
  statistics: ProjectStatistics | null;

  // State
  isLoading: boolean;
  isSearching: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;

  // Filters and Search
  filters: ProjectFilters;
  searchParams: ProjectSearchParams;
  searchQuery: string;

  // Actions
  setFilters: (filters: ProjectFilters) => void;
  setSearchParams: (params: ProjectSearchParams) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  clearSearch: () => void;

  // Data Operations
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
  searchProjects: (query: string) => Promise<void>;
  getProjectById: (id: string) => Project | undefined;
  getProjectsByTechnology: (technology: string) => Project[];
  getProjectsByCategory: (category: Project["category"]) => Project[];

  // Utilities
  clearCache: () => void;
  exportProjects: () => void;
}

/**
 * Custom hook for managing project data with advanced filtering and search capabilities
 */
export function useProjects(
  options: UseProjectsOptions = {}
): UseProjectsReturn {
  const {
    initialFilters = {},
    initialSearchParams = {},
    enableCaching = true,
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    onError,
    onSuccess,
  } = options;

  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [statistics, setStatistics] = useState<ProjectStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Filters and Search
  const [filters, setFilters] = useState<ProjectFilters>(initialFilters);
  const [searchParams, setSearchParams] =
    useState<ProjectSearchParams>(initialSearchParams);
  const [searchQuery, setSearchQuery] = useState(searchParams.query || "");

  /**
   * Get project repository instance
   */
  const getRepository = useCallback(() => {
    return RepositoryRegistry.getProjectRepository();
  }, []);

  /**
   * Fetch all projects
   */
  const fetchProjects = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        setError(null);

        const repository = getRepository();

        // Fetch projects and statistics in parallel
        const [projectsResult, statsResult] = await Promise.all([
          repository.getAll(),
          repository.getStatistics(),
        ]);

        if (projectsResult.error) {
          throw new Error(projectsResult.error.message);
        }

        if (statsResult.error) {
          console.warn(
            "Failed to fetch project statistics:",
            statsResult.error.message
          );
        }

        const projectData = projectsResult.data || [];
        const statsData = statsResult.data || null;

        setProjects(projectData);
        setStatistics(statsData);
        setLastUpdated(new Date());

        onSuccess?.(projectData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch projects";
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [getRepository, onError, onSuccess]
  );

  /**
   * Search projects with current search parameters
   */
  const performSearch = useCallback(
    async (query?: string) => {
      try {
        setIsSearching(true);
        setError(null);

        const repository = getRepository();
        const searchParameters: ProjectSearchParams = {
          ...searchParams,
          query: query || searchQuery,
        };

        const result = await repository.searchProjects(searchParameters);

        if (result.error) {
          throw new Error(result.error.message);
        }

        setProjects(result.data || []);
        setLastUpdated(new Date());
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to search projects";
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsSearching(false);
      }
    },
    [getRepository, searchParams, searchQuery, onError]
  );

  /**
   * Apply filters to projects
   */
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];

    return projects.filter((project) => {
      // Category filter
      if (
        filters.category?.length &&
        !filters.category.includes(project.category)
      ) {
        return false;
      }

      // Status filter
      if (filters.status?.length && !filters.status.includes(project.status)) {
        return false;
      }

      // Technology filter
      if (filters.technologies?.length) {
        const hasMatchingTech = filters.technologies.some((tech) =>
          project.technologies.some((projectTech) =>
            projectTech.name.toLowerCase().includes(tech.toLowerCase())
          )
        );
        if (!hasMatchingTech) return false;
      }

      // Featured filter
      if (
        filters.featured !== undefined &&
        project.featured !== filters.featured
      ) {
        return false;
      }

      // Tags filter
      if (filters.tags?.length) {
        const hasMatchingTag = filters.tags.some((tag) =>
          project.tags.some((projectTag) =>
            projectTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
        if (!hasMatchingTag) return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const projectDate = project.createdAt;
        const start = filters.dateRange.start;
        const end = filters.dateRange.end;

        if (projectDate < start || (end && projectDate > end)) {
          return false;
        }
      }

      return true;
    });
  }, [projects, filters]);

  /**
   * Get featured projects
   */
  const featuredProjects = useMemo(() => {
    return projects.filter((project) => project.featured);
  }, [projects]);

  /**
   * Refetch projects
   */
  const refetch = useCallback(() => fetchProjects(false), [fetchProjects]);

  /**
   * Refresh projects (maintains current state while fetching)
   */
  const refresh = useCallback(() => fetchProjects(true), [fetchProjects]);

  /**
   * Search projects with a new query
   */
  const searchProjects = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      await performSearch(query);
    },
    [performSearch]
  );

  /**
   * Get project by ID
   */
  const getProjectById = useCallback(
    (id: string): Project | undefined => {
      return projects.find((project) => project.id === id);
    },
    [projects]
  );

  /**
   * Get projects by technology
   */
  const getProjectsByTechnology = useCallback(
    (technology: string): Project[] => {
      return projects.filter((project) =>
        project.technologies.some((tech) =>
          tech.name.toLowerCase().includes(technology.toLowerCase())
        )
      );
    },
    [projects]
  );

  /**
   * Get projects by category
   */
  const getProjectsByCategory = useCallback(
    (category: Project["category"]): Project[] => {
      return projects.filter((project) => project.category === category);
    },
    [projects]
  );

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  /**
   * Clear search
   */
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchParams({});
    fetchProjects(false);
  }, [fetchProjects]);

  /**
   * Clear cache and refetch
   */
  const clearCache = useCallback(() => {
    if (enableCaching) {
      const _repository = getRepository();
      // Repository clearing logic here
    }
    fetchProjects(false);
  }, [enableCaching, fetchProjects, getRepository]);

  /**
   * Export projects data
   */
  const exportProjects = useCallback(() => {
    if (!projects) return;
    const dataStr = JSON.stringify(projects, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportFileDefaultName = `projects-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, [projects]);

  // Initial data fetch
  useEffect(() => {
    fetchProjects(false);
  }, [fetchProjects]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  // Update search params when query changes
  useEffect(() => {
    if (searchQuery !== searchParams.query) {
      setSearchParams((prev) => ({ ...prev, query: searchQuery }));
    }
  }, [searchQuery, searchParams.query]);

  return {
    // Data
    projects,
    filteredProjects,
    featuredProjects,
    statistics,

    // State
    isLoading,
    isSearching,
    isRefreshing,
    error,
    lastUpdated,

    // Filters and Search
    filters,
    searchParams,
    searchQuery,

    // Actions
    setFilters,
    setSearchParams,
    setSearchQuery,
    clearFilters,
    clearSearch,

    // Data Operations
    refetch,
    refresh,
    searchProjects,
    getProjectById,
    getProjectsByTechnology,
    getProjectsByCategory,

    // Utilities
    clearCache,
    exportProjects,
  };
}
