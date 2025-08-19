/**
 * About section related type definitions
 */

import type { BaseEntity, ImageMetadata, Link, DateRange } from "./common";
import type { Technology } from "./technology";

/**
 * Skill proficiency levels
 */
export type SkillProficiency =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "expert";

/**
 * Skill category enumeration
 */
export type SkillCategory =
  | "technical"
  | "soft"
  | "language"
  | "design"
  | "management"
  | "communication"
  | "other";

/**
 * Experience type enumeration
 */
export type ExperienceType =
  | "work"
  | "freelance"
  | "internship"
  | "volunteer"
  | "project"
  | "education";

/**
 * Education level enumeration
 */
export type EducationLevel =
  | "high-school"
  | "associate"
  | "bachelor"
  | "master"
  | "doctorate"
  | "certificate"
  | "bootcamp"
  | "online-course"
  | "other";

/**
 * Achievement category enumeration
 */
export type AchievementCategory =
  | "award"
  | "certification"
  | "publication"
  | "speaking"
  | "competition"
  | "recognition"
  | "milestone"
  | "other";

/**
 * Individual skill interface
 */
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  description?: string;
  yearsOfExperience?: number;
  technologies?: Technology[];
  projects?: string[]; // Project IDs where this skill was used
  certifications?: string[];
  endorsements?: number;
  featured: boolean;
  order?: number;
}

/**
 * Skill group for organizing related skills
 */
export interface SkillGroup {
  id: string;
  name: string;
  description?: string;
  category: SkillCategory;
  skills: Skill[];
  icon?: string;
  color?: string;
  order?: number;
}

/**
 * Work experience interface
 */
export interface Experience extends BaseEntity {
  // Basic Information
  title: string;
  company: string;
  location: string;
  type: ExperienceType;

  // Duration
  startDate: Date;
  endDate?: Date;
  current: boolean;
  duration?: string; // Calculated field like "2 years 3 months"

  // Content
  description: string;
  responsibilities: string[];
  achievements: string[];

  // Technical Details
  technologies: Technology[];
  skills: Skill[];

  // Media and Links
  logo?: ImageMetadata;
  website?: string;
  portfolio?: Link[];

  // Additional Information
  teamSize?: number;
  reportingTo?: string;
  managedTeam?: boolean;
  remoteWork?: boolean;

  // Display Properties
  featured: boolean;
  order?: number;
  visible: boolean;
}

/**
 * Education interface
 */
export interface Education extends BaseEntity {
  // Basic Information
  institution: string;
  degree: string;
  field: string;
  level: EducationLevel;

  // Duration
  startDate: Date;
  endDate?: Date;
  current: boolean;

  // Academic Details
  gpa?: number;
  maxGpa?: number;
  honors?: string[];
  relevantCoursework?: string[];

  // Content
  description?: string;
  achievements?: string[];
  activities?: string[];

  // Media and Links
  logo?: ImageMetadata;
  website?: string;
  transcript?: string;
  certificate?: string;

  // Location
  location: string;

  // Display Properties
  featured: boolean;
  order?: number;
  visible: boolean;
}

/**
 * Certification interface
 */
export interface Certification extends BaseEntity {
  // Basic Information
  name: string;
  issuer: string;
  description?: string;

  // Dates
  issueDate: Date;
  expirationDate?: Date;
  neverExpires: boolean;

  // Verification
  credentialId?: string;
  credentialUrl?: string;
  verified: boolean;

  // Media and Links
  badge?: ImageMetadata;
  certificate?: string;

  // Related Information
  technologies?: Technology[];
  skills?: Skill[];

  // Display Properties
  featured: boolean;
  order?: number;
  visible: boolean;
}

/**
 * Achievement interface
 */
export interface Achievement extends BaseEntity {
  // Basic Information
  title: string;
  category: AchievementCategory;
  description: string;

  // Date and Context
  date: Date;
  organization?: string;
  event?: string;
  location?: string;

  // Media and Links
  image?: ImageMetadata;
  certificate?: string;
  url?: string;

  // Additional Information
  impact?: string;
  recognition?: string;

  // Display Properties
  featured: boolean;
  order?: number;
  visible: boolean;
}

/**
 * Timeline event for career/education timeline
 */
export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type:
    | "work"
    | "education"
    | "project"
    | "achievement"
    | "milestone"
    | "other";
  icon?: string;
  color?: string;
  relatedId?: string; // ID of related experience, education, etc.
  featured: boolean;
  order?: number;
}

/**
 * Personal information interface
 */
export interface PersonalInfo {
  // Basic Information
  fullName: string;
  displayName: string;
  title: string;
  tagline?: string;

  // Bio and Description
  bio: string;
  shortBio?: string;
  elevator_pitch?: string;

  // Media
  avatar: ImageMetadata;
  coverImage?: ImageMetadata;
  gallery?: ImageMetadata[];

  // Personal Details
  birthDate?: Date;
  nationality?: string;
  languages: {
    language: string;
    proficiency: "native" | "fluent" | "conversational" | "basic";
  }[];

  // Interests and Hobbies
  interests: string[];
  hobbies: string[];

  // Values and Personality
  values?: string[];
  personalityType?: string; // e.g., MBTI type
  workingStyle?: string;

  // Fun Facts
  funFacts?: string[];
  quotes?: {
    text: string;
    author?: string;
  }[];
}

/**
 * Main AboutContent interface
 */
export interface AboutContent extends BaseEntity {
  // Personal Information
  personal: PersonalInfo;

  // Professional Information
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  achievements: Achievement[];

  // Timeline
  timeline: TimelineEvent[];

  // Career Information
  careerObjective?: string;
  currentFocus?: string[];
  lookingFor?: string[];

  // Statistics
  stats?: {
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesUsed: number;
    clientsSatisfied?: number;
    linesOfCode?: number;
    coffeeConsumed?: number; // Fun stat
  };

  // Display Properties
  visible: boolean;
  lastUpdated: Date;
}

/**
 * About content filters
 */
export interface AboutFilters {
  experienceType?: ExperienceType[];
  skillCategory?: SkillCategory[];
  educationLevel?: EducationLevel[];
  featured?: boolean;
  dateRange?: DateRange;
}

/**
 * About content creation input
 */
export type CreateAboutContentInput = Omit<
  AboutContent,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * About content update input
 */
export type UpdateAboutContentInput = Partial<
  Omit<AboutContent, "id" | "createdAt" | "updatedAt">
>;

/**
 * About content statistics
 */
export interface AboutStatistics {
  totalExperience: number; // in years
  totalEducation: number;
  totalCertifications: number;
  totalSkills: number;
  skillsByCategory: Record<SkillCategory, number>;
  experienceByType: Record<ExperienceType, number>;
  topTechnologies: {
    technology: Technology;
    yearsUsed: number;
  }[];
}
