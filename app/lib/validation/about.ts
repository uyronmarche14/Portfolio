/**
 * About section validation schemas using Zod
 */

import { z } from 'zod';

import { 
  BaseEntitySchema, 
  ImageMetadataSchema, 
  LinkSchema,
  DateRangeSchema,
  NonEmptyStringSchema,
  UrlSchema,
  PositiveNumberSchema,
  NonNegativeNumberSchema
} from './common';
import { TechnologySchema } from './technology';

/**
 * Skill proficiency schema
 */
export const SkillProficiencySchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);

/**
 * Skill category schema
 */
export const SkillCategorySchema = z.enum([
  'technical',
  'soft',
  'language',
  'design',
  'management',
  'communication',
  'other'
]);

/**
 * Experience type schema
 */
export const ExperienceTypeSchema = z.enum(['work', 'freelance', 'internship', 'volunteer', 'project', 'education']);

/**
 * Education level schema
 */
export const EducationLevelSchema = z.enum([
  'high-school',
  'associate',
  'bachelor',
  'master',
  'doctorate',
  'certificate',
  'bootcamp',
  'online-course',
  'other'
]);

/**
 * Achievement category schema
 */
export const AchievementCategorySchema = z.enum([
  'award',
  'certification',
  'publication',
  'speaking',
  'competition',
  'recognition',
  'milestone',
  'other'
]);

/**
 * Individual skill schema
 */
export const SkillSchema = z.object({
  id: NonEmptyStringSchema,
  name: NonEmptyStringSchema.max(50, 'Skill name must be under 50 characters'),
  category: SkillCategorySchema,
  proficiency: SkillProficiencySchema,
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  yearsOfExperience: PositiveNumberSchema.optional(),
  technologies: z.array(TechnologySchema).optional(),
  projects: z.array(NonEmptyStringSchema).optional(), // Project IDs
  certifications: z.array(NonEmptyStringSchema).optional(),
  endorsements: NonNegativeNumberSchema.optional(),
  featured: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
});

/**
 * Skill group schema
 */
export const SkillGroupSchema = z.object({
  id: NonEmptyStringSchema,
  name: NonEmptyStringSchema.max(100, 'Group name must be under 100 characters'),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  category: SkillCategorySchema,
  skills: z.array(SkillSchema),
  icon: z.string().optional(),
  color: z.string().optional(),
  order: NonNegativeNumberSchema.optional(),
});

/**
 * Work experience schema
 */
export const ExperienceSchema = BaseEntitySchema.extend({
  // Basic Information
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  company: NonEmptyStringSchema.max(100, 'Company name must be under 100 characters'),
  location: NonEmptyStringSchema.max(100, 'Location must be under 100 characters'),
  type: ExperienceTypeSchema,
  
  // Duration
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean(),
  duration: z.string().optional(), // Calculated field
  
  // Content
  description: NonEmptyStringSchema.max(1000, 'Description must be under 1000 characters'),
  responsibilities: z.array(NonEmptyStringSchema).min(1, 'At least one responsibility is required'),
  achievements: z.array(NonEmptyStringSchema),
  
  // Technical Details
  technologies: z.array(TechnologySchema),
  skills: z.array(SkillSchema),
  
  // Media and Links
  logo: ImageMetadataSchema.optional(),
  website: UrlSchema.optional(),
  portfolio: z.array(LinkSchema).optional(),
  
  // Additional Information
  teamSize: PositiveNumberSchema.optional(),
  reportingTo: z.string().max(100, 'Reporting to must be under 100 characters').optional(),
  managedTeam: z.boolean().optional(),
  remoteWork: z.boolean().optional(),
  
  // Display Properties
  featured: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
  visible: z.boolean(),
}).refine(
  (data) => data.current || data.endDate,
  {
    message: 'End date is required when position is not current',
    path: ['endDate'],
  }
).refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'Start date must be before or equal to end date',
    path: ['endDate'],
  }
);

/**
 * Education schema
 */
export const EducationSchema = BaseEntitySchema.extend({
  // Basic Information
  institution: NonEmptyStringSchema.max(100, 'Institution name must be under 100 characters'),
  degree: NonEmptyStringSchema.max(100, 'Degree must be under 100 characters'),
  field: NonEmptyStringSchema.max(100, 'Field of study must be under 100 characters'),
  level: EducationLevelSchema,
  
  // Duration
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean(),
  
  // Academic Details
  gpa: z.number().min(0).max(4).optional(),
  maxGpa: z.number().min(0).max(4).optional(),
  honors: z.array(NonEmptyStringSchema).optional(),
  relevantCoursework: z.array(NonEmptyStringSchema).optional(),
  
  // Content
  description: z.string().max(1000, 'Description must be under 1000 characters').optional(),
  achievements: z.array(NonEmptyStringSchema).optional(),
  activities: z.array(NonEmptyStringSchema).optional(),
  
  // Media and Links
  logo: ImageMetadataSchema.optional(),
  website: UrlSchema.optional(),
  transcript: UrlSchema.optional(),
  certificate: UrlSchema.optional(),
  
  // Location
  location: NonEmptyStringSchema.max(100, 'Location must be under 100 characters'),
  
  // Display Properties
  featured: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
  visible: z.boolean(),
}).refine(
  (data) => data.current || data.endDate,
  {
    message: 'End date is required when education is not current',
    path: ['endDate'],
  }
).refine(
  (data) => !data.endDate || data.startDate <= data.endDate,
  {
    message: 'Start date must be before or equal to end date',
    path: ['endDate'],
  }
).refine(
  (data) => !data.gpa || !data.maxGpa || data.gpa <= data.maxGpa,
  {
    message: 'GPA cannot exceed maximum GPA',
    path: ['gpa'],
  }
);

/**
 * Certification schema
 */
export const CertificationSchema = BaseEntitySchema.extend({
  // Basic Information
  name: NonEmptyStringSchema.max(100, 'Certification name must be under 100 characters'),
  issuer: NonEmptyStringSchema.max(100, 'Issuer name must be under 100 characters'),
  description: z.string().max(500, 'Description must be under 500 characters').optional(),
  
  // Dates
  issueDate: z.date(),
  expirationDate: z.date().optional(),
  neverExpires: z.boolean(),
  
  // Verification
  credentialId: z.string().max(100, 'Credential ID must be under 100 characters').optional(),
  credentialUrl: UrlSchema.optional(),
  verified: z.boolean(),
  
  // Media and Links
  badge: ImageMetadataSchema.optional(),
  certificate: UrlSchema.optional(),
  
  // Related Information
  technologies: z.array(TechnologySchema).optional(),
  skills: z.array(SkillSchema).optional(),
  
  // Display Properties
  featured: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
  visible: z.boolean(),
}).refine(
  (data) => data.neverExpires || data.expirationDate,
  {
    message: 'Expiration date is required when certification expires',
    path: ['expirationDate'],
  }
).refine(
  (data) => !data.expirationDate || data.issueDate <= data.expirationDate,
  {
    message: 'Issue date must be before or equal to expiration date',
    path: ['expirationDate'],
  }
);

/**
 * Achievement schema
 */
export const AchievementSchema = BaseEntitySchema.extend({
  // Basic Information
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  category: AchievementCategorySchema,
  description: NonEmptyStringSchema.max(1000, 'Description must be under 1000 characters'),
  
  // Date and Context
  date: z.date(),
  organization: z.string().max(100, 'Organization name must be under 100 characters').optional(),
  event: z.string().max(100, 'Event name must be under 100 characters').optional(),
  location: z.string().max(100, 'Location must be under 100 characters').optional(),
  
  // Media and Links
  image: ImageMetadataSchema.optional(),
  certificate: UrlSchema.optional(),
  url: UrlSchema.optional(),
  
  // Additional Information
  impact: z.string().max(500, 'Impact description must be under 500 characters').optional(),
  recognition: z.string().max(500, 'Recognition description must be under 500 characters').optional(),
  
  // Display Properties
  featured: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
  visible: z.boolean(),
});

/**
 * Timeline event schema
 */
export const TimelineEventSchema = z.object({
  id: NonEmptyStringSchema,
  date: z.date(),
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  description: NonEmptyStringSchema.max(500, 'Description must be under 500 characters'),
  type: z.enum(['work', 'education', 'project', 'achievement', 'milestone', 'other']),
  icon: z.string().optional(),
  color: z.string().optional(),
  relatedId: z.string().optional(), // ID of related experience, education, etc.
  featured: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
});

/**
 * Personal info schema
 */
export const PersonalInfoSchema = z.object({
  // Basic Information
  fullName: NonEmptyStringSchema.max(100, 'Full name must be under 100 characters'),
  displayName: NonEmptyStringSchema.max(50, 'Display name must be under 50 characters'),
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  tagline: z.string().max(200, 'Tagline must be under 200 characters').optional(),
  
  // Bio and Description
  bio: NonEmptyStringSchema.max(2000, 'Bio must be under 2000 characters'),
  shortBio: z.string().max(500, 'Short bio must be under 500 characters').optional(),
  elevator_pitch: z.string().max(300, 'Elevator pitch must be under 300 characters').optional(),
  
  // Media
  avatar: ImageMetadataSchema,
  coverImage: ImageMetadataSchema.optional(),
  gallery: z.array(ImageMetadataSchema).optional(),
  
  // Personal Details
  birthDate: z.date().optional(),
  nationality: z.string().max(50, 'Nationality must be under 50 characters').optional(),
  languages: z.array(z.object({
    language: NonEmptyStringSchema.max(50, 'Language name must be under 50 characters'),
    proficiency: z.enum(['native', 'fluent', 'conversational', 'basic']),
  })).min(1, 'At least one language is required'),
  
  // Interests and Hobbies
  interests: z.array(NonEmptyStringSchema),
  hobbies: z.array(NonEmptyStringSchema),
  
  // Values and Personality
  values: z.array(NonEmptyStringSchema).optional(),
  personalityType: z.string().max(20, 'Personality type must be under 20 characters').optional(),
  workingStyle: z.string().max(500, 'Working style must be under 500 characters').optional(),
  
  // Fun Facts
  funFacts: z.array(NonEmptyStringSchema).optional(),
  quotes: z.array(z.object({
    text: NonEmptyStringSchema.max(500, 'Quote text must be under 500 characters'),
    author: z.string().max(100, 'Author name must be under 100 characters').optional(),
  })).optional(),
});

/**
 * Main AboutContent schema
 */
export const AboutContentSchema = BaseEntitySchema.extend({
  // Personal Information
  personal: PersonalInfoSchema,
  
  // Professional Information
  skills: z.array(SkillGroupSchema),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  certifications: z.array(CertificationSchema),
  achievements: z.array(AchievementSchema),
  
  // Timeline
  timeline: z.array(TimelineEventSchema),
  
  // Career Information
  careerObjective: z.string().max(1000, 'Career objective must be under 1000 characters').optional(),
  currentFocus: z.array(NonEmptyStringSchema).optional(),
  lookingFor: z.array(NonEmptyStringSchema).optional(),
  
  // Statistics
  stats: z.object({
    yearsOfExperience: NonNegativeNumberSchema,
    projectsCompleted: NonNegativeNumberSchema,
    technologiesUsed: NonNegativeNumberSchema,
    clientsSatisfied: NonNegativeNumberSchema.optional(),
    linesOfCode: NonNegativeNumberSchema.optional(),
    coffeeConsumed: NonNegativeNumberSchema.optional(), // Fun stat
  }).optional(),
  
  // Display Properties
  visible: z.boolean(),
  lastUpdated: z.date(),
});

/**
 * About filters schema
 */
export const AboutFiltersSchema = z.object({
  experienceType: z.array(ExperienceTypeSchema).optional(),
  skillCategory: z.array(SkillCategorySchema).optional(),
  educationLevel: z.array(EducationLevelSchema).optional(),
  featured: z.boolean().optional(),
  dateRange: DateRangeSchema.optional(),
});

/**
 * About content creation input schema
 */
export const CreateAboutContentInputSchema = AboutContentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * About content update input schema
 */
export const UpdateAboutContentInputSchema = AboutContentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

/**
 * About statistics schema
 */
export const AboutStatisticsSchema = z.object({
  totalExperience: NonNegativeNumberSchema, // in years
  totalEducation: NonNegativeNumberSchema,
  totalCertifications: NonNegativeNumberSchema,
  totalSkills: NonNegativeNumberSchema,
  skillsByCategory: z.record(SkillCategorySchema, NonNegativeNumberSchema),
  experienceByType: z.record(ExperienceTypeSchema, NonNegativeNumberSchema),
  topTechnologies: z.array(z.object({
    technology: TechnologySchema,
    yearsUsed: PositiveNumberSchema,
  })),
});

/**
 * Validation functions
 */
export const validateAboutContent = (data: unknown) => {
  return AboutContentSchema.safeParse(data);
};

export const validateCreateAboutContentInput = (data: unknown) => {
  return CreateAboutContentInputSchema.safeParse(data);
};

export const validateUpdateAboutContentInput = (data: unknown) => {
  return UpdateAboutContentInputSchema.safeParse(data);
};

export const validateSkill = (data: unknown) => {
  return SkillSchema.safeParse(data);
};

export const validateSkillGroup = (data: unknown) => {
  return SkillGroupSchema.safeParse(data);
};

export const validateExperience = (data: unknown) => {
  return ExperienceSchema.safeParse(data);
};

export const validateEducation = (data: unknown) => {
  return EducationSchema.safeParse(data);
};

export const validateCertification = (data: unknown) => {
  return CertificationSchema.safeParse(data);
};

export const validateAchievement = (data: unknown) => {
  return AchievementSchema.safeParse(data);
};

export const validateTimelineEvent = (data: unknown) => {
  return TimelineEventSchema.safeParse(data);
};

export const validatePersonalInfo = (data: unknown) => {
  return PersonalInfoSchema.safeParse(data);
};

export const validateAboutFilters = (data: unknown) => {
  return AboutFiltersSchema.safeParse(data);
};