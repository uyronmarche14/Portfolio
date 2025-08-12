/**
 * Contact validation schemas using Zod
 */

import { z } from 'zod';
import { 
  BaseEntitySchema, 
  ImageMetadataSchema, 
  LinkSchema,
  NonEmptyStringSchema,
  EmailSchema,
  PhoneSchema,
  UrlSchema,
  PositiveNumberSchema,
  NonNegativeNumberSchema,
  ValidationPatterns
} from './common';

/**
 * Contact method type schema
 */
export const ContactMethodTypeSchema = z.enum(['email', 'phone', 'social', 'messaging', 'other']);

/**
 * Social platform schema
 */
export const SocialPlatformSchema = z.enum([
  'linkedin',
  'github',
  'twitter',
  'instagram',
  'facebook',
  'youtube',
  'tiktok',
  'discord',
  'medium',
  'dev',
  'stackoverflow',
  'behance',
  'dribbble',
  'other'
]);

/**
 * Availability status schema
 */
export const AvailabilityStatusSchema = z.enum(['available', 'busy', 'away', 'unavailable']);

/**
 * Contact preference schema
 */
export const ContactPreferenceSchema = z.enum(['preferred', 'acceptable', 'emergency-only', 'not-preferred']);

/**
 * Email contact schema
 */
export const EmailContactSchema = z.object({
  address: EmailSchema,
  label: NonEmptyStringSchema,
  type: z.enum(['primary', 'secondary', 'work', 'personal']),
  preference: ContactPreferenceSchema,
  verified: z.boolean().optional(),
});

/**
 * Phone contact schema
 */
export const PhoneContactSchema = z.object({
  number: PhoneSchema,
  label: NonEmptyStringSchema,
  type: z.enum(['mobile', 'home', 'work', 'fax']),
  countryCode: z.string().optional(),
  preference: ContactPreferenceSchema,
  verified: z.boolean().optional(),
  whatsapp: z.boolean().optional(),
  telegram: z.boolean().optional(),
});

/**
 * Social link schema
 */
export const SocialLinkSchema = LinkSchema.extend({
  platform: SocialPlatformSchema,
  username: z.string().optional(),
  handle: z.string().optional(),
  verified: z.boolean().optional(),
  followerCount: NonNegativeNumberSchema.optional(),
  color: z.string().optional(),
  iconName: z.string().optional(),
  description: z.string().optional(),
  preference: ContactPreferenceSchema,
});

/**
 * Location info schema
 */
export const LocationInfoSchema = z.object({
  address: NonEmptyStringSchema,
  city: NonEmptyStringSchema,
  state: z.string().optional(),
  country: NonEmptyStringSchema,
  postalCode: z.string().optional(),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }).optional(),
  timezone: z.string().optional(),
  mapUrl: UrlSchema.optional(),
  embedUrl: UrlSchema.optional(),
  description: z.string().optional(),
});

/**
 * Time format schema (HH:MM)
 */
const TimeFormatSchema = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)');

/**
 * Availability schedule schema
 */
export const AvailabilityScheduleSchema = z.object({
  timezone: NonEmptyStringSchema,
  workingHours: z.object({
    monday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
    tuesday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
    wednesday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
    thursday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
    friday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
    saturday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
    sunday: z.object({
      start: TimeFormatSchema,
      end: TimeFormatSchema,
      available: z.boolean(),
    }).optional(),
  }),
  responseTime: z.object({
    email: NonEmptyStringSchema,
    phone: NonEmptyStringSchema,
    social: NonEmptyStringSchema,
  }),
});

/**
 * Contact form field schema
 */
export const ContactFormFieldSchema = z.object({
  name: NonEmptyStringSchema,
  label: NonEmptyStringSchema,
  type: z.enum(['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio']),
  required: z.boolean(),
  placeholder: z.string().optional(),
  validation: z.object({
    pattern: z.string().optional(),
    minLength: PositiveNumberSchema.optional(),
    maxLength: PositiveNumberSchema.optional(),
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  options: z.array(NonEmptyStringSchema).optional(),
  order: NonNegativeNumberSchema,
});

/**
 * Contact form submission schema
 */
export const ContactFormSubmissionSchema = BaseEntitySchema.extend({
  name: NonEmptyStringSchema.max(100, 'Name must be under 100 characters'),
  email: EmailSchema,
  subject: z.string().max(200, 'Subject must be under 200 characters').optional(),
  message: NonEmptyStringSchema.max(2000, 'Message must be under 2000 characters'),
  phone: PhoneSchema.optional(),
  company: z.string().max(100, 'Company name must be under 100 characters').optional(),
  projectType: z.string().max(100, 'Project type must be under 100 characters').optional(),
  budget: z.string().max(50, 'Budget must be under 50 characters').optional(),
  timeline: z.string().max(100, 'Timeline must be under 100 characters').optional(),
  source: z.string().max(100, 'Source must be under 100 characters').optional(),
  status: z.enum(['new', 'read', 'replied', 'archived']),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(NonEmptyStringSchema).optional(),
  notes: z.string().optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  referrer: UrlSchema.optional(),
});

/**
 * Main ContactInfo schema
 */
export const ContactInfoSchema = BaseEntitySchema.extend({
  // Personal Information
  name: NonEmptyStringSchema.max(100, 'Name must be under 100 characters'),
  title: NonEmptyStringSchema.max(100, 'Title must be under 100 characters'),
  bio: z.string().max(1000, 'Bio must be under 1000 characters').optional(),
  avatar: ImageMetadataSchema.optional(),
  
  // Contact Methods
  emails: z.array(EmailContactSchema).min(1, 'At least one email is required'),
  phones: z.array(PhoneContactSchema),
  socialLinks: z.array(SocialLinkSchema),
  
  // Location
  location: LocationInfoSchema,
  
  // Availability
  availability: z.object({
    status: AvailabilityStatusSchema,
    message: z.string().optional(),
    schedule: AvailabilityScheduleSchema,
    forHire: z.boolean(),
    openToOpportunities: z.boolean(),
  }),
  
  // Contact Form Configuration
  contactForm: z.object({
    enabled: z.boolean(),
    fields: z.array(ContactFormFieldSchema),
    submitMessage: NonEmptyStringSchema,
    autoReply: z.object({
      enabled: z.boolean(),
      subject: NonEmptyStringSchema,
      message: NonEmptyStringSchema,
    }),
  }),
  
  // Preferences
  preferences: z.object({
    preferredContactMethod: ContactMethodTypeSchema,
    languages: z.array(NonEmptyStringSchema).min(1, 'At least one language is required'),
    communicationStyle: z.string().optional(),
  }),
  
  // Professional Information
  resume: z.object({
    url: UrlSchema,
    lastUpdated: z.date(),
    versions: z.array(z.object({
      name: NonEmptyStringSchema,
      url: UrlSchema,
      description: z.string().optional(),
    })).optional(),
  }).optional(),
  
  // Additional Information
  calendlyUrl: UrlSchema.optional(),
  meetingScheduler: UrlSchema.optional(),
  portfolio: UrlSchema.optional(),
  website: UrlSchema.optional(),
  
  // Display Properties
  visible: z.boolean(),
  order: NonNegativeNumberSchema.optional(),
});

/**
 * Contact statistics schema
 */
export const ContactStatisticsSchema = z.object({
  totalSubmissions: NonNegativeNumberSchema,
  submissionsByMonth: z.record(z.string(), NonNegativeNumberSchema),
  submissionsBySource: z.record(z.string(), NonNegativeNumberSchema),
  responseRate: z.number().min(0).max(100), // percentage
  averageResponseTime: NonNegativeNumberSchema, // in hours
  topContactMethods: z.array(z.object({
    method: ContactMethodTypeSchema,
    count: NonNegativeNumberSchema,
  })),
});

/**
 * Contact form validation schema
 */
export const ContactFormValidationSchema = z.object({
  isValid: z.boolean(),
  errors: z.array(z.object({
    field: NonEmptyStringSchema,
    message: NonEmptyStringSchema,
  })),
});

/**
 * Contact creation input schema
 */
export const CreateContactInputSchema = ContactInfoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Contact update input schema
 */
export const UpdateContactInputSchema = ContactInfoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

/**
 * Contact form submission input schema
 */
export const CreateContactSubmissionInputSchema = ContactFormSubmissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
});

/**
 * Contact form submission update input schema
 */
export const UpdateContactSubmissionInputSchema = ContactFormSubmissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

/**
 * Validation functions
 */
export const validateContactInfo = (data: unknown) => {
  return ContactInfoSchema.safeParse(data);
};

export const validateCreateContactInput = (data: unknown) => {
  return CreateContactInputSchema.safeParse(data);
};

export const validateUpdateContactInput = (data: unknown) => {
  return UpdateContactInputSchema.safeParse(data);
};

export const validateContactFormSubmission = (data: unknown) => {
  return ContactFormSubmissionSchema.safeParse(data);
};

export const validateCreateContactSubmissionInput = (data: unknown) => {
  return CreateContactSubmissionInputSchema.safeParse(data);
};

export const validateUpdateContactSubmissionInput = (data: unknown) => {
  return UpdateContactSubmissionInputSchema.safeParse(data);
};

export const validateEmailContact = (data: unknown) => {
  return EmailContactSchema.safeParse(data);
};

export const validatePhoneContact = (data: unknown) => {
  return PhoneContactSchema.safeParse(data);
};

export const validateSocialLink = (data: unknown) => {
  return SocialLinkSchema.safeParse(data);
};

export const validateLocationInfo = (data: unknown) => {
  return LocationInfoSchema.safeParse(data);
};