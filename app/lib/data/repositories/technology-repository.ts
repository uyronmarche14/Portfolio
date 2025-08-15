/**
 * Technology repository implementation
 */

import { 
  Technology, 
  CreateTechnologyInput, 
  UpdateTechnologyInput,
  TechnologyFilters,
  TechnologySearchParams,
  TechnologyStatistics,
  TechnologySkillGroup,
  TechnologySummary,
  DataResult,
  PaginationParams
} from '@/lib/types';
import { FileBasedRepository } from './base';
import { generateId } from '@/lib/utils';

/**
 * Technology repository for managing technology data
 */expor
t class TechnologyRepository extends FileBasedRepository<Technology, CreateTechnologyInput, UpdateTechnologyInput> {
  private dataFilePath: string;

  constructor(dataFilePath = '/content/data/technologies.json') {
    super({
      cacheEnabled: true,
      cacheTTL: 300, // 5 minutes
      enableLogging: true,
    });
    this.dataFilePath = dataFilePath;
  }

  /**
   * Load technology data from file
   */
  protected async loadData(): Promise<Technology[]> {
    try {
      // In a real implementation, this would read from a file
      // For now, return empty array - data will be loaded from actual file
      return [];
    } catch (error) {
      console.error('Failed to load technology data:', error);
      return [];
    }
  }

  /**
   * Save technology data to file
   */
  protected async saveData(data: Technology[]): Promise<void> {
    try {
      // In a real implementation, this would write to a file
      // For now, just log the operation
      console.log('Saving technology data:', data.length, 'items');
    } catch (error) {
      console.error('Failed to save technology data:', error);
      throw error;
    }
  }

  /**
   * Create a new technology entity with timestamps
   */
  protected createEntity(input: CreateTechnologyInput): Technology {
    const now = new Date();
    return {
      ...input,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Update an existing technology entity with new timestamp
   */
  protected updateEntity(existing: Technology, updates: UpdateTechnologyInput): Technology {
    return {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
  }

  /**
   * Get technologies by category
   */
  async getByCategory(category: string): Promise<DataResult<Technology[]>> {
    try {
      await this.ensureDataLoaded();
      
      const technologies = this.data.filter(tech => tech.category === category);
      
      return this.createDataResult(technologies);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get featured technologies
   */
  async getFeatured(): Promise<DataResult<Technology[]>> {
    try {
      await this.ensureDataLoaded();
      
      const featured = this.data
        .filter(tech => tech.featured && tech.visible)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return this.createDataResult(featured);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get technologies by proficiency level
   */
  async getByProficiency(proficiency: string): Promise<DataResult<Technology[]>> {
    try {
      await this.ensureDataLoaded();
      
      const technologies = this.data.filter(tech => tech.proficiency === proficiency);
      
      return this.createDataResult(technologies);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Search technologies with advanced filtering
   */
  async searchTechnologies(params: TechnologySearchParams): Promise<DataResult<Technology[]>> {
    try {
      await this.ensureDataLoaded();
      
      let results = [...this.data];
      
      // Apply text search
      if (params.query) {
        const query = params.query.toLowerCase();
        results = results.filter(tech => 
          tech.name.toLowerCase().includes(query) ||
          tech.displayName?.toLowerCase().includes(query) ||
          tech.description?.toLowerCase().includes(query) ||
          tech.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Apply filters
      if (params.filters) {
        const { category, proficiency, learningStatus, featured, tags } = params.filters;
        
        if (category && category.length > 0) {
          results = results.filter(tech => category.includes(tech.category));
        }
        
        if (proficiency && proficiency.length > 0) {
          results = results.filter(tech => proficiency.includes(tech.proficiency));
        }
        
        if (learningStatus && learningStatus.length > 0) {
          results = results.filter(tech => learningStatus.includes(tech.learningStatus));
        }
        
        if (featured !== undefined) {
          results = results.filter(tech => tech.featured === featured);
        }
        
        if (tags && tags.length > 0) {
          results = results.filter(tech => 
            tags.some(tag => tech.tags.includes(tag))
          );
        }
      }
      
      // Apply sorting
      if (params.sortBy) {
        results.sort((a, b) => {
          let aValue: any;
          let bValue: any;
          
          switch (params.sortBy) {
            case 'name':
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
              break;
            case 'category':
              aValue = a.category;
              bValue = b.category;
              break;
            case 'proficiency':
              // Sort by proficiency level (beginner < intermediate < advanced < expert)
              const proficiencyOrder = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
              aValue = proficiencyOrder[a.proficiency];
              bValue = proficiencyOrder[b.proficiency];
              break;
            case 'createdAt':
              aValue = a.createdAt.getTime();
              bValue = b.createdAt.getTime();
              break;
            case 'order':
              aValue = a.order || 0;
              bValue = b.order || 0;
              break;
            default:
              aValue = a.name.toLowerCase();
              bValue = b.name.toLowerCase();
          }
          
          if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
          if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
          return 0;
        });
      }
      
      return this.createDataResult(results);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get technology summaries for compact displays
   */
  async getSummaries(): Promise<DataResult<TechnologySummary[]>> {
    try {
      await this.ensureDataLoaded();
      
      const summaries: TechnologySummary[] = this.data.map(tech => ({
        id: tech.id,
        name: tech.name,
        displayName: tech.displayName,
        category: tech.category,
        icon: tech.icon,
        color: tech.color,
        proficiency: tech.proficiency,
        featured: tech.featured,
      }));
      
      return this.createDataResult(summaries);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get technology statistics
   */
  async getStatistics(): Promise<DataResult<TechnologyStatistics>> {
    try {
      await this.ensureDataLoaded();
      
      const stats: TechnologyStatistics = {
        total: this.data.length,
        byCategory: {} as Record<string, number>,
        byProficiency: {} as Record<string, number>,
        byLearningStatus: {} as Record<string, number>,
        featured: this.data.filter(tech => tech.featured).length,
        mostUsedInProjects: [], // This would be calculated based on project data
      };
      
      // Calculate category statistics
      this.data.forEach(tech => {
        stats.byCategory[tech.category] = (stats.byCategory[tech.category] || 0) + 1;
        stats.byProficiency[tech.proficiency] = (stats.byProficiency[tech.proficiency] || 0) + 1;
        stats.byLearningStatus[tech.learningStatus] = (stats.byLearningStatus[tech.learningStatus] || 0) + 1;
      });
      
      return this.createDataResult(stats);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get technologies grouped by category
   */
  async getSkillGroups(): Promise<DataResult<TechnologySkillGroup[]>> {
    try {
      await this.ensureDataLoaded();
      
      const groups = new Map<string, Technology[]>();
      
      // Group technologies by category
      this.data.forEach(tech => {
        if (!groups.has(tech.category)) {
          groups.set(tech.category, []);
        }
        groups.get(tech.category)!.push(tech);
      });
      
      // Convert to skill groups
      const skillGroups: TechnologySkillGroup[] = Array.from(groups.entries()).map(([category, technologies]) => ({
        id: generateId(),
        name: category.charAt(0).toUpperCase() + category.slice(1),
        category: category as any,
        technologies: technologies.sort((a, b) => a.name.localeCompare(b.name)),
        order: this.getCategoryOrder(category),
      }));
      
      // Sort groups by order
      skillGroups.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      return this.createDataResult(skillGroups);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get category display order
   */
  private getCategoryOrder(category: string): number {
    const order: Record<string, number> = {
      language: 1,
      frontend: 2,
      backend: 3,
      database: 4,
      mobile: 5,
      desktop: 6,
      devops: 7,
      cloud: 8,
      testing: 9,
      design: 10,
      framework: 11,
      library: 12,
      tool: 13,
      other: 14,
    };
    
    return order[category] || 99;
  }

  /**
   * Validate technology data
   */
  protected async validateData(data: any, operation: 'create' | 'update'): Promise<string[]> {
    const errors: string[] = [];
    
    if (operation === 'create') {
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
      }
      
      if (!data.category || typeof data.category !== 'string') {
        errors.push('Category is required and must be a string');
      }
      
      if (!data.proficiency || typeof data.proficiency !== 'string') {
        errors.push('Proficiency is required and must be a string');
      }
      
      if (!data.learningStatus || typeof data.learningStatus !== 'string') {
        errors.push('Learning status is required and must be a string');
      }
      
      if (!data.icon || typeof data.icon !== 'object') {
        errors.push('Icon configuration is required');
      }
      
      if (typeof data.featured !== 'boolean') {
        errors.push('Featured must be a boolean');
      }
      
      if (typeof data.visible !== 'boolean') {
        errors.push('Visible must be a boolean');
      }
      
      if (!Array.isArray(data.tags)) {
        errors.push('Tags must be an array');
      }
    }
    
    // Additional validation for updates
    if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim().length === 0)) {
      errors.push('Name must be a non-empty string');
    }
    
    return errors;
  }
}