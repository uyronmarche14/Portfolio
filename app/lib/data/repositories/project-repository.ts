/**
 * Project repository implementation
 */

import { 
  Project, 
  CreateProjectInput, 
  UpdateProjectInput,
  ProjectFilters,
  ProjectSearchParams,
  ProjectStatistics,
  DataResult,
  PaginationParams
} from '@/types';
import { FileBasedRepository } from './base';
import { validateProject, validateCreateProjectInput, validateUpdateProjectInput } from '@/validation';

/**
 * Project repository for managing project data
 */
export class ProjectRepository extends FileBasedRepository<Project, CreateProjectInput, UpdateProjectInput> {
  
  /**
   * Load projects from data source
   */
  protected async loadData(): Promise<Project[]> {
    try {
      // In a real implementation, this would load from a file or API
      // For now, we'll return an empty array and let the data be populated through create operations
      const { projects } = await import('@/data/projects');
      
      // Transform the imported data to match our Project interface
      return projects.map(project => ({
        ...project,
        id: project.id,
        createdAt: new Date(project.timeline?.[0]?.date || Date.now()),
        updatedAt: new Date(),
        category: 'web' as const, // Default category
        status: 'completed' as const, // Default status
        content: project.paragraph,
        features: project.features.map((feature, index) => ({
          id: `${project.id}-feature-${index}`,
          title: feature,
          description: feature,
          implemented: true,
          priority: 'medium' as const,
        })),
        images: [
          {
            url: project.image,
            alt: `${project.title} preview`,
            type: 'preview' as const,
            featured: true,
          },
          ...project.screenshots.map((screenshot, index) => ({
            url: screenshot,
            alt: `${project.title} screenshot ${index + 1}`,
            type: 'screenshot' as const,
            order: index,
          })),
        ],
        technologies: project.technologies.map((tech, index) => ({
          id: `tech-${tech.toLowerCase().replace(/\s+/g, '-')}`,
          name: tech,
          category: 'other' as const,
          icon: {
            name: tech.toLowerCase(),
            type: 'icon' as const,
          },
          proficiency: 'advanced' as const,
          learningStatus: 'proficient' as const,
          featured: false,
          visible: true,
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        links: [
          ...(project.githubUrl ? [{
            url: project.githubUrl,
            label: 'GitHub Repository',
            type: 'github' as const,
            primary: true,
          }] : []),
          ...(project.liveUrl ? [{
            url: project.liveUrl,
            label: 'Live Demo',
            type: 'demo' as const,
            primary: false,
          }] : []),
          ...(project.liveDemoUrl && project.liveDemoUrl !== project.liveUrl ? [{
            url: project.liveDemoUrl,
            label: 'Live Demo',
            type: 'demo' as const,
            primary: false,
          }] : []),
        ],
        timeline: project.timeline?.map(event => ({
          date: new Date(event.date),
          title: event.title,
          description: event.description,
          milestone: true,
        })),
        featured: true,
        tags: project.technologies.map(tech => tech.toLowerCase()),
        visible: true,
      }));
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  }

  /**
   * Save projects to data source
   */
  protected async saveData(data: Project[]): Promise<void> {
    // In a real implementation, this would save to a file or API
    // For now, we'll just log the operation
    console.log(`Saving ${data.length} projects to data source`);
  }

  /**
   * Create a new project entity with timestamps
   */
  protected createEntity(input: CreateProjectInput): Project {
    const now = new Date();
    return {
      ...input,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Update an existing project entity with new timestamp
   */
  protected updateEntity(existing: Project, updates: UpdateProjectInput): Project {
    return {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
  }

  /**
   * Get featured projects
   */
  async getFeatured(): Promise<DataResult<Project[]>> {
    try {
      await this.ensureDataLoaded();
      
      const featured = this.data.filter(project => project.featured);
      
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
   * Get projects by technology
   */
  async getByTechnology(technologyName: string): Promise<DataResult<Project[]>> {
    try {
      await this.ensureDataLoaded();
      
      const filtered = this.data.filter(project => 
        project.technologies.some(tech => 
          tech.name.toLowerCase().includes(technologyName.toLowerCase())
        )
      );
      
      return this.createDataResult(filtered);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get projects by category
   */
  async getByCategory(category: Project['category']): Promise<DataResult<Project[]>> {
    try {
      await this.ensureDataLoaded();
      
      const filtered = this.data.filter(project => project.category === category);
      
      return this.createDataResult(filtered);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get projects by status
   */
  async getByStatus(status: Project['status']): Promise<DataResult<Project[]>> {
    try {
      await this.ensureDataLoaded();
      
      const filtered = this.data.filter(project => project.status === status);
      
      return this.createDataResult(filtered);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Search projects with advanced parameters
   */
  async searchProjects(params: ProjectSearchParams): Promise<DataResult<Project[]>> {
    try {
      await this.ensureDataLoaded();
      
      let filtered = [...this.data];
      
      // Apply text search
      if (params.query) {
        const searchTerm = params.query.toLowerCase();
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.content.toLowerCase().includes(searchTerm) ||
          project.technologies.some(tech => tech.name.toLowerCase().includes(searchTerm)) ||
          project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply filters
      if (params.filters) {
        const filters = params.filters;
        
        if (filters.category?.length) {
          filtered = filtered.filter(project => filters.category!.includes(project.category));
        }
        
        if (filters.status?.length) {
          filtered = filtered.filter(project => filters.status!.includes(project.status));
        }
        
        if (filters.technologies?.length) {
          filtered = filtered.filter(project => 
            filters.technologies!.some(tech => 
              project.technologies.some(projectTech => 
                projectTech.name.toLowerCase().includes(tech.toLowerCase())
              )
            )
          );
        }
        
        if (filters.featured !== undefined) {
          filtered = filtered.filter(project => project.featured === filters.featured);
        }
        
        if (filters.tags?.length) {
          filtered = filtered.filter(project => 
            filters.tags!.some(tag => 
              project.tags.some(projectTag => 
                projectTag.toLowerCase().includes(tag.toLowerCase())
              )
            )
          );
        }
        
        if (filters.dateRange) {
          filtered = filtered.filter(project => {
            const projectDate = project.createdAt;
            const start = filters.dateRange!.start;
            const end = filters.dateRange!.end;
            
            return projectDate >= start && (!end || projectDate <= end);
          });
        }
      }
      
      // Apply sorting
      if (params.sortBy) {
        filtered.sort((a, b) => {
          let aValue: any;
          let bValue: any;
          
          switch (params.sortBy) {
            case 'title':
              aValue = a.title;
              bValue = b.title;
              break;
            case 'createdAt':
              aValue = a.createdAt;
              bValue = b.createdAt;
              break;
            case 'updatedAt':
              aValue = a.updatedAt;
              bValue = b.updatedAt;
              break;
            case 'priority':
              aValue = a.priority || 0;
              bValue = b.priority || 0;
              break;
            case 'status':
              aValue = a.status;
              bValue = b.status;
              break;
            default:
              return 0;
          }
          
          if (aValue < bValue) return params.sortOrder === 'desc' ? 1 : -1;
          if (aValue > bValue) return params.sortOrder === 'desc' ? -1 : 1;
          return 0;
        });
      }
      
      return this.createDataResult(filtered);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get project statistics
   */
  async getStatistics(): Promise<DataResult<ProjectStatistics>> {
    try {
      await this.ensureDataLoaded();
      
      const total = this.data.length;
      const featured = this.data.filter(p => p.featured).length;
      const recentlyUpdated = this.data.filter(p => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return p.updatedAt >= thirtyDaysAgo;
      }).length;
      
      // Count by category
      const byCategory = this.data.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
      }, {} as Record<Project['category'], number>);
      
      // Count by status
      const byStatus = this.data.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
      }, {} as Record<Project['status'], number>);
      
      // Most used technologies
      const techCount = new Map<string, { technology: any; count: number }>();
      
      this.data.forEach(project => {
        project.technologies.forEach(tech => {
          const existing = techCount.get(tech.name);
          if (existing) {
            existing.count++;
          } else {
            techCount.set(tech.name, { technology: tech, count: 1 });
          }
        });
      });
      
      const mostUsedTechnologies = Array.from(techCount.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      
      const statistics: ProjectStatistics = {
        total,
        byCategory,
        byStatus,
        featured,
        recentlyUpdated,
        mostUsedTechnologies,
      };
      
      return this.createDataResult(statistics);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }
}