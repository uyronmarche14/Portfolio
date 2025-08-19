/**
 * Contact-related type definitions
 */

import type { BaseEntity, ImageMetadata, Link } from "./common";

/**
 * Contact method types
 */
export type ContactMethodType =
  | "email"
  | "phone"
  | "social"
  | "messaging"
  | "other";

/**
 * Social platform enumeration
 */
export type SocialPlatform =
  | "linkedin"
  | "github"
  | "twitter"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "discord"
  | "medium"
  | "dev"
  | "stackoverflow"
  | "behance"
  | "dribbble"
  | "other";

/**
 * Contact availability status
 */
export type AvailabilityStatus = "available" | "busy" | "away" | "unavailable";

/**
 * Contact preference for different types of communication
 */
export type ContactPreference =
  | "preferred"
  | "acceptable"
  | "emergency-only"
  | "not-preferred";

/**
 * Email contact information
 */
export interface EmailContact {
  address: string;
  label: string;
  type: "primary" | "secondary" | "work" | "personal";
  preference: ContactPreference;
  verified?: boolean;
}

/**
 * Phone contact information
 */
export interface PhoneContact {
  number: string;
  label: string;
  type: "mobile" | "home" | "work" | "fax";
  countryCode?: string;
  preference: ContactPreference;
  verified?: boolean;
  whatsapp?: boolean;
  telegram?: boolean;
}

/**
 * Social media link with enhanced metadata
 */
export interface SocialLink extends Link {
  platform: SocialPlatform;
  username?: string;
  handle?: string;
  verified?: boolean;
  followerCount?: number;
  color?: string;
  iconName?: string;
  description?: string;
  preference: ContactPreference;
}

/**
 * Physical location information
 */
export interface LocationInfo {
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  timezone?: string;
  mapUrl?: string;
  embedUrl?: string;
  description?: string;
}

/**
 * Availability schedule
 */
export interface AvailabilitySchedule {
  timezone: string;
  workingHours: {
    [key in
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday"]?: {
      start: string; // HH:MM format
      end: string; // HH:MM format
      available: boolean;
    };
  };
  responseTime: {
    email: string; // e.g., "within 24 hours"
    phone: string; // e.g., "within 2 hours"
    social: string; // e.g., "within 1 hour"
  };
}

/**
 * Contact form field configuration
 */
export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "radio";
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  options?: string[]; // for select, checkbox, radio
  order: number;
}

/**
 * Contact form submission
 */
export interface ContactFormSubmission extends BaseEntity {
  name: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  source?: string; // How they found you
  status: "new" | "read" | "replied" | "archived";
  priority: "low" | "medium" | "high";
  tags?: string[];
  notes?: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

/**
 * Main ContactInfo interface
 */
export interface ContactInfo extends BaseEntity {
  // Personal Information
  name: string;
  title: string;
  bio?: string;
  avatar?: ImageMetadata;

  // Contact Methods
  emails: EmailContact[];
  phones: PhoneContact[];
  socialLinks: SocialLink[];

  // Location
  location: LocationInfo;

  // Availability
  availability: {
    status: AvailabilityStatus;
    message?: string;
    schedule: AvailabilitySchedule;
    forHire: boolean;
    openToOpportunities: boolean;
  };

  // Contact Form Configuration
  contactForm: {
    enabled: boolean;
    fields: ContactFormField[];
    submitMessage: string;
    autoReply: {
      enabled: boolean;
      subject: string;
      message: string;
    };
  };

  // Preferences
  preferences: {
    preferredContactMethod: ContactMethodType;
    languages: string[];
    communicationStyle?: string;
  };

  // Professional Information
  resume?: {
    url: string;
    lastUpdated: Date;
    versions?: {
      name: string;
      url: string;
      description?: string;
    }[];
  };

  // Additional Information
  calendlyUrl?: string;
  meetingScheduler?: string;
  portfolio?: string;
  website?: string;

  // Display Properties
  visible: boolean;
  order?: number;
}

/**
 * Contact statistics interface
 */
export interface ContactStatistics {
  totalSubmissions: number;
  submissionsByMonth: Record<string, number>;
  submissionsBySource: Record<string, number>;
  responseRate: number;
  averageResponseTime: number; // in hours
  topContactMethods: {
    method: ContactMethodType;
    count: number;
  }[];
}

/**
 * Contact form validation result
 */
export interface ContactFormValidation {
  isValid: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}

/**
 * Contact creation input
 */
export type CreateContactInput = Omit<
  ContactInfo,
  "id" | "createdAt" | "updatedAt"
>;

/**
 * Contact update input
 */
export type UpdateContactInput = Partial<
  Omit<ContactInfo, "id" | "createdAt" | "updatedAt">
>;

/**
 * Contact form submission input
 */
export type CreateContactSubmissionInput = Omit<
  ContactFormSubmission,
  "id" | "createdAt" | "updatedAt" | "status"
>;

/**
 * Contact form submission update input
 */
export type UpdateContactSubmissionInput = Partial<
  Omit<ContactFormSubmission, "id" | "createdAt" | "updatedAt">
>;
