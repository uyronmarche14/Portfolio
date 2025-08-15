/**
 * Technology validation schemas using Zod
 */

import { z } from 'zod';
import { 
  BaseEntitySchema, 
  ImageMetadataSchema,
  NonEmptyStringSchema,
  UrlSchema,
  PositiveNumberSchema,
  NonNegativeNumberSchema,
  HexColorSchema
} from './common';

/**
 * Technology category schema
 */
export const TechnologyCategorySchema = z.enum([
  'frontend',
  'backend',
  'database',
  'mobile',
  'desktop',
  'devops',
  'cloud',
  'testing',
  'design',
  'language',
  'framework',
  'library',
  'tool',
  'other'
]);

/**
 * Technology proficiency schema
 */
export const TechnologyProficiencySchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);

/**
 * Technology learning status schema
 */
export const TechnologyLearningStatusSchema = z.enum(['learning', 'comfortable', 'proficient', 'expert']);

/**
 * Technology icon schema
 */
export const TechnologyIconSchema = z.object({
  name: NonEmptyStringSchema,
  type: z.enum(['icon', 'image', 'svg']),
  source: UrlSchema.optional(),
  color: HexColorSchema.optional(),
  backgroundColor: HexColorSchema.optional(),
});

/**
 * Technology usage statistics schema
 */
export const TechnologyUsageSchema = z.object({
  projectCount: NonNegativeNumberSchema,
  firstUsed: z.date().optional(),
  lastUsed: z.date().optional(),
  totalExperience: PositiveNumberSchema.optional(), // in months
  commercialExperience: NonNegativeNumberSchema.optional(), // in months
});

/**
 * Technology learning resource schema
 */
export const TechnologyResourceSchema = z.object({
  title: NonEmptyStringSchema,
  url: UrlSchema,
  type: z.enum(['documentation', 'tutorial', 'course', 'book', 'video', 'article']),
  completed: z.boolean().optional(),
  rating: z.number().int().min(1).max(5).optional(), // 1-5 stars
});

/**
 * Main Technology schema
 */
export const TechnologySchema = BaseEntitySchema.extend({
  // Basic Information
  name: NonEmptyStringSchema.max(50, 'Name must be under 50 characters'),
  displayName: z.string().max(50, 'Display name must be under 50 characters').optional(),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  category: TechnologyCategorySchema,
  
  // Visual Representation
  icon: TechnologyIconSchema,
  color: HexColorSchema.optional(),
  logo: ImageMetadataSchema.optional(),
  
  // Proficiency and Experience
  proficiency: TechnologyProficiencySchema,
  learningStatus: TechnologyLearningStatusSchema,
  usage: TechnologyUsageSchema.optional(),
  
  // Metadata
  version: z.string().optional(),
  officialWebsite: UrlSchema.optional(),
  documentation: UrlSchema.optional(),
  
  // Learning and Development
  resources: z.array(TechnologyResourceSchema).optional(),
  certifications: z.array(NonEmptyStringSchema).optional(),
  
  // Relationships
  relatedTechnologies: z.array(NonEmptyStringSchema).optional(), // Technology IDs
  alternatives: z.array(NonEmptyStringSchema).optional(), // Technology IDs
  dependencies: z.array(NonEmptyStringSchema).optional(), // Technology IDs
  
  // Display Properties
  featured: z.boolean(),
  order: z.number().int().nonnegative().optional(),
  visible: z.boolean(),
  
  // Additional Properties
  tags: z.array(NonEmptyStringSchema),
  notes: z.string().optional(),
}).refine(
  (data) => !data.usage?.firstUsed || !data.usage?.lastUsed || data.usage.firstUsed <= data.usage.lastUsed,
  {
    message: 'First used date must be before or equal to last used date',
    path: ['usage', 'lastUsed'],
  }
).refine(
  (data) => !data.usage?.totalExperience || !data.usage?.commercialExperience || data.usage.commercialExperience <= data.usage.totalExperience,
  {
    message: 'Commercial experience cannot exceed total experience',
    path: ['usage', 'commercialExperience'],
  }
);

/**
 * Technology summary schema
 */
export const TechnologySummarySchema = z.object({
  id: NonEmptyStringSchema,
  name: NonEmptyStringSchema,
  displayName: z.string().optional(),
  category: TechnologyCategorySchema,
  icon: TechnologyIconSchema,
  color: HexColorSchema.optional(),
  proficiency: TechnologyProficiencySchema,
  featured: z.boolean(),
});

/**
 * Technology skill group schema
 */
export const TechnologySkillGroupSchema = z.object({
  id: NonEmptyStringSchema,
  name: NonEmptyStringSchema,
  description: z.string().optional(),
  category: TechnologyCategorySchema,
  technologies: z.array(TechnologySchema),
  order: z.number().int().nonnegative().optional(),
});

/**
 * Technology filters schema
 */
export const TechnologyFiltersSchema = z.object({
  category: z.array(TechnologyCategorySchema).optional(),
  proficiency: z.array(TechnologyProficiencySchema).optional(),
  learningStatus: z.array(TechnologyLearningStatusSchema).optional(),
  featured: z.boolean().optional(),
  tags: z.array(NonEmptyStringSchema).optional(),
});

/**
 * Technology search parameters schema
 */
export const TechnologySearchParamsSchema = z.object({
  query: z.string().optional(),
  filters: TechnologyFiltersSchema.optional(),
  sortBy: z.enum(['name', 'category', 'proficiency', 'createdAt', 'order']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * Technology creation input schema
 */
export const CreateTechnologyInputSchema = TechnologySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Technology update input schema
 */
export const UpdateTechnologyInputSchema = TechnologySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

/**
 * Technology statistics schema
 */
export const TechnologyStatisticsSchema = z.object({
  total: NonNegativeNumberSchema,
  byCategory: z.record(TechnologyCategorySchema, NonNegativeNumberSchema),
  byProficiency: z.record(TechnologyProficiencySchema, NonNegativeNumberSchema),
  byLearningStatus: z.record(TechnologyLearningStatusSchema, NonNegativeNumberSchema),
  featured: NonNegativeNumberSchema,
  mostUsedInProjects: z.array(z.object({
    technology: TechnologySchema,
    projectCount: PositiveNumberSchema,
  })),
});

/**
 * Technology roadmap item schema
 */
export const TechnologyRoadmapItemSchema = z.object({
  technology: TechnologySchema,
  targetProficiency: TechnologyProficiencySchema,
  estimatedTimeToLearn: PositiveNumberSchema, // in weeks
  priority: z.enum(['low', 'medium', 'high']),
  prerequisites: z.array(TechnologySchema).optional(),
  resources: z.array(TechnologyResourceSchema),
  milestones: z.array(z.object({
    title: NonEmptyStringSchema,
    description: NonEmptyStringSchema,
    completed: z.boolean(),
    targetDate: z.date().optional(),
  })),
});

/**
 * Validation functions
 */
export const validateTechnology = (data: unknown) => {
  return TechnologySchema.safeParse(data);
};

export const validateCreateTechnologyInput = (data: unknown) => {
  return CreateTechnologyInputSchema.safeParse(data);
};

export const validateUpdateTechnologyInput = (data: unknown) => {
  return UpdateTechnologyInputSchema.safeParse(data);
};

export const validateTechnologyFilters = (data: unknown) => {
  return TechnologyFiltersSchema.safeParse(data);
};

export const validateTechnologySearchParams = (data: unknown) => {
  return TechnologySearchParamsSchema.safeParse(data);
};

export const validateTechnologySkillGroup = (data: unknown) => {
  return TechnologySkillGroupSchema.safeParse(data);
};

export const validateTechnologyRoadmapItem = (data: unknown) => {
  return TechnologyRoadmapItemSchema.safeParse(data);
};