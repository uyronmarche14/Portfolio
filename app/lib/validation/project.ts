/**
 * Project validation schemas using Zod
 */

import { z } from 'zod';

import { 
  BaseEntitySchema, 
  ImageMetadataSchema, 
  LinkSchema, 
  SEOMetadataSchema,
  DateRangeSchema,
  NonEmptyStringSchema,
  UrlSchema,
  PositiveNumberSchema,
  NonNegativeNumberSchema
} from './common';
import { TechnologySchema } from './technology';

/**
 * Project status schema
 */
export const ProjectStatusSchema = z.enum(['planning', 'active', 'completed', 'on-hold', 'archived']);

/**
 * Project category schema
 */
export const ProjectCategorySchema = z.enum(['web', 'mobile', 'desktop', 'api', 'library', 'other']);

/**
 * Project link type schema
 */
export const ProjectLinkTypeSchema = z.enum(['github', 'demo', 'docs', 'website', 'download', 'video']);

/**
 * Project link schema
 */
export const ProjectLinkSchema = LinkSchema.extend({
  type: ProjectLinkTypeSchema,
  primary: z.boolean().optional(),
});

/**
 * Project image schema
 */
export const ProjectImageSchema = ImageMetadataSchema.extend({
  type: z.enum(['preview', 'screenshot', 'diagram', 'logo']),
  featured: z.boolean().optional(),
  order: z.number().int().nonnegative().optional(),
});

/**
 * Project timeline event schema
 */
export const ProjectTimelineEventSchema = z.object({
  date: z.date(),
  title: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
  milestone: z.boolean().optional(),
  status: ProjectStatusSchema.optional(),
});

/**
 * Project feature schema
 */
export const ProjectFeatureSchema = z.object({
  id: NonEmptyStringSchema,
  title: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
  implemented: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

/**
 * Project metrics schema
 */
export const ProjectMetricsSchema = z.object({
  linesOfCode: PositiveNumberSchema.optional(),
  commits: NonNegativeNumberSchema.optional(),
  contributors: PositiveNumberSchema.optional(),
  stars: NonNegativeNumberSchema.optional(),
  forks: NonNegativeNumberSchema.optional(),
  downloads: NonNegativeNumberSchema.optional(),
  lastUpdated: z.date().optional(),
});

/**
 * Project collaboration schema
 */
export const ProjectCollaborationSchema = z.object({
  teamSize: PositiveNumberSchema,
  role: NonEmptyStringSchema,
  responsibilities: z.array(NonEmptyStringSchema),
  collaborators: z.array(z.object({
    name: NonEmptyStringSchema,
    role: NonEmptyStringSchema,
    profileUrl: UrlSchema.optional(),
  })).optional(),
});

/**
 * Tech stack schema
 */
export const TechStackSchema = z.object({
  frontend: z.array(TechnologySchema).optional(),
  backend: z.array(TechnologySchema).optional(),
  database: z.array(TechnologySchema).optional(),
  tools: z.array(TechnologySchema).optional(),
});

/**
 * Main Project schema
 */
export const ProjectSchema = BaseEntitySchema.extend({
  // Basic Information
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  description: NonEmptyStringSchema.max(500, 'Description must be under 500 characters'),
  shortDescription: z.string().max(200, 'Short description must be under 200 characters').optional(),
  category: ProjectCategorySchema,
  status: ProjectStatusSchema,
  
  // Content
  content: NonEmptyStringSchema,
  features: z.array(ProjectFeatureSchema),
  
  // Media
  images: z.array(ProjectImageSchema),
  videos: z.array(UrlSchema).optional(),
  
  // Technical Details
  technologies: z.array(TechnologySchema),
  techStack: TechStackSchema.optional(),
  
  // Links and URLs
  links: z.array(ProjectLinkSchema),
  repositoryUrl: UrlSchema.optional(),
  demoUrl: UrlSchema.optional(),
  documentationUrl: UrlSchema.optional(),
  
  // Timeline and Progress
  timeline: z.array(ProjectTimelineEventSchema).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: DateRangeSchema.optional(),
  
  // Metadata
  featured: z.boolean(),
  priority: z.number().int().nonnegative().optional(),
  tags: z.array(NonEmptyStringSchema),
  
  // Metrics and Analytics
  metrics: ProjectMetricsSchema.optional(),
  
  // Collaboration
  collaboration: ProjectCollaborationSchema.optional(),
  
  // SEO
  seo: SEOMetadataSchema.optional(),
  
  // Additional Properties
  challenges: z.array(NonEmptyStringSchema).optional(),
  learnings: z.array(NonEmptyStringSchema).optional(),
  futureEnhancements: z.array(NonEmptyStringSchema).optional(),
  
  // Display Properties
  order: z.number().int().nonnegative().optional(),
  visible: z.boolean(),
}).refine(
  (data) => !data.endDate || !data.startDate || data.startDate <= data.endDate,
  {
    message: 'Start date must be before or equal to end date',
    path: ['endDate'],
  }
).refine(
  (data) => data.images.length > 0,
  {
    message: 'At least one image is required',
    path: ['images'],
  }
).refine(
  (data) => data.features.length > 0,
  {
    message: 'At least one feature is required',
    path: ['features'],
  }
);

/**
 * Project summary schema
 */
export const ProjectSummarySchema = z.object({
  id: NonEmptyStringSchema,
  title: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
  category: ProjectCategorySchema,
  status: ProjectStatusSchema,
  featured: z.boolean(),
  previewImage: ProjectImageSchema.optional(),
  technologies: z.array(TechnologySchema),
  links: z.array(ProjectLinkSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * Project filters schema
 */
export const ProjectFiltersSchema = z.object({
  category: z.array(ProjectCategorySchema).optional(),
  status: z.array(ProjectStatusSchema).optional(),
  technologies: z.array(NonEmptyStringSchema).optional(),
  featured: z.boolean().optional(),
  tags: z.array(NonEmptyStringSchema).optional(),
  dateRange: DateRangeSchema.optional(),
});

/**
 * Project search parameters schema
 */
export const ProjectSearchParamsSchema = z.object({
  query: z.string().optional(),
  filters: ProjectFiltersSchema.optional(),
  sortBy: z.enum(['title', 'createdAt', 'updatedAt', 'priority', 'status']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * Project creation input schema
 */
export const CreateProjectInputSchema = BaseEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // Basic Information
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  description: NonEmptyStringSchema.max(500, 'Description must be under 500 characters'),
  shortDescription: z.string().max(200, 'Short description must be under 200 characters').optional(),
  category: ProjectCategorySchema,
  status: ProjectStatusSchema,
  
  // Content
  content: NonEmptyStringSchema,
  features: z.array(ProjectFeatureSchema),
  
  // Media
  images: z.array(ProjectImageSchema),
  videos: z.array(UrlSchema).optional(),
  
  // Technical Details
  technologies: z.array(TechnologySchema),
  techStack: TechStackSchema.optional(),
  
  // Links and URLs
  links: z.array(ProjectLinkSchema),
  repositoryUrl: UrlSchema.optional(),
  demoUrl: UrlSchema.optional(),
  documentationUrl: UrlSchema.optional(),
  
  // Timeline and Progress
  timeline: z.array(ProjectTimelineEventSchema).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: DateRangeSchema.optional(),
  
  // Metadata
  featured: z.boolean(),
  priority: z.number().int().nonnegative().optional(),
  tags: z.array(NonEmptyStringSchema),
  
  // Metrics and Analytics
  metrics: ProjectMetricsSchema.optional(),
  
  // Collaboration
  collaboration: ProjectCollaborationSchema.optional(),
  
  // SEO
  seo: SEOMetadataSchema.optional(),
  
  // Additional Properties
  challenges: z.array(NonEmptyStringSchema).optional(),
  learnings: z.array(NonEmptyStringSchema).optional(),
  futureEnhancements: z.array(NonEmptyStringSchema).optional(),
  
  // Display Properties
  order: z.number().int().nonnegative().optional(),
  visible: z.boolean(),
});

/**
 * Project update input schema
 */
export const UpdateProjectInputSchema = BaseEntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // Basic Information
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters').optional(),
  description: NonEmptyStringSchema.max(500, 'Description must be under 500 characters').optional(),
  shortDescription: z.string().max(200, 'Short description must be under 200 characters').optional(),
  category: ProjectCategorySchema.optional(),
  status: ProjectStatusSchema.optional(),
  
  // Content
  content: NonEmptyStringSchema.optional(),
  features: z.array(ProjectFeatureSchema).optional(),
  
  // Media
  images: z.array(ProjectImageSchema).optional(),
  videos: z.array(UrlSchema).optional(),
  
  // Technical Details
  technologies: z.array(TechnologySchema).optional(),
  techStack: TechStackSchema.optional(),
  
  // Links and URLs
  links: z.array(ProjectLinkSchema).optional(),
  repositoryUrl: UrlSchema.optional(),
  demoUrl: UrlSchema.optional(),
  documentationUrl: UrlSchema.optional(),
  
  // Timeline and Progress
  timeline: z.array(ProjectTimelineEventSchema).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: DateRangeSchema.optional(),
  
  // Metadata
  featured: z.boolean().optional(),
  priority: z.number().int().nonnegative().optional(),
  tags: z.array(NonEmptyStringSchema).optional(),
  
  // Metrics and Analytics
  metrics: ProjectMetricsSchema.optional(),
  
  // Collaboration
  collaboration: ProjectCollaborationSchema.optional(),
  
  // SEO
  seo: SEOMetadataSchema.optional(),
  
  // Additional Properties
  challenges: z.array(NonEmptyStringSchema).optional(),
  learnings: z.array(NonEmptyStringSchema).optional(),
  futureEnhancements: z.array(NonEmptyStringSchema).optional(),
  
  // Display Properties
  order: z.number().int().nonnegative().optional(),
  visible: z.boolean().optional(),
});

/**
 * Project statistics schema
 */
export const ProjectStatisticsSchema = z.object({
  total: NonNegativeNumberSchema,
  byCategory: z.record(ProjectCategorySchema, NonNegativeNumberSchema),
  byStatus: z.record(ProjectStatusSchema, NonNegativeNumberSchema),
  featured: NonNegativeNumberSchema,
  recentlyUpdated: NonNegativeNumberSchema,
  mostUsedTechnologies: z.array(z.object({
    technology: TechnologySchema,
    count: PositiveNumberSchema,
  })),
});

/**
 * Validation functions
 */
export const validateProject = (data: unknown) => {
  return ProjectSchema.safeParse(data);
};

export const validateCreateProjectInput = (data: unknown) => {
  return CreateProjectInputSchema.safeParse(data);
};

export const validateUpdateProjectInput = (data: unknown) => {
  return UpdateProjectInputSchema.safeParse(data);
};

export const validateProjectFilters = (data: unknown) => {
  return ProjectFiltersSchema.safeParse(data);
};

export const validateProjectSearchParams = (data: unknown) => {
  return ProjectSearchParamsSchema.safeParse(data);
};