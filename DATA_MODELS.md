# Data Models and API Documentation

## Overview

This document provides comprehensive documentation for all data models, interfaces, and API patterns used in the portfolio application. The data layer follows a repository pattern with type-safe interfaces and runtime validation.

## Core Data Models

### Project Model

The Project model represents individual portfolio projects with comprehensive metadata.

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: Technology[];
  images: ProjectImage[];
  links: ProjectLink[];
  status: ProjectStatus;
  featured: boolean;
  category: ProjectCategory;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Supporting types
type ProjectStatus =
  | "planning"
  | "active"
  | "completed"
  | "archived"
  | "on-hold";
type ProjectCategory =
  | "web"
  | "mobile"
  | "desktop"
  | "api"
  | "library"
  | "other";

interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

interface ProjectLink {
  id: string;
  type: ProjectLinkType;
  url: string;
  label: string;
}

type ProjectLinkType =
  | "github"
  | "demo"
  | "docs"
  | "article"
  | "video"
  | "other";
```

**Zod Validation Schema:**

```typescript
import { z } from "zod";

export const ProjectImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string().min(1),
  caption: z.string().optional(),
  isPrimary: z.boolean(),
  order: z.number().int().min(0),
});

export const ProjectLinkSchema = z.object({
  id: z.string(),
  type: z.enum(["github", "demo", "docs", "article", "video", "other"]),
  url: z.string().url(),
  label: z.string().min(1),
});

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  technologies: z.array(TechnologySchema),
  images: z.array(ProjectImageSchema),
  links: z.array(ProjectLinkSchema),
  status: z.enum(["planning", "active", "completed", "archived", "on-hold"]),
  featured: z.boolean(),
  category: z.enum(["web", "mobile", "desktop", "api", "library", "other"]),
  startDate: z.date(),
  endDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Project = z.infer<typeof ProjectSchema>;
```

### Technology Model

The Technology model represents programming languages, frameworks, and tools.

```typescript
interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  icon?: string;
  color?: string;
  website?: string;
  description?: string;
  proficiencyLevel: ProficiencyLevel;
  yearsOfExperience?: number;
  lastUsed?: Date;
  isFeatured: boolean;
}

type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobile"
  | "design"
  | "testing"
  | "other";

type ProficiencyLevel = "beginner" | "intermediate" | "advanced" | "expert";
```

**Zod Validation Schema:**

```typescript
export const TechnologySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  category: z.enum([
    "frontend",
    "backend",
    "database",
    "devops",
    "mobile",
    "design",
    "testing",
    "other",
  ]),
  icon: z.string().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i)
    .optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  proficiencyLevel: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  yearsOfExperience: z.number().int().min(0).optional(),
  lastUsed: z.date().optional(),
  isFeatured: z.boolean(),
});

export type Technology = z.infer<typeof TechnologySchema>;
```

### About Content Model

The About model contains personal and professional information.

```typescript
interface AboutContent {
  id: string;
  personalInfo: PersonalInfo;
  professionalSummary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];
  interests: string[];
  languages: Language[];
  updatedAt: Date;
}

interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  avatar?: string;
  bio: string;
  tagline?: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  level: ProficiencyLevel;
  technologies: Technology[];
  description?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: Technology[];
  isCurrentPosition: boolean;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  honors?: string[];
  relevantCoursework?: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  url?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
  isNative: boolean;
}

type LanguageProficiency = "basic" | "conversational" | "fluent" | "native";
```

### Contact Model

The Contact model handles contact form submissions and contact information.

```typescript
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  company?: string;
  projectType?: ProjectType;
  budget?: BudgetRange;
  timeline?: string;
  source?: string;
  status: ContactStatus;
  submittedAt: Date;
  respondedAt?: Date;
  notes?: string;
}

interface ContactInfo {
  id: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
  availability: AvailabilityStatus;
  preferredContactMethod: ContactMethod;
  responseTime: string;
  timezone: string;
}

interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  username: string;
  isPublic: boolean;
}

type ProjectType =
  | "website"
  | "webapp"
  | "mobile"
  | "api"
  | "consulting"
  | "other";
type BudgetRange =
  | "under-5k"
  | "5k-10k"
  | "10k-25k"
  | "25k-50k"
  | "50k-plus"
  | "discuss";
type ContactStatus = "new" | "read" | "responded" | "closed" | "spam";
type AvailabilityStatus = "available" | "busy" | "unavailable";
type ContactMethod = "email" | "phone" | "linkedin" | "any";
type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "youtube"
  | "other";
```

## Repository Pattern

### Base Repository Interface

All data repositories implement the base repository interface:

```typescript
interface DataRepository<T> {
  // Read operations
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  getByIds(ids: string[]): Promise<T[]>;

  // Write operations
  create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;

  // Batch operations
  createMany(items: Omit<T, "id" | "createdAt" | "updatedAt">[]): Promise<T[]>;
  updateMany(updates: Array<{ id: string; data: Partial<T> }>): Promise<T[]>;
  deleteMany(ids: string[]): Promise<void>;

  // Query operations
  find(predicate: (item: T) => boolean): Promise<T[]>;
  findOne(predicate: (item: T) => boolean): Promise<T | null>;
  count(predicate?: (item: T) => boolean): Promise<number>;
  exists(id: string): Promise<boolean>;
}
```

### Base Repository Implementation

```typescript
export abstract class BaseRepository<T extends { id: string }>
  implements DataRepository<T>
{
  protected abstract data: T[];
  protected abstract validateItem(item: unknown): T;

  async getAll(): Promise<T[]> {
    return [...this.data];
  }

  async getById(id: string): Promise<T | null> {
    const item = this.data.find((item) => item.id === id);
    return item || null;
  }

  async create(item: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const newItem = {
      ...item,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as T;

    const validatedItem = this.validateItem(newItem);
    this.data.push(validatedItem);

    return validatedItem;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    const updatedItem = {
      ...this.data[index],
      ...updates,
      updatedAt: new Date(),
    };

    const validatedItem = this.validateItem(updatedItem);
    this.data[index] = validatedItem;

    return validatedItem;
  }

  async delete(id: string): Promise<void> {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    this.data.splice(index, 1);
  }

  // Additional methods...
}
```

### Specific Repository Implementations

#### Project Repository

```typescript
export class ProjectRepository extends BaseRepository<Project> {
  protected data: Project[] = projectsData;

  protected validateItem(item: unknown): Project {
    return ProjectSchema.parse(item);
  }

  // Project-specific methods
  async getFeatured(): Promise<Project[]> {
    return this.data.filter((project) => project.featured);
  }

  async getByCategory(category: ProjectCategory): Promise<Project[]> {
    return this.data.filter((project) => project.category === category);
  }

  async getByTechnology(technologyId: string): Promise<Project[]> {
    return this.data.filter((project) =>
      project.technologies.some((tech) => tech.id === technologyId)
    );
  }

  async getByStatus(status: ProjectStatus): Promise<Project[]> {
    return this.data.filter((project) => project.status === status);
  }

  async getRecent(limit: number = 5): Promise<Project[]> {
    return this.data
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, limit);
  }

  async search(query: string): Promise<Project[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.data.filter(
      (project) =>
        project.title.toLowerCase().includes(lowercaseQuery) ||
        project.description.toLowerCase().includes(lowercaseQuery) ||
        project.technologies.some((tech) =>
          tech.name.toLowerCase().includes(lowercaseQuery)
        )
    );
  }
}
```

#### Technology Repository

```typescript
export class TechnologyRepository extends BaseRepository<Technology> {
  protected data: Technology[] = technologiesData;

  protected validateItem(item: unknown): Technology {
    return TechnologySchema.parse(item);
  }

  // Technology-specific methods
  async getByCategory(category: TechnologyCategory): Promise<Technology[]> {
    return this.data.filter((tech) => tech.category === category);
  }

  async getFeatured(): Promise<Technology[]> {
    return this.data.filter((tech) => tech.isFeatured);
  }

  async getByProficiencyLevel(level: ProficiencyLevel): Promise<Technology[]> {
    return this.data.filter((tech) => tech.proficiencyLevel === level);
  }

  async getRecentlyUsed(months: number = 12): Promise<Technology[]> {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);

    return this.data.filter(
      (tech) => tech.lastUsed && tech.lastUsed >= cutoffDate
    );
  }
}
```

#### About Repository

```typescript
export class AboutRepository extends BaseRepository<AboutContent> {
  protected data: AboutContent[] = [aboutData];

  protected validateItem(item: unknown): AboutContent {
    return AboutContentSchema.parse(item);
  }

  // About-specific methods
  async getCurrent(): Promise<AboutContent> {
    const about = this.data[0];
    if (!about) {
      throw new Error("About content not found");
    }
    return about;
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    const about = await this.getCurrent();
    return about.skills.filter((skill) => skill.category === category);
  }

  async getCurrentExperience(): Promise<Experience[]> {
    const about = await this.getCurrent();
    return about.experience.filter((exp) => exp.isCurrentPosition);
  }

  async getExperienceByCompany(company: string): Promise<Experience[]> {
    const about = await this.getCurrent();
    return about.experience.filter((exp) =>
      exp.company.toLowerCase().includes(company.toLowerCase())
    );
  }
}
```

#### Contact Repository

```typescript
export class ContactRepository extends BaseRepository<ContactSubmission> {
  protected data: ContactSubmission[] = [];

  protected validateItem(item: unknown): ContactSubmission {
    return ContactSubmissionSchema.parse(item);
  }

  // Contact-specific methods
  async getByStatus(status: ContactStatus): Promise<ContactSubmission[]> {
    return this.data.filter((contact) => contact.status === status);
  }

  async getRecent(days: number = 30): Promise<ContactSubmission[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.data.filter((contact) => contact.submittedAt >= cutoffDate);
  }

  async markAsRead(id: string): Promise<ContactSubmission> {
    return this.update(id, { status: "read" });
  }

  async markAsResponded(
    id: string,
    notes?: string
  ): Promise<ContactSubmission> {
    return this.update(id, {
      status: "responded",
      respondedAt: new Date(),
      notes,
    });
  }
}
```

## Repository Factory

A factory pattern for creating repository instances:

```typescript
export class RepositoryFactory {
  private static instances: Map<string, any> = new Map();

  static getProjectRepository(): ProjectRepository {
    if (!this.instances.has("project")) {
      this.instances.set("project", new ProjectRepository());
    }
    return this.instances.get("project");
  }

  static getTechnologyRepository(): TechnologyRepository {
    if (!this.instances.has("technology")) {
      this.instances.set("technology", new TechnologyRepository());
    }
    return this.instances.get("technology");
  }

  static getAboutRepository(): AboutRepository {
    if (!this.instances.has("about")) {
      this.instances.set("about", new AboutRepository());
    }
    return this.instances.get("about");
  }

  static getContactRepository(): ContactRepository {
    if (!this.instances.has("contact")) {
      this.instances.set("contact", new ContactRepository());
    }
    return this.instances.get("contact");
  }
}
```

## Data Transformation Utilities

### Type Guards

```typescript
export function isProject(obj: unknown): obj is Project {
  try {
    ProjectSchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}

export function isTechnology(obj: unknown): obj is Technology {
  try {
    TechnologySchema.parse(obj);
    return true;
  } catch {
    return false;
  }
}
```

### Data Transformers

```typescript
export class DataTransformer {
  static projectToSummary(project: Project): ProjectSummary {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      primaryImage: project.images.find((img) => img.isPrimary)?.url,
      technologies: project.technologies.map((tech) => tech.name),
      status: project.status,
      featured: project.featured,
    };
  }

  static technologyToTag(technology: Technology): TechnologyTag {
    return {
      id: technology.id,
      name: technology.name,
      color: technology.color,
      icon: technology.icon,
    };
  }

  static experienceToTimelineItem(experience: Experience): TimelineItem {
    return {
      id: experience.id,
      title: experience.position,
      subtitle: experience.company,
      date: `${formatDate(experience.startDate)} - ${
        experience.endDate ? formatDate(experience.endDate) : "Present"
      }`,
      description: experience.description,
      icon: "briefcase",
    };
  }
}
```

## Error Handling

### Data Errors

```typescript
export class DataError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "DataError";
  }
}

export class ValidationError extends DataError {
  constructor(
    message: string,
    public validationErrors: unknown
  ) {
    super(message, "VALIDATION_ERROR", validationErrors);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends DataError {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND", { resource, id });
    this.name = "NotFoundError";
  }
}
```

### Error Handling Utilities

```typescript
export function handleDataError(error: unknown): DataError {
  if (error instanceof DataError) {
    return error;
  }

  if (error instanceof z.ZodError) {
    return new ValidationError("Validation failed", error.errors);
  }

  if (error instanceof Error) {
    return new DataError(error.message, "UNKNOWN_ERROR");
  }

  return new DataError("An unknown error occurred", "UNKNOWN_ERROR");
}

export function isDataError(error: unknown): error is DataError {
  return error instanceof DataError;
}
```

## API Response Types

### Standard Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ResponseMeta;
}

interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

interface ResponseMeta {
  timestamp: string;
  requestId: string;
  pagination?: PaginationMeta;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### API Response Builders

```typescript
export class ApiResponseBuilder {
  static success<T>(data: T, meta?: ResponseMeta): ApiResponse<T> {
    return {
      success: true,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        ...meta,
      },
    };
  }

  static error(error: ApiError, meta?: ResponseMeta): ApiResponse<never> {
    return {
      success: false,
      error,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        ...meta,
      },
    };
  }

  static paginated<T>(data: T[], pagination: PaginationMeta): ApiResponse<T[]> {
    return this.success(data, { pagination });
  }
}
```

## Usage Examples

### Fetching Projects

```typescript
// Using repository directly
const projectRepo = RepositoryFactory.getProjectRepository();
const projects = await projectRepo.getFeatured();

// Using custom hook
const { projects, loading, error } = useProjects({
  featured: true,
  limit: 6,
});

// With error handling
try {
  const project = await projectRepo.getById("project-1");
  if (!project) {
    throw new NotFoundError("Project", "project-1");
  }
  // Use project
} catch (error) {
  const dataError = handleDataError(error);
  console.error("Failed to fetch project:", dataError.message);
}
```

### Creating Contact Submission

```typescript
const contactRepo = RepositoryFactory.getContactRepository();

try {
  const submission = await contactRepo.create({
    name: "John Doe",
    email: "john@example.com",
    message: "Hello, I would like to discuss a project.",
    status: "new",
    submittedAt: new Date(),
  });

  console.log("Contact submission created:", submission.id);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation errors:", error.validationErrors);
  } else {
    console.error("Failed to create submission:", error.message);
  }
}
```

This data model documentation provides a comprehensive guide to the data layer architecture, ensuring type safety and consistency throughout the application.
