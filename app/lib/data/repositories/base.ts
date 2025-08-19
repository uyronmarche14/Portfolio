/**
 * Base repository implementation with common functionality
 */

import { AbstractRepository } from "@/lib/types/repository";
import type { RepositoryConfig, RepositoryCache } from "@/lib/types/repository";
import type {
  DataResult,
  PaginatedResponse,
  PaginationParams,
  FilterParams,
} from "@/lib/types/common";

/**
 * In-memory cache implementation for development/testing
 */
export class InMemoryCache<T> implements RepositoryCache<T> {
  private cache = new Map<string, { value: T; expiry: number }>();

  async get(key: string): Promise<T | null> {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  async set(key: string, value: T, ttl = 300): Promise<void> {
    const expiry = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expiry });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);

    if (!item) return false;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }
}

/**
 * File-based repository implementation for static data
 */
export abstract class FileBasedRepository<
  T extends { id: string }, // <-- Add this constraint
  TCreate = Omit<T, "id" | "createdAt" | "updatedAt">,
  TUpdate = Partial<TCreate>,
> extends AbstractRepository<T, TCreate, TUpdate> {
  protected data: T[] = [];
  protected dataLoaded = false;

  constructor(config: RepositoryConfig = {}) {
    super(config);

    if (this.config.cacheEnabled) {
      this.cache = new InMemoryCache<T>();
    }
  }

  // Abstract method to load data from file/source
  protected abstract loadData(): Promise<T[]>;

  // Abstract method to save data to file/source
  protected abstract saveData(data: T[]): Promise<void>;

  // Abstract method to create entity with timestamps
  protected abstract createEntity(input: TCreate): T;

  // Abstract method to update entity with timestamps
  protected abstract updateEntity(existing: T, updates: TUpdate): T;

  /**
   * Ensure data is loaded
   */
  protected async ensureDataLoaded(): Promise<void> {
    if (!this.dataLoaded) {
      try {
        this.data = await this.loadData();
        this.dataLoaded = true;
      } catch (error) {
        console.error("Failed to load data:", error);
        this.data = [];
        this.dataLoaded = true;
      }
    }
  }

  /**
   * Get all entities
   */
  async getAll(params?: PaginationParams): Promise<DataResult<T[]>> {
    try {
      await this.ensureDataLoaded();

      let result = [...this.data];
      // Apply sorting if specified
      if (params?.sortBy) {
        result.sort((a, b) => {
          const aValue = (a as Record<string, unknown>)[params.sortBy!] as
            | string
            | number;
          const bValue = (b as Record<string, unknown>)[params.sortBy!] as
            | string
            | number;

          if (aValue < bValue) return params.sortOrder === "desc" ? 1 : -1;
          if (aValue > bValue) return params.sortOrder === "desc" ? -1 : 1;
          return 0;
        });
      }

      // Apply pagination if specified
      if (params?.page && params?.limit) {
        const startIndex = (params.page - 1) * params.limit;
        result = result.slice(startIndex, startIndex + params.limit);
      }

      return this.createDataResult(result);
    } catch (error) {
      return this.createDataResult([], {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error as unknown,
      });
    }
  }

  /**
   * Get paginated entities
   */
  async getPaginated(
    params: PaginationParams
  ): Promise<DataResult<PaginatedResponse<T>>> {
    try {
      await this.ensureDataLoaded();

      const result = [...this.data];

      // Apply sorting if specified
      if (params?.sortBy) {
        result.sort((a, b) => {
          const aValue = (a as Record<string, unknown>)[params.sortBy!] as
            | string
            | number;
          const bValue = (b as Record<string, unknown>)[params.sortBy!] as
            | string
            | number;

          if (aValue < bValue) return params.sortOrder === "desc" ? 1 : -1;
          if (aValue > bValue) return params.sortOrder === "desc" ? -1 : 1;
          return 0;
        });
      }

      const total = result.length;
      const totalPages = Math.ceil(total / params.limit);
      const startIndex = (params.page - 1) * params.limit;
      const paginatedData = result.slice(startIndex, startIndex + params.limit);

      const response: PaginatedResponse<T> = {
        data: paginatedData,
        pagination: {
          page: params.page,
          limit: params.limit,
          total,
          totalPages,
          hasNext: params.page < totalPages,
          hasPrev: params.page > 1,
        },
      };

      return this.createDataResult(response);
    } catch (error) {
      return this.createDataResult(null, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Get entity by ID
   */
  async getById(id: string): Promise<DataResult<T | null>> {
    try {
      // Check cache first
      if (this.config.cacheEnabled && this.cache) {
        const cached = await this.getCached(`entity:${id}`);
        if (cached) {
          return this.createDataResult(cached);
        }
      }

      await this.ensureDataLoaded();

      const entity = this.data.find((item) => item.id === id) || null;

      // Cache the result
      if (entity && this.config.cacheEnabled) {
        await this.setCached(`entity:${id}`, entity);
      }

      this.logEvent("Entity", id, "read");

      return this.createDataResult(entity);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error as unknown,
      });
    }
  }

  /**
   * Get entities by IDs
   */
  async getByIds(ids: string[]): Promise<DataResult<T[]>> {
    try {
      await this.ensureDataLoaded();

      const entities = this.data.filter((item) => ids.includes(item.id));

      return this.createDataResult(entities);
    } catch (error) {
      return this.createDataResult(null, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Create new entity
   */
  async create(item: TCreate): Promise<DataResult<T>> {
    try {
      // Validate input
      const validationErrors = await this.validateData(item, "create");
      if (validationErrors.length > 0) {
        return this.createDataResult(undefined, {
          type: "VALIDATION_ERROR",
          message: "Validation failed",
          details: validationErrors,
        });
      }

      await this.ensureDataLoaded();

      const entity = this.createEntity(item);
      this.data.push(entity);

      // Save to persistent storage
      await this.saveData(this.data);

      // Cache the new entity
      if (this.config.cacheEnabled) {
        await this.setCached(`entity:${entity.id}`, entity);
      }

      this.logEvent("Entity", entity.id, "create", undefined, entity);

      return this.createDataResult(entity);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Create multiple entities
   */
  async createMany(items: TCreate[]): Promise<DataResult<T[]>> {
    try {
      const results: T[] = [];

      for (const item of items) {
        const result = await this.create(item);
        if (result.error) {
          return this.createDataResult([], {
            type: "VALIDATION_ERROR",
            message: result.error?.message || "Validation failed",
            details: result.error?.details,
          });
        }
        if (result.data) {
          results.push(result.data);
        }
      }

      return this.createDataResult(results);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Update entity
   */
  async update(id: string, updates: TUpdate): Promise<DataResult<T>> {
    try {
      // Validate input
      const validationErrors = await this.validateData(updates, "update");
      if (validationErrors.length > 0) {
        return this.createDataResult(undefined, {
          type: "VALIDATION_ERROR",
          message: "Validation failed",
          details: validationErrors,
        });
      }

      await this.ensureDataLoaded();

      const index = this.data.findIndex((item) => item.id === id);
      if (index === -1) {
        return this.createDataResult(undefined, {
          type: "NOT_FOUND",
          message: `Entity with ID ${id} not found`,
        });
      }

      const existing = this.data[index];
      const updated = this.updateEntity(existing, updates);
      this.data[index] = updated;

      // Save to persistent storage
      await this.saveData(this.data);

      // Update cache
      if (this.config.cacheEnabled) {
        await this.setCached(`entity:${id}`, updated);
      }

      this.logEvent("Entity", id, "update", existing, updated);

      return this.createDataResult(updated);
    } catch (error) {
      return this.createDataResult(null, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Update multiple entities
   */
  async updateMany(
    updates: { id: string; data: TUpdate }[]
  ): Promise<DataResult<T[]>> {
    try {
      const results: T[] = [];

      for (const update of updates) {
        const result = await this.update(update.id, update.data);
        if (result.error) {
          return this.createDataResult([], {
            type: "VALIDATION_ERROR",
            message: result.error?.message || "Validation failed",
            details: result.error?.details,
          });
        }
        if (result.data) {
          results.push(result.data);
        }
      }

      return this.createDataResult(results);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Delete entity
   */
  async delete(id: string): Promise<DataResult<boolean>> {
    try {
      await this.ensureDataLoaded();

      const index = this.data.findIndex((item) => item.id === id);
      if (index === -1) {
        return this.createDataResult(false, {
          type: "NOT_FOUND",
          message: `Entity with ID ${id} not found`,
        });
      }

      const deleted = this.data.splice(index, 1)[0];

      // Save to persistent storage
      await this.saveData(this.data);

      // Remove from cache
      if (this.config.cacheEnabled) {
        await this.deleteCached(`entity:${id}`);
      }

      this.logEvent("Entity", id, "delete", deleted, undefined);

      return this.createDataResult(true);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error as unknown,
      });
    }
  }

  /**
   * Delete multiple entities
   */
  async deleteMany(ids: string[]): Promise<DataResult<boolean>> {
    try {
      for (const id of ids) {
        const result = await this.delete(id);
        if (result.error) {
          return this.createDataResult(false, {
            type: "VALIDATION_ERROR",
            message: result.error.message || "Validation failed",
            details: result.error.details,
          });
        }
      }

      return this.createDataResult(true);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Search entities
   */
  async search(
    query: string,
    params?: PaginationParams
  ): Promise<DataResult<T[]>> {
    try {
      await this.ensureDataLoaded();

      const searchTerm = query.toLowerCase();
      const filtered = this.data.filter((item) => {
        // Search in common string fields
        const searchableFields = ["title", "name", "description", "content"];
        return searchableFields.some((field) => {
          const value = (item as Record<string, unknown>)[field];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
          );
        });
      });

      // Apply pagination if specified
      let result = filtered;
      if (params?.page && params?.limit) {
        const startIndex = (params.page - 1) * params.limit;
        result = filtered.slice(startIndex, startIndex + params.limit);
      }

      return this.createDataResult(result);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Filter entities
   */
  async filter(
    filters: FilterParams,
    params?: PaginationParams
  ): Promise<DataResult<T[]>> {
    try {
      await this.ensureDataLoaded();

      let filtered = this.data.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null) return true;

          const itemValue = (item as Record<string, unknown>)[key];

          if (Array.isArray(value)) {
            return Array.isArray(itemValue)
              ? value.some((v) => (itemValue as unknown[]).includes(v))
              : String(itemValue)
                  .toLowerCase()
                  .includes(String(value).toLowerCase());
          }

          if (typeof itemValue === "string" && typeof value === "string") {
            return itemValue.toLowerCase().includes(value.toLowerCase());
          }

          return itemValue === value;
        });
      });

      // Apply sorting if specified
      if (params?.sortBy) {
        filtered.sort((a, b) => {
          const aValue = (a as Record<string, unknown>)[params.sortBy!] as
            | string
            | number;
          const bValue = (b as Record<string, unknown>)[params.sortBy!] as
            | string
            | number;

          if (aValue < bValue) return params.sortOrder === "desc" ? 1 : -1;
          if (aValue > bValue) return params.sortOrder === "desc" ? -1 : 1;
          return 0;
        });
      }

      // Apply pagination if specified
      if (params?.page && params?.limit) {
        const startIndex = (params.page - 1) * params.limit;
        filtered = filtered.slice(startIndex, startIndex + params.limit);
      }

      return this.createDataResult(filtered);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Check if entity exists
   */
  async exists(id: string): Promise<DataResult<boolean>> {
    try {
      await this.ensureDataLoaded();

      const exists = this.data.some((item) => item.id === id);

      return this.createDataResult(exists);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Count entities
   */
  async count(filters?: FilterParams): Promise<DataResult<number>> {
    try {
      if (filters) {
        const filtered = await this.filter(filters);
        return this.createDataResult(filtered.data?.length || 0);
      }

      await this.ensureDataLoaded();

      return this.createDataResult(this.data.length);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error as unknown,
      });
    }
  }
}
