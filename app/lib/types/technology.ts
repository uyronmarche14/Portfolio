/**
 * Technology-related type definitions
 */

import type { ImageMetadata } from './common';

/**
 * Technology category enumeration
 */
export type TechnologyCategory =
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "desktop"
  | "devops"
  | "cloud"
  | "testing"
  | "design"
  | "language"
  | "framework"
  | "library"
  | "tool"
  | "other";

/**
 * Technology proficiency levels
 */
export type TechnologyProficiency =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

/**
 * Technology learning status
 */
export type TechnologyLearningStatus =
  | "learning"
  | "comfortable"
  | "proficient"
  | "expert";

/**
 * Technology icon configuration
 */
export interface TechnologyIcon {
  name: string;
  type: "icon" | "image" | "svg";
  source?: string; // URL for images, icon name for icon libraries
  color?: string;
  backgroundColor?: string;
}

/**
 * Technology usage statistics
 */
export interface TechnologyUsage {
  projectCount: number;
  firstUsed?: Date;
  lastUsed?: Date;
  totalExperience?: number; // in months
  commercialExperience?: number; // in months
}

/**
 * Technology resource for learning
 */
export interface TechnologyResource {
  title: string;
  url: string;
  type: "documentation" | "tutorial" | "course" | "book" | "video" | "article";
  completed?: boolean;
  rating?: number; // 1-5 stars
}

/**
 * Main Technology interface
 */
export interface Technology {
  // Base Properties
  id: string;
  createdAt: Date;
  updatedAt: Date;

  // Basic Information
  name: string;
  displayName?: string;
  description?: string;
  category: TechnologyCategory;

  // Visual Representation
  icon: TechnologyIcon;
  color?: string;
  logo?: ImageMetadata;

  // Proficiency and Experience
  proficiency: TechnologyProficiency;
  learningStatus: TechnologyLearningStatus;
  usage?: TechnologyUsage;

  // Metadata
  version?: string;
  officialWebsite?: string;
  documentation?: string;

  // Learning and Development
  resources?: TechnologyResource[];
  certifications?: string[];

  // Relationships
  relatedTechnologies?: string[]; // Technology IDs
  alternatives?: string[]; // Technology IDs
  dependencies?: string[]; // Technology IDs

  // Display Properties
  featured: boolean;
  order?: number;
  visible: boolean;

  // Additional Properties
  tags: string[];
  notes?: string;
}

/**
 * Create technology input type
 */
export type CreateTechnologyInput = Omit<
  Technology,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Update technology input type
 */
export type UpdateTechnologyInput = Partial<CreateTechnologyInput>;

/**
 * Technology filters for searching
 */
export interface TechnologyFilters {
  category?: TechnologyCategory[];
  proficiency?: TechnologyProficiency[];
  learningStatus?: TechnologyLearningStatus[];
  featured?: boolean;
  tags?: string[];
}

/**
 * Technology search parameters
 */
export interface TechnologySearchParams {
  query?: string;
  filters?: TechnologyFilters;
  sortBy?: "name" | "category" | "proficiency" | "createdAt" | "order";
  sortOrder?: "asc" | "desc";
}

/**
 * Technology statistics
 */
export interface TechnologyStatistics {
  total: number;
  byCategory: Record<TechnologyCategory, number>;
  byProficiency: Record<TechnologyProficiency, number>;
  byLearningStatus: Record<TechnologyLearningStatus, number>;
  featured: number;
  mostUsedInProjects: {
    technology: Technology;
    projectCount: number;
  }[];
}

/**
 * Technology skill group
 */
export interface TechnologySkillGroup {
  id: string;
  name: string;
  description?: string;
  category: TechnologyCategory;
  technologies: Technology[];
  order?: number;
}

/**
 * Technology summary for compact displays
 */
export interface TechnologySummary {
  id: string;
  name: string;
  displayName?: string;
  category: TechnologyCategory;
  icon: TechnologyIcon;
  color?: string;
  proficiency: TechnologyProficiency;
  featured: boolean;
  projectCount: number;
  firstUsed?: Date;
  lastUsed?: Date;
  totalExperience?: number; // in months
  commercialExperience?: number; // in months
}

/**
 * Technology statistics interface
 */
export interface TechnologyStatistics {
  total: number;
  byCategory: Record<TechnologyCategory, number>;
  byProficiency: Record<TechnologyProficiency, number>;
  byLearningStatus: Record<TechnologyLearningStatus, number>;
  featured: number;
  mostUsedInProjects: {
    technology: Technology;
    projectCount: number;
  }[];
}

/**
 * Technology roadmap item
 */
export interface TechnologyRoadmapItem {
  technology: Technology;
  targetProficiency: TechnologyProficiency;
  estimatedTimeToLearn: number; // in weeks
  priority: "low" | "medium" | "high";
  prerequisites?: Technology[];
  resources: TechnologyResource[];
  milestones: {
    title: string;
    description: string;
    completed: boolean;
    targetDate?: Date;
  }[];
}
