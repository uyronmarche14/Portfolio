/**
 * Repository pattern interfaces and base classes for data access layer
 */

import type {
  DataResult,
  PaginatedResponse,
  PaginationParams,
  FilterParams,
} from "./common";

/**
 * Base repository interface defining common CRUD operations
 */
export interface BaseRepository<
  T,
  TCreate extends Omit<T, "id" | "createdAt" | "updatedAt"> = Omit<T, "id" | "createdAt" | "updatedAt">,
  TUpdate extends Partial<TCreate> = Partial<TCreate>,
> {
  // Read operations
  getAll(params?: PaginationParams): Promise<DataResult<T[]>>;
  getPaginated(
    params: PaginationParams
  ): Promise<DataResult<PaginatedResponse<T>>>;
  getById(id: string): Promise<DataResult<T | null>>;
  getByIds(ids: string[]): Promise<DataResult<T[]>>;

  // Create operations
  create(item: TCreate): Promise<DataResult<T>>;
  createMany(items: TCreate[]): Promise<DataResult<T[]>>;

  // Update operations
  update(id: string, updates: TUpdate): Promise<DataResult<T>>;
  updateMany(
    updates: { id: string; data: TUpdate }[]
  ): Promise<DataResult<T[]>>;

  // Delete operations
  delete(id: string): Promise<DataResult<boolean>>;
  deleteMany(ids: string[]): Promise<DataResult<boolean>>;

  // Search and filter operations
  search(query: string, params?: PaginationParams): Promise<DataResult<T[]>>;
  filter(
    filters: FilterParams,
    params?: PaginationParams
  ): Promise<DataResult<T[]>>;

  // Utility operations
  exists(id: string): Promise<DataResult<boolean>>;
  count(filters?: FilterParams): Promise<DataResult<number>>;
}

/**
 * Repository configuration interface
 */
export interface RepositoryConfig {
  cacheEnabled?: boolean;
  cacheTTL?: number; // Time to live in seconds
  validateOnCreate?: boolean;
  validateOnUpdate?: boolean;
  enableSoftDelete?: boolean;
  enableAuditLog?: boolean;
}

/**
 * Repository error types
 */
export type RepositoryErrorType =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "DUPLICATE_ERROR"
  | "PERMISSION_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

/**
 * Repository error interface
 */
export interface RepositoryError {
  type: RepositoryErrorType;
  message: string;
  details?: unknown;
  field?: string;
  code?: string;
}

/**
 * Repository operation context
 */
export interface RepositoryContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  timestamp: Date;
  source?: string;
}

/**
 * Repository event interface for audit logging
 */
export interface RepositoryEvent {
  id: string;
  entityType: string;
  entityId: string;
  operation: "create" | "read" | "update" | "delete";
  context: RepositoryContext;
  before?: unknown;
  after?: unknown;
  timestamp: Date;
}

/**
 * Cache interface for repository caching
 */
export interface RepositoryCache<T> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  has(key: string): Promise<boolean>;
}

/**
 * Validation interface for repository data validation
 */
export interface RepositoryValidator<T> {
  validate(data: T): Promise<{ isValid: boolean; errors: RepositoryError[] }>;
  validateCreate(
    data: Omit<T, "id" | "createdAt" | "updatedAt">
  ): Promise<{ isValid: boolean; errors: RepositoryError[] }>;
  validateUpdate(
    data: Partial<T>
  ): Promise<{ isValid: boolean; errors: RepositoryError[] }>;
}

/**
 * Abstract base repository class with common functionality
 */
export abstract class AbstractRepository<
  T,
  TCreate extends Omit<T, "id" | "createdAt" | "updatedAt"> = Omit<T, "id" | "createdAt" | "updatedAt">,
  TUpdate extends Partial<TCreate> = Partial<TCreate>,
> implements BaseRepository<T, TCreate, TUpdate> {
  protected config: RepositoryConfig;
  protected cache?: RepositoryCache<T>;
  protected validator?: RepositoryValidator<T>;

  constructor(config: RepositoryConfig = {}) {
    this.config = {
      cacheEnabled: false,
      cacheTTL: 300, // 5 minutes default
      validateOnCreate: true,
      validateOnUpdate: true,
      enableSoftDelete: false,
      enableAuditLog: false,
      ...config,
    };
  }

  // Abstract methods that must be implemented by concrete repositories
  abstract getAll(params?: PaginationParams): Promise<DataResult<T[]>>;
  abstract getPaginated(
    params: PaginationParams
  ): Promise<DataResult<PaginatedResponse<T>>>;
  abstract getById(id: string): Promise<DataResult<T | null>>;
  abstract getByIds(ids: string[]): Promise<DataResult<T[]>>;
  abstract create(item: TCreate): Promise<DataResult<T>>;
  abstract createMany(items: TCreate[]): Promise<DataResult<T[]>>;
  abstract update(id: string, updates: TUpdate): Promise<DataResult<T>>;
  abstract updateMany(
    updates: { id: string; data: TUpdate }[]
  ): Promise<DataResult<T[]>>;
  abstract delete(id: string): Promise<DataResult<boolean>>;
  abstract deleteMany(ids: string[]): Promise<DataResult<boolean>>;
  abstract search(
    query: string,
    params?: PaginationParams
  ): Promise<DataResult<T[]>>;
  abstract filter(
    filters: FilterParams,
    params?: PaginationParams
  ): Promise<DataResult<T[]>>;
  abstract exists(id: string): Promise<DataResult<boolean>>;
  abstract count(filters?: FilterParams): Promise<DataResult<number>>;

  // Helper methods for common operations
  protected createDataResult<U>(
    data: U,
    error?: RepositoryError,
    loading = false
  ): DataResult<U> {
    return {
      data,
      error: error
        ? {
            code: error.type,
            message: error.message,
            details: error.details,
          }
        : undefined,
      loading,
    };
  }

  protected generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  protected async validateData(
    data: unknown,
    operation: "create" | "update"
  ): Promise<RepositoryError[]> {
    if (
      !this.validator ||
      (!this.config.validateOnCreate && operation === "create") ||
      (!this.config.validateOnUpdate && operation === "update")
    ) {
      return [];
    }

    const result =
      operation === "create"
        ? await this.validator.validateCreate(data as TCreate)
        : await this.validator.validateUpdate(data as Partial<T>);

    return result.errors;
  }

  protected async getCached(key: string): Promise<T | null> {
    if (!this.config.cacheEnabled || !this.cache) {
      return null;
    }
    return await this.cache.get(key);
  }

  protected async setCached(key: string, value: T): Promise<void> {
    if (!this.config.cacheEnabled || !this.cache) {
      return;
    }
    await this.cache.set(key, value, this.config.cacheTTL);
  }

  protected async deleteCached(key: string): Promise<void> {
    if (!this.config.cacheEnabled || !this.cache) {
      return;
    }
    await this.cache.delete(key);
  }

  protected logEvent(
    entityType: string,
    entityId: string,
    operation: "create" | "read" | "update" | "delete",
    before?: unknown,
    after?: unknown
  ): void {
    if (!this.config.enableAuditLog) {
      return;
    }

    const event: RepositoryEvent = {
      id: this.generateId(),
      entityType,
      entityId,
      operation,
      context: {
        timestamp: new Date(),
      },
      before,
      after,
      timestamp: new Date(),
    };

    // Log the event (implementation depends on logging system)
    console.log("Repository Event:", event);
  }

  // Replace console.log with console.warn
  protected logOperation(operation: string, data?: unknown): void {
    // debugging helper - keep allowed console methods only
    console.warn(`[${this.constructor.name}] ${operation}`, data);
  }
}

/**
 * Repository factory interface for creating repository instances
 */
export interface RepositoryFactory {
  create<T>(entityType: string, config?: RepositoryConfig): BaseRepository<T>;
}

/**
 * Repository registry for managing multiple repositories
 */
export interface RepositoryRegistry {
  register<T>(name: string, repository: BaseRepository<T>): void;
  get<T>(name: string): BaseRepository<T> | undefined;
  has(name: string): boolean;
  remove(name: string): boolean;
  clear(): void;
  list(): string[];
}
