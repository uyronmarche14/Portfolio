/**
 * Repository factory for creating repository instances
 */

import { BaseRepository, RepositoryConfig, RepositoryFactory } from '@/types';
import { ProjectRepository } from './project-repository';
import { TechnologyRepository } from './technology-repository';
import { ContactRepository } from './contact-repository';
import { AboutRepository } from './about-repository';

/**
 * Default repository factory implementation
 */
export class DefaultRepositoryFactory implements RepositoryFactory {
  private repositories = new Map<string, BaseRepository<any>>();

  /**
   * Create a repository instance for the specified entity type
   */
  create<T>(entityType: string, config?: RepositoryConfig): BaseRepository<T> {
    const key = `${entityType}-${JSON.stringify(config || {})}`;
    
    if (this.repositories.has(key)) {
      return this.repositories.get(key)!;
    }

    let repository: BaseRepository<any>;

    switch (entityType.toLowerCase()) {
      case 'project':
        repository = new ProjectRepository();
        break;
      case 'technology':
        repository = new TechnologyRepository();
        break;
      case 'contact':
        repository = new ContactRepository();
        break;
      case 'about':
        repository = new AboutRepository();
        break;
      default:
        throw new Error(`Unknown entity type: ${entityType}`);
    }

    this.repositories.set(key, repository);
    return repository;
  }

  /**
   * Clear all cached repository instances
   */
  clear(): void {
    this.repositories.clear();
  }

  /**
   * Get all registered entity types
   */
  getEntityTypes(): string[] {
    return ['project', 'technology', 'contact', 'about'];
  }

  /**
   * Check if an entity type is supported
   */
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
export function createRepository<T>(entityType: string, config?: RepositoryConfig): BaseRepository<T> {
  return repositoryFactory.create<T>(entityType, config);
}

/**
 * Helper functions for specific repository types
 */
export function createProjectRepository(config?: RepositoryConfig): ProjectRepository {
  return repositoryFactory.create<any>('project', config) as ProjectRepository;
}

export function createTechnologyRepository(config?: RepositoryConfig): TechnologyRepository {
  return repositoryFactory.create<any>('technology', config) as TechnologyRepository;
}

export function createContactRepository(config?: RepositoryConfig): ContactRepository {
  return repositoryFactory.create<any>('contact', config) as ContactRepository;
}

export function createAboutRepository(config?: RepositoryConfig): AboutRepository {
  return repositoryFactory.create<any>('about', config) as AboutRepository;
}