/**
 * Repository registry for managing multiple repositories
 */

import type { BaseRepository, RepositoryRegistry } from "@/lib/types";
import { ProjectRepository } from "./project-repository";
import { TechnologyRepository } from "./technology-repository";
import { ContactRepository } from "./contact-repository";
import { AboutRepository } from "./about-repository";

/**
 * Default repository registry implementation
 */
export class DefaultRepositoryRegistry implements RepositoryRegistry {
  private repositories = new Map<string, BaseRepository<unknown>>();

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
    return this.repositories.get(name) as BaseRepository<T> | undefined;
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
  entries(): Array<[string, BaseRepository<unknown>]> {
    return Array.from(this.repositories.entries());
  }

  forEach(
    callback: (repository: BaseRepository<unknown>, name: string) => void
  ): void {
    this.repositories.forEach(callback);
  }
}

/**
 * Enhanced repository registry with convenience methods
 */
export class EnhancedRepositoryRegistry extends DefaultRepositoryRegistry {
  private static instance: EnhancedRepositoryRegistry;

  private constructor() {
    super();
    this.initializeRepositories();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): EnhancedRepositoryRegistry {
    if (!EnhancedRepositoryRegistry.instance) {
      EnhancedRepositoryRegistry.instance = new EnhancedRepositoryRegistry();
    }
    return EnhancedRepositoryRegistry.instance;
  }

  /**
   * Initialize default repositories
   */
  private initializeRepositories(): void {
    // Lazy initialization - repositories will be created when first accessed
  }

  /**
   * Get project repository
   */
  public static getProjectRepository(): ProjectRepository {
    const instance = EnhancedRepositoryRegistry.getInstance();
    if (!instance.has("project")) {
      instance.register("project", new ProjectRepository());
    }
    return instance.get("project") as ProjectRepository;
  }

  /**
   * Get technology repository
   */
  public static getTechnologyRepository(): TechnologyRepository {
    const instance = EnhancedRepositoryRegistry.getInstance();
    if (!instance.has("technology")) {
      instance.register("technology", new TechnologyRepository());
    }
    return instance.get("technology") as TechnologyRepository;
  }

  /**
   * Get contact repository
   */
  public static getContactRepository(): ContactRepository {
    const instance = EnhancedRepositoryRegistry.getInstance();
    if (!instance.has("contact")) {
      instance.register("contact", new ContactRepository());
    }
    return instance.get("contact") as ContactRepository;
  }

  /**
   * Get about repository
   */
  public static getAboutRepository(): AboutRepository {
    const instance = EnhancedRepositoryRegistry.getInstance();
    if (!instance.has("about")) {
      instance.register("about", new AboutRepository());
    }
    return instance.get("about") as AboutRepository;
  }
}

/**
 * Singleton instance of the repository registry
 */
export const repositoryRegistry = EnhancedRepositoryRegistry.getInstance();

/**
 * Helper function to register a repository
 */
export function registerRepository<T>(
  name: string,
  repository: BaseRepository<T>
): void {
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
