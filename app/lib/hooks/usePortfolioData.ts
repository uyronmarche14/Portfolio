/**
 * Portfolio data fetching hook
 * Provides centralized access to all portfolio data with loading states and error handling
 */

import { useState, useEffect, useCallback } from 'react';
import { Project, AboutContent, DataResult } from '@/lib/types';
import { RepositoryRegistry } from '@/lib/data/repositories';

export interface PortfolioData {
  projects: Project[];
  aboutContent: AboutContent | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface UsePortfolioDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableCaching?: boolean;
  onError?: (error: string) => void;
  onSuccess?: (data: PortfolioData) => void;
}

export interface UsePortfolioDataReturn extends PortfolioData {
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
  clearCache: () => void;
  isRefreshing: boolean;
}

/**
 * Custom hook for fetching and managing portfolio data
 */
export function usePortfolioData(options: UsePortfolioDataOptions = {}): UsePortfolioDataReturn {
  const {
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    enableCaching = true,
    onError,
    onSuccess,
  } = options;

  const [data, setData] = useState<PortfolioData>({
    projects: [],
    aboutContent: null,
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Fetch all portfolio data
   */
  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setData(prev => ({ ...prev, isLoading: true, error: null }));
      }

      const projectRepository = RepositoryRegistry.getProjectRepository();
      const aboutRepository = RepositoryRegistry.getAboutRepository();

      // Fetch projects and about content in parallel
      const [projectsResult, aboutResult] = await Promise.all([
        projectRepository.getAll(),
        aboutRepository.get(),
      ]);

      // Handle projects result
      if (projectsResult.error) {
        throw new Error(projectsResult.error.message);
      }

      // Handle about content result
      if (aboutResult.error) {
        throw new Error(aboutResult.error.message);
      }

      const portfolioData: PortfolioData = {
        projects: projectsResult.data || [],
        aboutContent: aboutResult.data || null,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      };

      setData(portfolioData);
      onSuccess?.(portfolioData);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch portfolio data';
      
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      onError?.(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  }, [onError, onSuccess]);

  /**
   * Refetch data (alias for fetchData)
   */
  const refetch = useCallback(() => fetchData(false), [fetchData]);

  /**
   * Refresh data (maintains current state while fetching)
   */
  const refresh = useCallback(() => fetchData(true), [fetchData]);

  /**
   * Clear cached data and refetch
   */
  const clearCache = useCallback(() => {
    if (enableCaching) {
      // Clear repository caches
      const projectRepository = RepositoryRegistry.getProjectRepository();
      const aboutRepository = RepositoryRegistry.getAboutRepository();
      
      // Note: This would need to be implemented in the repositories
      // projectRepository.clearCache?.();
      // aboutRepository.clearCache?.();
    }
    
    fetchData(false);
  }, [enableCaching, fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  return {
    ...data,
    refetch,
    refresh,
    clearCache,
    isRefreshing,
  };
}

/**
 * Hook for fetching portfolio data with error boundary integration
 */
export function usePortfolioDataWithErrorBoundary(options: UsePortfolioDataOptions = {}) {
  const portfolioData = usePortfolioData({
    ...options,
    onError: (error) => {
      // Log error for error boundary
      console.error('Portfolio data fetch error:', error);
      options.onError?.(error);
    },
  });

  return portfolioData;
}