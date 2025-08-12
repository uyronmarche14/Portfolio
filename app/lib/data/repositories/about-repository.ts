/**
 * About repository implementation
 */

import { 
  AboutContent, 
  CreateAboutContentInput, 
  UpdateAboutContentInput,
  DataResult
} from '@/types';
import { FileBasedRepository } from './base';
import { generateId } from '@/lib/utils';

/**
 * About repository for managing about content
 */
export class AboutRepository extends FileBasedRepository<AboutContent, CreateAboutContentInput, UpdateAboutContentInput> {
  private dataFilePath: string;

  constructor(dataFilePath = '/content/data/about.json') {
    super({
      cacheEnabled: true,
      cacheTTL: 600, // 10 minutes
      enableLogging: true,
    });
    this.dataFilePath = dataFilePath;
  }

  /**
   * Load about data from file
   */
  protected async loadData(): Promise<AboutContent[]> {
    try {
      // In a real implementation, this would read from a file
      // For now, return empty array - data will be loaded from actual file
      return [];
    } catch (error) {
      console.error('Failed to load about data:', error);
      return [];
    }
  }

  /**
   * Save about data to file
   */
  protected async saveData(data: AboutContent[]): Promise<void> {
    try {
      // In a real implementation, this would write to a file
      // For now, just log the operation
      console.log('Saving about data:', data.length, 'items');
    } catch (error) {
      console.error('Failed to save about data:', error);
      throw error;
    }
  }

  /**
   * Create a new about entity with timestamps
   */
  protected createEntity(input: CreateAboutContentInput): AboutContent {
    const now = new Date();
    return {
      ...input,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Update an existing about entity with new timestamp
   */
  protected updateEntity(existing: AboutContent, updates: UpdateAboutContentInput): AboutContent {
    return {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
  }

  /**
   * Get primary about content
   */
  async getPrimary(): Promise<DataResult<AboutContent | null>> {
    try {
      await this.ensureDataLoaded();
      
      // Return the first about content as primary
      const primary = this.data.length > 0 ? this.data[0] : null;
      
      return this.createDataResult(primary);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Update primary about content
   */
  async updatePrimary(updates: UpdateAboutContentInput): Promise<DataResult<AboutContent>> {
    try {
      await this.ensureDataLoaded();
      
      if (this.data.length === 0) {
        // Create new primary about content if none exists
        const newContent = this.createEntity(updates as CreateAboutContentInput);
        this.data.push(newContent);
        await this.saveData(this.data);
        return this.createDataResult(newContent);
      }
      
      // Update existing primary about content
      const existing = this.data[0];
      const updated = this.updateEntity(existing, updates);
      this.data[0] = updated;
      
      await this.saveData(this.data);
      
      return this.createDataResult(updated);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get skills grouped by category
   */
  async getSkillsByCategory(): Promise<DataResult<Record<string, any[]>>> {
    try {
      await this.ensureDataLoaded();
      
      if (this.data.length === 0) {
        return this.createDataResult({});
      }
      
      const aboutContent = this.data[0];
      const skillsByCategory: Record<string, any[]> = {};
      
      if (aboutContent.skills) {
        aboutContent.skills.forEach(skill => {
          const category = skill.category || 'Other';
          if (!skillsByCategory[category]) {
            skillsByCategory[category] = [];
          }
          skillsByCategory[category].push(skill);
        });
      }
      
      return this.createDataResult(skillsByCategory);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get experience timeline
   */
  async getExperienceTimeline(): Promise<DataResult<any[]>> {
    try {
      await this.ensureDataLoaded();
      
      if (this.data.length === 0) {
        return this.createDataResult([]);
      }
      
      const aboutContent = this.data[0];
      const timeline = aboutContent.experience || [];
      
      // Sort by start date (most recent first)
      timeline.sort((a, b) => {
        const aDate = new Date(a.startDate || 0);
        const bDate = new Date(b.startDate || 0);
        return bDate.getTime() - aDate.getTime();
      });
      
      return this.createDataResult(timeline);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Get education history
   */
  async getEducation(): Promise<DataResult<any[]>> {
    try {
      await this.ensureDataLoaded();
      
      if (this.data.length === 0) {
        return this.createDataResult([]);
      }
      
      const aboutContent = this.data[0];
      const education = aboutContent.education || [];
      
      // Sort by graduation date (most recent first)
      education.sort((a, b) => {
        const aDate = new Date(a.graduationDate || a.endDate || 0);
        const bDate = new Date(b.graduationDate || b.endDate || 0);
        return bDate.getTime() - aDate.getTime();
      });
      
      return this.createDataResult(education);
    } catch (error) {
      return this.createDataResult(undefined, {
        type: 'UNKNOWN_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error,
      });
    }
  }

  /**
   * Validate about data
   */
  protected async validateData(data: any, operation: 'create' | 'update'): Promise<string[]> {
    const errors: string[] = [];
    
    if (operation === 'create') {
      if (!data.bio || typeof data.bio !== 'string' || data.bio.trim().length === 0) {
        errors.push('Bio is required and must be a non-empty string');
      }
    }
    
    // Additional validation for updates
    if (data.bio !== undefined && (typeof data.bio !== 'string' || data.bio.trim().length === 0)) {
      errors.push('Bio must be a non-empty string');
    }
    
    if (data.skills !== undefined && !Array.isArray(data.skills)) {
      errors.push('Skills must be an array');
    }
    
    if (data.experience !== undefined && !Array.isArray(data.experience)) {
      errors.push('Experience must be an array');
    }
    
    if (data.education !== undefined && !Array.isArray(data.education)) {
      errors.push('Education must be an array');
    }
    
    return errors;
  }
}