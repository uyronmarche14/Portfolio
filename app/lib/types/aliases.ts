/**
 * Common type aliases for convenience and consistency
 */

/**
 * Standard ID type - can be string or number based on implementation
 */
export type ID = string;

/**
 * Timestamp type for consistent date handling
 */
export type Timestamp = Date;

/**
 * Optional ID type for entities that may not have an ID yet
 */
export type OptionalId<T> = Omit<T, "id"> & { id?: ID };

/**
 * Generic create input type that omits auto-generated fields
 */
export type CreateInput<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

/**
 * Generic update input type that makes all fields optional except ID
 */
export type UpdateInput<T> = Partial<
  Omit<T, "id" | "createdAt" | "updatedAt">
> & { id: ID };

/**
 * Generic entity with timestamps
 */
export type EntityWithTimestamps<T> = T & {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

/**
 * Generic entity without timestamps (for input types)
 */
export type EntityWithoutTimestamps<T> = Omit<T, "createdAt" | "updatedAt">;

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Maybe type helper (nullable or undefined)
 */
export type Maybe<T> = T | null | undefined;

/**
 * Non-nullable type helper
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Deep partial type helper
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep required type helper
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Exact type helper to prevent excess properties
 */
export type Exact<T, U extends T> = T &
  Record<Exclude<keyof U, keyof T>, never>;

/**
 * Union to intersection type helper
 */
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Flatten type helper to resolve complex types
 */
export type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * Mutable type helper to remove readonly modifiers
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Immutable type helper to add readonly modifiers
 */
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Key-value pair type
 */
export type KeyValue<
  K extends string | number | symbol = string,
  V = any,
> = Record<K, V>;

/**
 * String literal union helper
 */
export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

/**
 * Number literal union helper
 */
export type NumberLiteral<T> = T extends number
  ? number extends T
    ? never
    : T
  : never;

/**
 * Primitive types union
 */
export type Primitive = string | number | boolean | null | undefined;

/**
 * Serializable types (JSON-compatible)
 */
export type Serializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Serializable[]
  | { [key: string]: Serializable };

/**
 * Function type helpers
 */
export type AnyFunction = (...args: any[]) => any;
export type VoidFunction = () => void;
export type AsyncFunction<T = unknown> = () => Promise<T>;

/**
 * Event handler type
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * Callback type
 */
export type Callback<T = void> = () => T;
export type CallbackWithArgs<TArgs extends any[] = any[], TReturn = void> = (
  ...args: TArgs
) => TReturn;

/**
 * Promise resolver type
 */
export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
export type PromiseRejecter = (reason?: any) => void;

/**
 * Constructor type
 */
export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Abstract constructor type
 */
export type AbstractConstructor<T = {}> = abstract new (...args: any[]) => T;

/**
 * Class type
 */
export type Class<T = {}> = Constructor<T>;

/**
 * Mixin type
 */
export type Mixin<T extends Constructor> = T & Constructor;

/**
 * Error callback type
 */
export type ErrorCallback = (err?: unknown) => void;

/**
 * Data callback type
 */
export type DataCallback<T> = (data: T) => void;

/**
 * Error handler type
 */
export type ErrorHandler = (error: Error) => void;

/**
 * Base object interface
 */
export interface BaseObject {
  [key: string]: unknown;
}

/**
 * Async operation type
 */
export type AsyncOperation<T = unknown> = () => Promise<T>;

/**
 * Validation result type
 */
export type ValidationResult<T = unknown> = { isValid: boolean; errors?: E[] };

/**
 * Transform function type
 */
export type TransformFunction<T = unknown, R = unknown> = (data: T) => R;

/**
 * Filter predicate type
 */
export type FilterPredicate<T = unknown> = (item: T) => boolean;

/**
 * Data mapper type
 */
export type DataMapper<T = unknown, R = unknown> = (data: T) => R;

/**
 * Error transformer type
 */
export type ErrorTransformer = (error: Error) => Error;

/**
 * Use `object` for "any non-primitive object" intent, `unknown` for any value
 */
type AnyRecord = Record<string, unknown>;

/**
 * Prefer `unknown` instead of `any` where concrete type is not known
 */
type AnyValue = unknown;

/**
 * Replace bare `any` in common aliases with unknown or generic forms
 */
export type Result<_E, _T> = { error?: unknown; data?: unknown };
