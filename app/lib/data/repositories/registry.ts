/**
 * Repository registry for managing multiple repositories
 */

import { BaseRepository, RepositoryRegistry } from "@/lib/types";

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
  forEach(
    callback: (repository: BaseRepository<any>, name: string) => void
  ): void {
    this.repositories.forEach(callback);
  }
}

/**
 * Enhanced repository registry with convenience methods
 */
export class RepositoryRegistry extends DefaultRepositoryRegistry {
  private static instance: RepositoryRegistry;

  private constructor() {
    super();
    this.initializeRepositories();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): RepositoryRegistry {
    if (!RepositoryRegistry.instance) {
      RepositoryRegistry.instance = new RepositoryRegistry();
    }
    return RepositoryRegistry.instance;
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
  public static getProjectRepository(): any {
    const instance = RepositoryRegistry.getInstance();
    if (!instance.has("project")) {
      const { ProjectRepository } = require("./project-repository");
      instance.register("project", new ProjectRepository());
    }
    return instance.get("project");
  }

  /**
   * Get technology repository
   */
  public static getTechnologyRepository(): any {
    const instance = RepositoryRegistry.getInstance();
    if (!instance.has("technology")) {
      const { TechnologyRepository } = require("./technology-repository");
      instance.register("technology", new TechnologyRepository());
    }
    return instance.get("technology");
  }

  /**
   * Get contact repository
   */
  public static getContactRepository(): any {
    const instance = RepositoryRegistry.getInstance();
    if (!instance.has("contact")) {
      const { ContactRepository } = require("./contact-repository");
      instance.register("contact", new ContactRepository());
    }
    return instance.get("contact");
  }

  /**
   * Get about repository
   */
  public static getAboutRepository(): any {
    const instance = RepositoryRegistry.getInstance();
    if (!instance.has("about")) {
      const { AboutRepository } = require("./about-repository");
      instance.register("about", new AboutRepository());
    }
    return instance.get("about");
  }
}

/**
 * Singleton instance of the repository registry
 */
export const repositoryRegistry = RepositoryRegistry.getInstance();

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
