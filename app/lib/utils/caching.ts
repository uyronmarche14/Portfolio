/**
 * Caching utilities for performance optimization
 */

import { AppError } from "@/lib/types/error";
import { createAppError, logError } from "./errorHandling";

/**
 * Cache entry interface
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
  lastAccessed: number;
}

/**
 * Cache configuration
 */
interface CacheConfig {
  maxSize: number;
  defaultTTL: number;
  cleanupInterval: number;
  enablePersistence: boolean;
  storageKey: string;
}

/**
 * In-memory cache with TTL and LRU eviction
 */
export class MemoryCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private config: CacheConfig;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 100,
      defaultTTL: 300000, // 5 minutes
      cleanupInterval: 60000, // 1 minute
      enablePersistence: false,
      storageKey: "portfolio_cache",
      ...config,
    };

    this.startCleanupTimer();

    if (this.config.enablePersistence) {
      this.loadFromStorage();
    }
  }

  /**
   * Get value from cache
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();

    // Check if expired
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    entry.hits++;
    entry.lastAccessed = now;

    return entry.data;
  }

  /**
   * Set value in cache
   */
  set(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      ttl: ttl || this.config.defaultTTL,
      hits: 0,
      lastAccessed: now,
    };

    // Check if we need to evict entries
    if (this.cache.size >= this.config.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, entry);

    if (this.config.enablePersistence) {
      this.saveToStorage();
    }
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete entry from cache
   */
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);

    if (deleted && this.config.enablePersistence) {
      this.saveToStorage();
    }

    return deleted;
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.cache.clear();

    if (this.config.enablePersistence) {
      this.clearStorage();
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.cache.values());
    const now = Date.now();

    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      totalHits: entries.reduce((sum, _entry) => sum + _entry.hits, 0),
      expired: entries.filter((_entry) => now - _entry.timestamp > _entry.ttl)
        .length,
      averageAge:
        entries.length > 0
          ? entries.reduce((sum, _entry) => sum + (now - _entry.timestamp), 0) /
            entries.length
          : 0,
    };
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    const entries = Array.from(this.cache.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, entry] = entries[i];
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    const entries = Array.from(this.cache.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, entry] = entries[i];
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach((key) => this.cache.delete(key));

    if (expiredKeys.length > 0 && this.config.enablePersistence) {
      this.saveToStorage();
    }
  }

  /**
   * Start cleanup timer
   */
  private startCleanupTimer(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Stop cleanup timer
   */
  private stopCleanupTimer(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }
  }

  /**
   * Load cache from localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();

        // Only load non-expired entries
        Object.entries(data).forEach(([key, entry]: [string, any]) => {
          if (now - entry.timestamp <= entry.ttl) {
            this.cache.set(key, {
              ...entry,
              lastAccessed: now,
            });
          }
        });
      }
    } catch (error) {
      console.warn("Failed to load cache from storage:", error);
    }
  }

  /**
   * Save cache to localStorage
   */
  private saveToStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const data = Object.fromEntries(this.cache.entries());
      localStorage.setItem(this.config.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save cache to storage:", error);
    }
  }

  /**
   * Clear cache from localStorage
   */
  private clearStorage(): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(this.config.storageKey);
    } catch (error) {
      console.warn("Failed to clear cache from storage:", error);
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopCleanupTimer();
    this.clear();
  }
}

/**
 * Global cache instances
 */
export const dataCache = new MemoryCache({
  maxSize: 50,
  defaultTTL: 300000, // 5 minutes
  enablePersistence: true,
  storageKey: "portfolio_data_cache",
});

export const imageCache = new MemoryCache({
  maxSize: 100,
  defaultTTL: 3600000, // 1 hour
  enablePersistence: false,
  storageKey: "portfolio_image_cache",
});

export const apiCache = new MemoryCache({
  maxSize: 30,
  defaultTTL: 600000, // 10 minutes
  enablePersistence: true,
  storageKey: "portfolio_api_cache",
});

/**
 * Cache-aware fetch wrapper
 */
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: {
    ttl?: number;
    cache?: MemoryCache<T>;
    forceRefresh?: boolean;
  } = {}
): Promise<T> {
  const { ttl, cache = dataCache, forceRefresh = false } = options;

  // Check cache first (unless force refresh)
  if (!forceRefresh) {
    const cached = cache.get(key);
    if (cached !== null) {
      return cached;
    }
  }

  try {
    // Fetch fresh data
    const data = await fetchFn();

    // Cache the result
    cache.set(key, data, ttl);

    return data;
  } catch (error) {
    // If fetch fails and we have stale data, return it
    const stale = cache.get(key);
    if (stale !== null) {
      console.warn("Using stale cache data due to fetch error:", error);
      return stale;
    }

    throw error;
  }
}

/**
 * Memoization with cache
 */
export function memoizeWithCache<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  options: {
    cache?: MemoryCache<TReturn>;
    keyFn?: (...args: TArgs) => string;
    ttl?: number;
  } = {}
): (...args: TArgs) => TReturn {
  const {
    cache = new MemoryCache<TReturn>({ maxSize: 50 }),
    keyFn = (...args) => JSON.stringify(args),
    ttl,
  } = options;

  return (...args: TArgs): TReturn => {
    const key = keyFn(...args);

    // Check cache
    const cached = cache.get(key);
    if (cached !== null) {
      return cached;
    }

    // Compute and cache result
    const result = fn(...args);
    cache.set(key, result, ttl);

    return result;
  };
}

/**
 * Async memoization with cache
 */
export function memoizeAsyncWithCache<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: {
    cache?: MemoryCache<TReturn>;
    keyFn?: (...args: TArgs) => string;
    ttl?: number;
  } = {}
): (...args: TArgs) => Promise<TReturn> {
  const {
    cache = new MemoryCache<TReturn>({ maxSize: 50 }),
    keyFn = (...args) => JSON.stringify(args),
    ttl,
  } = options;

  const pendingPromises = new Map<string, Promise<TReturn>>();

  return async (...args: TArgs): Promise<TReturn> => {
    const key = keyFn(...args);

    // Check cache
    const cached = cache.get(key);
    if (cached !== null) {
      return cached;
    }

    // Check if already computing
    const pending = pendingPromises.get(key);
    if (pending) {
      return pending;
    }

    // Compute result
    const promise = fn(...args)
      .then((result) => {
        cache.set(key, result, ttl);
        pendingPromises.delete(key);
        return result;
      })
      .catch((error) => {
        pendingPromises.delete(key);
        throw error;
      });

    pendingPromises.set(key, promise);
    return promise;
  };
}

/**
 * Cache invalidation utilities
 */
export const cacheInvalidation = {
  /**
   * Invalidate cache entries by pattern
   */
  invalidateByPattern(pattern: RegExp, cache: MemoryCache = dataCache): number {
    let count = 0;
    const keysToDelete: string[] = [];

    // We can't iterate over Map keys directly with patterns, so we need to collect them first
    // This is a limitation of the current implementation
    console.warn(
      "Pattern-based invalidation not fully implemented for MemoryCache"
    );

    return count;
  },

  /**
   * Invalidate cache entries by prefix
   */
  invalidateByPrefix(prefix: string, cache: MemoryCache = dataCache): number {
    let count = 0;
    const keysToDelete: string[] = [];

    // Similar limitation as above
    console.warn(
      "Prefix-based invalidation not fully implemented for MemoryCache"
    );

    return count;
  },

  /**
   * Invalidate all caches
   */
  invalidateAll(): void {
    dataCache.clear();
    imageCache.clear();
    apiCache.clear();
  },
};

/**
 * Cache warming utilities
 */
export const cacheWarming = {
  /**
   * Warm up cache with predefined data
   */
  async warmUp<T>(
    entries: Array<{
      key: string;
      fetchFn: () => Promise<T>;
      ttl?: number;
      cache?: MemoryCache<T>;
    }>
  ): Promise<void> {
    const promises = entries.map(
      async ({ key, fetchFn, ttl, cache = dataCache }) => {
        try {
          const data = await fetchFn();
          cache.set(key, data, ttl);
        } catch (error) {
          console.warn(`Failed to warm up cache for key: ${key}`, error);
        }
      }
    );

    await Promise.allSettled(promises);
  },

  /**
   * Preload critical data
   */
  async preloadCriticalData(): Promise<void> {
    // This would be implemented based on your specific data needs
    console.log("Preloading critical data...");
  },
};

/**
 * React hook for cached data
 */
export function useCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: {
    ttl?: number;
    cache?: MemoryCache<T>;
    enabled?: boolean;
  } = {}
) {
  const { ttl, cache = dataCache, enabled = true } = options;

  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AppError | null>(null);

  const fetchData = React.useCallback(
    async (forceRefresh = false) => {
      if (!enabled) return;

      try {
        setLoading(true);
        setError(null);

        const result = await cachedFetch(key, fetchFn, {
          ttl,
          cache,
          forceRefresh,
        });

        setData(result);
      } catch (err) {
        const appError =
          err instanceof Error
            ? createAppError(
                "CACHE_FETCH_ERROR",
                err.message,
                "system",
                "medium",
                { cause: err }
              )
            : createAppError(
                "CACHE_FETCH_ERROR",
                "Unknown cache fetch error",
                "system",
                "medium"
              );

        setError(appError);
        logError(appError, { key, component: "useCachedData" });
      } finally {
        setLoading(false);
      }
    },
    [key, fetchFn, ttl, cache, enabled]
  );

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
    refresh: () => fetchData(false),
  };
}

// Make React available for the hook
import * as React from "react";
