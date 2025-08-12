/**
 * Contact repository implementation
 */

import { 
  ContactInfo, 
  CreateContactInput, 
  UpdateContactInput,
  DataResult
} from '@/types';
import { FileBasedRepository } from './base';
import { generateId } from '@/lib/utils';

/**
 * Contact repository for managing contact information
 */
export class ContactRepository extends FileBasedRepository<ContactInfo, CreateContactInput, UpdateContactInput> {
  private dataFilePath: string;

  constructor(dataFilePath = '/content/data/contact.json') {
    super({
      cacheEnabled: true,
      cacheTTL: 600, // 10 minutes
      enableLogging: true,
    });
    this.dataFilePath = dataFilePath;
  }

  /**
   * Load contact data from file
   */
  protected async loadData(): Promise<ContactInfo[]> {
    try {
      // In a real implementation, this would read from a file
      // For now, return empty array - data will be loaded from actual file
      return [];
    } catch (error) {
      console.error('Failed to load contact data:', error);
      return [];
    }
  }

  /**
   * Save contact data to file
   */
  protected async saveData(data: ContactInfo[]): Promise<void> {
    try {
      // In a real implementation, this would write to a file
      // For now, just log the operation
      console.log('Saving contact data:', data.length, 'items');
    } catch (error) {
      console.error('Failed to save contact data:', error);
      throw error;
    }
  }

  /**
   * Create a new contact entity with timestamps
   */
  protected createEntity(input: CreateContactInput): ContactInfo {
    const now = new Date();
    return {
      ...input,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Update an existing contact entity with new timestamp
   */
  protected updateEntity(existing: ContactInfo, updates: UpdateContactInput): ContactInfo {
    return {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
  }

  /**
   * Get primary contact information
   */
  async getPrimary(): Promise<DataResult<ContactInfo | null>> {
    try {
      await this.ensureDataLoaded();
      
      // Return the first contact info as primary
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
   * Update primary contact information
   */
  async updatePrimary(updates: UpdateContactInput): Promise<DataResult<ContactInfo>> {
    try {
      await this.ensureDataLoaded();
      
      if (this.data.length === 0) {
        // Create new primary contact if none exists
        const newContact = this.createEntity(updates as CreateContactInput);
        this.data.push(newContact);
        await this.saveData(this.data);
        return this.createDataResult(newContact);
      }
      
      // Update existing primary contact
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
   * Validate contact data
   */
  protected async validateData(data: any, operation: 'create' | 'update'): Promise<string[]> {
    const errors: string[] = [];
    
    if (operation === 'create') {
      if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
        errors.push('Valid email is required');
      }
      
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        errors.push('Name is required and must be a non-empty string');
      }
    }
    
    // Additional validation for updates
    if (data.email !== undefined && (typeof data.email !== 'string' || !data.email.includes('@'))) {
      errors.push('Email must be a valid email address');
    }
    
    if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim().length === 0)) {
      errors.push('Name must be a non-empty string');
    }
    
    return errors;
  }
}