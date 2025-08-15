/**
 * About content data fetching and management hook
 * Provides specialized functionality for about content with caching and error handling
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  AboutContent, 
  AboutFilters, 
  AboutStatistics,
  Experience,
  Education,
  Skill,
  SkillGroup,
  DataResult 
} from '@/types';
import { RepositoryRegistry } from '@/data/repositories';

export interface UseAboutContentOptions {
  initialFilters?: AboutFilters;
  enableCaching?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onError?: (error: string) => void;
  onSuccess?: (content: AboutContent) => void;
}

export interface UseAboutContentReturn {
  // Data
  aboutContent: AboutContent | null;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  statistics: AboutStatistics | null;
  
  // Filtered Data
  filteredExperience: Experience[];
  filteredEducation: Education[];
  filteredSkills: SkillGroup[];
  featuredExperience: Experience[];
  featuredSkills: Skill[];
  
  // State
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Filters
  filters: AboutFilters;
  setFilters: (filters: AboutFilters) => void;
  clearFilters: () => void;
  
  // Actions
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
  clearCache: () => void;
  
  // Utilities
  getExperienceByType: (type: Experience['type']) => Experience[];
  getSkillsByCategory: (category: Skill['category']) => Skill[];
  getEducationByLevel: (level: Education['level']) => Education[];
  exportData: () => void;
}

/**
 * Custom hook for managing about content data
 */
export function useAboutContent(options: UseAboutContentOptions = {}): UseAboutContentReturn {
  const {
    initialFilters = {},
    enableCaching = true,
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    onError,
    onSuccess,
  } = options;

  // State
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [statistics, setStatistics] = useState<AboutStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filters, setFilters] = useState<AboutFilters>(initialFilters);

  /**
   * Get about repository instance
   */
  const getRepository = useCallback(() => {
    return RepositoryRegistry.getAboutRepository();
  }, []);

  /**
   * Fetch about content
   */
  const fetchAboutContent = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      
      setError(null);

      const repository = getRepository();
      
      // Fetch about content and statistics in parallel
      const [contentResult, statsResult] = await Promise.all([
        repository.get(),
        repository.getStatistics(),
      ]);

      if (contentResult.error) {
        throw new Error(contentResult.error.message);
      }

      if (statsResult.error) {
        console.warn('Failed to fetch about statistics:', statsResult.error.message);
      }

      const content = contentResult.data || null;
      const stats = statsResult.data || null;

      setAboutContent(content);
      setStatistics(stats);
      setLastUpdated(new Date());
      
      if (content) {
        onSuccess?.(content);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch about content';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [getRepository, onError, onSuccess]);

  /**
   * Extract experience from about content
   */
  const experience = useMemo(() => {
    return aboutContent?.experience || [];
  }, [aboutContent]);

  /**
   * Extract education from about content
   */
  const education = useMemo(() => {
    return aboutContent?.education || [];
  }, [aboutContent]);

  /**
   * Extract skills from about content
   */
  const skills = useMemo(() => {
    return aboutContent?.skills || [];
  }, [aboutContent]);

  /**
   * Filter experience based on current filters
   */
  const filteredExperience = useMemo(() => {
    if (!experience.length) return [];

    return experience.filter(exp => {
      // Experience type filter
      if (filters.experienceType?.length && !filters.experienceType.includes(exp.type)) {
        return false;
      }

      // Featured filter
      if (filters.featured !== undefined && exp.featured !== filters.featured) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const expDate = exp.startDate;
        const start = filters.dateRange.start;
        const end = filters.dateRange.end;

        if (expDate < start || (end && expDate > end)) {
          return false;
        }
      }

      return true;
    });
  }, [experience, filters]);

  /**
   * Filter education based on current filters
   */
  const filteredEducation = useMemo(() => {
    if (!education.length) return [];

    return education.filter(edu => {
      // Education level filter
      if (filters.educationLevel?.length && !filters.educationLevel.includes(edu.level)) {
        return false;
      }

      // Featured filter
      if (filters.featured !== undefined && edu.featured !== filters.featured) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const eduDate = edu.startDate;
        const start = filters.dateRange.start;
        const end = filters.dateRange.end;

        if (eduDate < start || (end && eduDate > end)) {
          return false;
        }
      }

      return true;
    });
  }, [education, filters]);

  /**
   * Filter skills based on current filters
   */
  const filteredSkills = useMemo(() => {
    if (!skills.length) return [];

    return skills.filter(skillGroup => {
      // Skill category filter
      if (filters.skillCategory?.length && !filters.skillCategory.includes(skillGroup.category)) {
        return false;
      }

      // Filter skills within the group
      const filteredGroupSkills = skillGroup.skills.filter(skill => {
        // Featured filter
        if (filters.featured !== undefined && skill.featured !== filters.featured) {
          return false;
        }

        return true;
      });

      // Return the group with filtered skills
      return filteredGroupSkills.length > 0;
    }).map(skillGroup => ({
      ...skillGroup,
      skills: skillGroup.skills.filter(skill => {
        if (filters.featured !== undefined && skill.featured !== filters.featured) {
          return false;
        }
        return true;
      }),
    }));
  }, [skills, filters]);

  /**
   * Get featured experience
   */
  const featuredExperience = useMemo(() => {
    return experience.filter(exp => exp.featured);
  }, [experience]);

  /**
   * Get featured skills (flattened from all skill groups)
   */
  const featuredSkills = useMemo(() => {
    return skills.flatMap(group => group.skills.filter(skill => skill.featured));
  }, [skills]);

  /**
   * Refetch about content
   */
  const refetch = useCallback(() => fetchAboutContent(false), [fetchAboutContent]);

  /**
   * Refresh about content (maintains current state while fetching)
   */
  const refresh = useCallback(() => fetchAboutContent(true), [fetchAboutContent]);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  /**
   * Clear cache and refetch
   */
  const clearCache = useCallback(() => {
    if (enableCaching) {
      const repository = getRepository();
      // Note: This would need to be implemented in the repository
      // repository.clearCache?.();
    }
    fetchAboutContent(false);
  }, [enableCaching, fetchAboutContent, getRepository]);

  /**
   * Get experience by type
   */
  const getExperienceByType = useCallback((type: Experience['type']): Experience[] => {
    return experience.filter(exp => exp.type === type);
  }, [experience]);

  /**
   * Get skills by category (flattened from all skill groups)
   */
  const getSkillsByCategory = useCallback((category: Skill['category']): Skill[] => {
    return skills
      .filter(group => group.category === category)
      .flatMap(group => group.skills);
  }, [skills]);

  /**
   * Get education by level
   */
  const getEducationByLevel = useCallback((level: Education['level']): Education[] => {
    return education.filter(edu => edu.level === level);
  }, [education]);

  /**
   * Export about content data
   */
  const exportData = useCallback(() => {
    if (!aboutContent) return;

    const dataStr = JSON.stringify(aboutContent, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `about-content-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [aboutContent]);

  // Initial data fetch
  useEffect(() => {
    fetchAboutContent(false);
  }, [fetchAboutContent]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  return {
    // Data
    aboutContent,
    experience,
    education,
    skills,
    statistics,
    
    // Filtered Data
    filteredExperience,
    filteredEducation,
    filteredSkills,
    featuredExperience,
    featuredSkills,
    
    // State
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    
    // Filters
    filters,
    setFilters,
    clearFilters,
    
    // Actions
    refetch,
    refresh,
    clearCache,
    
    // Utilities
    getExperienceByType,
    getSkillsByCategory,
    getEducationByLevel,
    exportData,
  };
}