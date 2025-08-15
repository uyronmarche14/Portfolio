/**
 * Portfolio data fetching hook
 * Provides centralized access to all portfolio data with loading states and error handling
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { Project, AboutContent, DataResult } from "@/lib/types";
import { AppError } from "@/lib/types/error";
import { RepositoryRegistry } from "@/lib/data/repositories";
import {
  createNetworkError,
  createDataError,
  logError,
  handleAsyncError,
  retryOperation,
  getUserErrorMessage,
} from "@/lib/utils/errorHandling";

export interface PortfolioData {
  projects: Project[];
  aboutContent: AboutContent | null;
  isLoading: boolean;
  error: AppError | null;
  lastUpdated: Date | null;
}

export interface UsePortfolioDataOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  enableCaching?: boolean;
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: AppError) => void;
  onSuccess?: (data: PortfolioData) => void;
  onRetry?: (attempt: number, error: AppError) => void;
}

export interface UsePortfolioDataReturn extends PortfolioData {
  refetch: () => Promise<void>;
  refresh: () => Promise<void>;
  clearCache: () => void;
  isRefreshing: boolean;
  retryCount: number;
  canRetry: boolean;
  retry: () => Promise<void>;
}

/**
 * Custom hook for fetching and managing portfolio data with enhanced error handling
 */
export function usePortfolioData(
  options: UsePortfolioDataOptions = {}
): UsePortfolioDataReturn {
  const {
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    enableCaching = true,
    enableRetry = true,
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onSuccess,
    onRetry,
  } = options;

  const [data, setData] = useState<PortfolioData>({
    projects: [],
    aboutContent: null,
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  /**
   * Create abort controller for request cancellation
   */
  const createAbortController = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current;
  }, []);

  /**
   * Fetch all portfolio data with enhanced error handling
   */
  const fetchData = useCallback(
    async (isRefresh = false, attempt = 0) => {
      const abortController = createAbortController();

      try {
        if (isRefresh) {
          setIsRefreshing(true);
        } else {
          setData((prev) => ({ ...prev, isLoading: true, error: null }));
        }

        // Clear any existing retry timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }

        const projectRepository = RepositoryRegistry.getProjectRepository();
        const aboutRepository = RepositoryRegistry.getAboutRepository();

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          const timeoutId = setTimeout(() => {
            abortController.abort();
            reject(
              createNetworkError(
                "Request timeout",
                undefined,
                "portfolio-data",
                "GET"
              )
            );
          }, 30000); // 30 second timeout

          abortController.signal.addEventListener("abort", () => {
            clearTimeout(timeoutId);
          });
        });

        // Fetch data with timeout
        const dataPromise = Promise.all([
          projectRepository.getAll(),
          aboutRepository.get(),
        ]);

        const [projectsResult, aboutResult] = (await Promise.race([
          dataPromise,
          timeoutPromise,
        ])) as [DataResult<Project[]>, DataResult<AboutContent>];

        // Check if request was aborted
        if (abortController.signal.aborted) {
          return;
        }

        // Handle projects result
        if (projectsResult.error) {
          throw createDataError(
            projectsResult.error.message,
            "PROJECT_FETCH_ERROR",
            projectsResult.error
          );
        }

        // Handle about content result
        if (aboutResult.error) {
          throw createDataError(
            aboutResult.error.message,
            "ABOUT_FETCH_ERROR",
            aboutResult.error
          );
        }

        const portfolioData: PortfolioData = {
          projects: projectsResult.data || [],
          aboutContent: aboutResult.data || null,
          isLoading: false,
          error: null,
          lastUpdated: new Date(),
        };

        setData(portfolioData);
        setRetryCount(0); // Reset retry count on success
        onSuccess?.(portfolioData);
      } catch (error) {
        // Don't handle errors if request was aborted
        if (abortController.signal.aborted) {
          return;
        }

        let appError: AppError;

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            appError = createNetworkError(
              "Request was cancelled",
              undefined,
              "portfolio-data",
              "GET"
            );
          } else {
            appError = createNetworkError(
              error.message,
              undefined,
              "portfolio-data",
              "GET"
            );
          }
        } else if (
          typeof error === "object" &&
          error !== null &&
          "code" in error
        ) {
          appError = error as AppError;
        } else {
          appError = createDataError(
            "Failed to fetch portfolio data",
            "UNKNOWN_ERROR",
            error
          );
        }

        // Log the error
        logError(appError, {
          attempt,
          maxRetries,
          component: "usePortfolioData",
          isRefresh,
        });

        // Set error state
        setData((prev) => ({
          ...prev,
          isLoading: false,
          error: appError,
        }));

        // Handle retry logic
        if (enableRetry && attempt < maxRetries && appError.retryable) {
          const nextAttempt = attempt + 1;
          setRetryCount(nextAttempt);
          onRetry?.(nextAttempt, appError);

          // Schedule retry with exponential backoff
          const delay = retryDelay * Math.pow(2, attempt);
          retryTimeoutRef.current = setTimeout(() => {
            fetchData(isRefresh, nextAttempt);
          }, delay);
        } else {
          setRetryCount(attempt);
          onError?.(appError);
        }
      } finally {
        setIsRefreshing(false);
      }
    },
    [
      createAbortController,
      enableRetry,
      maxRetries,
      retryDelay,
      onError,
      onSuccess,
      onRetry,
    ]
  );

  /**
   * Refetch data (alias for fetchData)
   */
  const refetch = useCallback(() => fetchData(false, 0), [fetchData]);

  /**
   * Refresh data (maintains current state while fetching)
   */
  const refresh = useCallback(() => fetchData(true, 0), [fetchData]);

  /**
   * Manual retry function
   */
  const retry = useCallback(() => fetchData(false, 0), [fetchData]);

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

    fetchData(false, 0);
  }, [enableCaching, fetchData]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData(false, 0);
    return cleanup;
  }, [fetchData, cleanup]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const canRetry =
    enableRetry && retryCount < maxRetries && data.error?.retryable === true;

  return {
    ...data,
    refetch,
    refresh,
    clearCache,
    isRefreshing,
    retryCount,
    canRetry,
    retry,
  };
}

/**
 * Hook for fetching portfolio data with error boundary integration
 */
export function usePortfolioDataWithErrorBoundary(
  options: UsePortfolioDataOptions = {}
) {
  const portfolioData = usePortfolioData({
    ...options,
    onError: (error) => {
      // Enhanced error logging for error boundary
      logError(error, {
        component: "usePortfolioDataWithErrorBoundary",
        url: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent:
          typeof window !== "undefined" ? navigator.userAgent : undefined,
      });

      options.onError?.(error);
    },
  });

  return portfolioData;
}

/**
 * Hook for portfolio data with user-friendly error messages
 */
export function usePortfolioDataWithUserFriendlyErrors(
  options: UsePortfolioDataOptions = {}
) {
  return usePortfolioData({
    ...options,
    onError: (error) => {
      // Show user-friendly error message
      const userMessage = getUserErrorMessage(error);
      console.error("Portfolio data error:", userMessage);

      // You could integrate with a toast notification system here
      if (typeof window !== "undefined" && (window as any).showToast) {
        (window as any).showToast({
          type: "error",
          title: "Failed to load portfolio data",
          message: userMessage,
        });
      }

      options.onError?.(error);
    },
  });
}
