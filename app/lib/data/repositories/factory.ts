/**
 * Repository factory for creating repository instances
 */

// 5:1 - Use `import type` for type-only imports
import type {
  BaseRepository,
  RepositoryConfig,
  RepositoryFactory,
} from "@/lib/types";
import { ProjectRepository } from "./project-repository";
import { TechnologyRepository } from "./technology-repository";
import { ContactRepository } from "./contact-repository";
import { AboutRepository } from "./about-repository";

/**
 * Default repository factory implementation
 */
export class DefaultRepositoryFactory implements RepositoryFactory {
  private repositories = new Map<string, BaseRepository<unknown>>();

  create<T>(entityType: string, config?: RepositoryConfig): BaseRepository<T> {
    const key = `${entityType}-${JSON.stringify(config || {})}`;

    if (this.repositories.has(key)) {
      return this.repositories.get(key)! as BaseRepository<T>;
    }

    let repository: BaseRepository<unknown>;

    switch (entityType.toLowerCase()) {
      case "project":
        repository = new ProjectRepository();
        break;
      case "technology":
        repository = new TechnologyRepository();
        break;
      case "contact":
        repository = new ContactRepository();
        break;
      case "about":
        repository = new AboutRepository();
        break;
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }

    this.repositories.set(key, repository);
    return repository as BaseRepository<T>;
  }

  clear(): void {
    this.repositories.clear();
  }

  getEntityTypes(): string[] {
    return ["project", "technology", "contact", "about"];
  }

  supports(entityType: string): boolean {
    return this.getEntityTypes().includes(entityType.toLowerCase());
  }
}

/**
 * Singleton instance of the repository factory
 */
export const repositoryFactory = new DefaultRepositoryFactory();

/**
 * Helper function to create a repository instance
 */
export function createRepository<T>(
  entityType: string,
  config?: RepositoryConfig
): BaseRepository<T> {
  return repositoryFactory.create<T>(entityType, config);
}

/**
 * Helper functions for specific repository types
 */
export function createProjectRepository(
  config?: RepositoryConfig
): ProjectRepository {
  return repositoryFactory.create<unknown>(
    "project",
    config
  ) as ProjectRepository;
}

export function createTechnologyRepository(
  config?: RepositoryConfig
): TechnologyRepository {
  return repositoryFactory.create<unknown>(
    "technology",
    config
  ) as TechnologyRepository;
}

export function createContactRepository(
  config?: RepositoryConfig
): ContactRepository {
  return repositoryFactory.create<unknown>(
    "contact",
    config
  ) as ContactRepository;
}

export function createAboutRepository(
  config?: RepositoryConfig
): AboutRepository {
  return repositoryFactory.create<unknown>("about", config) as AboutRepository;
}
