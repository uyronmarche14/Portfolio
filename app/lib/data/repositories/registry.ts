/**
 * Repository registry for managing multiple repositories
 */

import { BaseRepository, RepositoryRegistry } from '@/types';

/**
 * Default repository registry implementation
 */
export class DefaultRepositoryRegistry implements RepositoryRegistry {
  private repositories = new Map<string, BaseRepository<any>>();

  /**
   * Register a repository with a given name
   */
  register<T>(name: string, repository: BaseRepository<T>): void {
    this.repositories.set(name, repository);
  }

  /**
   * Get a repository by name
   */
  get<T>(name: string): BaseRepository<T> | undefined {
    return this.repositories.get(name);
  }

  /**
   * Check if a repository is registered
   */
  has(name: string): boolean {
    return this.repositories.has(name);
  }

  /**
   * Remove a repository from the registry
   */
  remove(name: string): boolean {
    return this.repositories.delete(name);
  }

  /**
   * Clear all repositories from the registry
   */
  clear(): void {
    this.repositories.clear();
  }

  /**
   * List all registered repository names
   */
  list(): string[] {
    return Array.from(this.repositories.keys());
  }

  /**
   * Get the number of registered repositories
   */
  size(): number {
    return this.repositories.size;
  }

  /**
   * Get all repositories as an array of [name, repository] pairs
   */
  entries(): [string, BaseRepository<any>][] {
    return Array.from(this.repositories.entries());
  }

  /**
   * Execute a function for each registered repository
   */
  forEach(callback: (repository: BaseRepository<any>, name: string) => void): void {
    this.repositories.forEach(callback);
  }
}

/**
 * Singleton instance of the repository registry
 */
export const repositoryRegistry = new DefaultRepositoryRegistry();

/**
 * Helper function to register a repository
 */
export function registerRepository<T>(name: string, repository: BaseRepository<T>): void {
  repositoryRegistry.register(name, repository);
}

/**
 * Helper function to get a repository
 */
export function getRepository<T>(name: string): BaseRepository<T> | undefined {
  return repositoryRegistry.get<T>(name);
}

/**
 * Helper function to check if a repository exists
 */
export function hasRepository(name: string): boolean {
  return repositoryRegistry.has(name);
}

/**
 * Helper function to remove a repository
 */
export function removeRepository(name: string): boolean {
  return repositoryRegistry.remove(name);
}

/**
 * Helper function to list all repository names
 */
export function listRepositories(): string[] {
  return repositoryRegistry.list();
}