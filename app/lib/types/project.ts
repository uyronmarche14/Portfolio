/**
 * Project-related type definitions
 */

import type {
  BaseEntity,
  ImageMetadata,
  Link,
  DateRange,
  SEOMetadata,
} from "./common";
import type { Technology } from "./technology";

/**
 * Project status enumeration
 */
export type ProjectStatus =
  | "planning"
  | "active"
  | "completed"
  | "on-hold"
  | "archived";

/**
 * Project category enumeration
 */
export type ProjectCategory =
  | "web"
  | "mobile"
  | "desktop"
  | "api"
  | "library"
  | "other";

/**
 * Project link types
 */
export type ProjectLinkType =
  | "github"
  | "demo"
  | "docs"
  | "website"
  | "download"
  | "video";

/**
 * Project link interface
 */
export interface ProjectLink extends Link {
  type: ProjectLinkType;
  primary?: boolean;
}

/**
 * Project image interface extending base image metadata
 */
export interface ProjectImage extends ImageMetadata {
  type: "preview" | "screenshot" | "diagram" | "logo";
  featured?: boolean;
  order?: number;
}

/**
 * Project timeline event
 */
export interface ProjectTimelineEvent {
  date: Date;
  title: string;
  description: string;
  milestone?: boolean;
  status?: ProjectStatus;
}

/**
 * Project feature interface
 */
export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  implemented: boolean;
  priority?: "low" | "medium" | "high";
}

/**
 * Project metrics interface
 */
export interface ProjectMetrics {
  linesOfCode?: number;
  commits?: number;
  contributors?: number;
  stars?: number;
  forks?: number;
  downloads?: number;
  lastUpdated?: Date;
}

/**
 * Project collaboration information
 */
export interface ProjectCollaboration {
  teamSize: number;
  role: string;
  responsibilities: string[];
  collaborators?: {
    name: string;
    role: string;
    profileUrl?: string;
  }[];
}

/**
 * Main Project interface
 */
export interface Project extends BaseEntity {
  // Basic Information
  title: string;
  description: string;
  shortDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;

  // Content
  content: string; // Detailed project description/paragraph
  features: ProjectFeature[];

  // Media
  images: ProjectImage[];
  videos?: string[];

  // Technical Details
  technologies: Technology[];
  techStack?: {
    frontend?: Technology[];
    backend?: Technology[];
    database?: Technology[];
    tools?: Technology[];
  };

  // Links and URLs
  links: ProjectLink[];
  repositoryUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;

  // Timeline and Progress
  timeline?: ProjectTimelineEvent[];
  startDate?: Date;
  endDate?: Date;
  duration?: DateRange;

  // Metadata
  featured: boolean;
  priority?: number;
  tags: string[];

  // Metrics and Analytics
  metrics?: ProjectMetrics;

  // Collaboration
  collaboration?: ProjectCollaboration;

  // SEO
  seo?: SEOMetadata;

  // Additional Properties
  challenges?: string[];
  learnings?: string[];
  futureEnhancements?: string[];

  // Display Properties
  order?: number;
  visible: boolean;
}

/**
 * Project summary interface for list views
 */
export interface ProjectSummary {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  previewImage?: ProjectImage;
  technologies: Technology[];
  links: ProjectLink[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Project filter options
 */
export interface ProjectFilters {
  category?: ProjectCategory[];
  status?: ProjectStatus[];
  technologies?: string[];
  featured?: boolean;
  tags?: string[];
  dateRange?: DateRange;
}

/**
 * Project search parameters
 */
export interface ProjectSearchParams {
  query?: string;
  filters?: ProjectFilters;
  sortBy?: "title" | "createdAt" | "updatedAt" | "priority" | "status";
  sortOrder?: "asc" | "desc";
}

/**
 * Project creation input
 */
export type CreateProjectInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Project update input
 */
export type UpdateProjectInput = Partial<
  Omit<Project, "id" | "createdAt" | "updatedAt">
>;

/**
 * Project statistics interface
 */
export interface ProjectStatistics {
  total: number;
  byCategory: Record<ProjectCategory, number>;
  byStatus: Record<ProjectStatus, number>;
  featured: number;
  recentlyUpdated: number;
  mostUsedTechnologies: {
    technology: Technology;
    count: number;
  }[];
}
