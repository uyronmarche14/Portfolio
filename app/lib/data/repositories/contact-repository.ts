/**
 * Contact repository implementation
 */

// 5:1 - Use `import type` for type-only imports
import type {
  ContactInfo,
  CreateContactInput,
  UpdateContactInput,
  DataResult,
  RepositoryError,
} from "@/lib/types";
// 12:1 - Move '@/lib/utils' import before './base'
import { generateId } from "@/lib/utils";
import { FileBasedRepository } from "./base";
// 54:7 - Replace console.log with console.warn

/**
 * Contact repository for managing contact information
 */
export class ContactRepository extends FileBasedRepository<
  ContactInfo,
  CreateContactInput,
  UpdateContactInput
> {
  private dataFilePath: string;

  constructor(dataFilePath = "/content/data/contact.json") {
    super({
      cacheEnabled: true,
      cacheTTL: 600, // 10 minutes
      enableAuditLog: true,
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
      console.error("Failed to load contact data:", error);
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
      console.warn("Saving contact data:", data.length, "items");
    } catch (error) {
      console.error("Failed to save contact data:", error);
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
  protected updateEntity(
    existing: ContactInfo,
    updates: UpdateContactInput
  ): ContactInfo {
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
      return this.createDataResult(null, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Update primary contact information
   */
  async updatePrimary(
    updates: UpdateContactInput
  ): Promise<DataResult<ContactInfo>> {
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
      return this.createDataResult({} as ContactInfo, {
        type: "UNKNOWN_ERROR",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        details: error,
      });
    }
  }

  /**
   * Validate contact data
   */
  protected async validateData(
    data: Partial<CreateContactInput & UpdateContactInput>,
    operation: "create" | "update"
  ): Promise<RepositoryError[]> {
    const errors: RepositoryError[] = [];

    if (operation === "create") {
      if (
        !data.emails ||
        !Array.isArray(data.emails) ||
        data.emails.length === 0 ||
        !data.emails.some(email => email.address && email.address.includes("@"))
      ) {
        errors.push({
          type: "VALIDATION_ERROR",
          message: "At least one valid email is required",
          field: "emails"
        });
      }

      if (
        !data.name ||
        typeof data.name !== "string" ||
        data.name.trim().length === 0
      ) {
        errors.push({
          type: "VALIDATION_ERROR",
          message: "Name is required and must be a non-empty string",
          field: "name"
        });
      }
    }

    // Additional validation for updates
    if (
      data.emails !== undefined &&
      (!Array.isArray(data.emails) ||
       !data.emails.some(email => email.address && email.address.includes("@")))
    ) {
      errors.push({
        type: "VALIDATION_ERROR",
        message: "At least one valid email is required",
        field: "emails"
      });
    }

    if (
      data.name !== undefined &&
      (typeof data.name !== "string" || data.name.trim().length === 0)
    ) {
      errors.push({
        type: "VALIDATION_ERROR",
        message: "Name must be a non-empty string",
        field: "name"
      });
    }

    return errors;
  }
}
