/**
 * Data transformation utilities
 * Functions for transforming, formatting, and manipulating data structures
 */

import { Project, AboutContent, Experience, Education, Skill, Technology } from '@/lib/types';

/**
 * Transform raw project data to Project interface
 */
export function transformProjectData(rawData: any): Project {
  const now = new Date();
  
  return {
    id: rawData.id || generateId(),
    title: rawData.title || '',
    description: rawData.description || '',
    shortDescription: rawData.shortDescription || rawData.description?.substring(0, 150),
    category: rawData.category || 'web',
    status: rawData.status || 'completed',
    content: rawData.content || rawData.paragraph || '',
    features: transformFeatures(rawData.features || []),
    images: transformImages(rawData.images || [], rawData.image, rawData.screenshots),
    technologies: transformTechnologies(rawData.technologies || []),
    links: transformLinks(rawData.links || [], rawData.githubUrl, rawData.liveUrl, rawData.liveDemoUrl),
    timeline: transformTimeline(rawData.timeline || []),
    featured: rawData.featured ?? true,
    tags: transformTags(rawData.tags || rawData.technologies || []),
    visible: rawData.visible ?? true,
    createdAt: rawData.createdAt ? new Date(rawData.createdAt) : now,
    updatedAt: rawData.updatedAt ? new Date(rawData.updatedAt) : now,
  };
}

/**
 * Transform features array
 */
function transformFeatures(features: any[]): Project['features'] {
  return features.map((feature, index) => ({
    id: typeof feature === 'object' ? feature.id || `feature-${index}` : `feature-${index}`,
    title: typeof feature === 'string' ? feature : feature.title || feature.name || '',
    description: typeof feature === 'string' ? feature : feature.description || feature.title || '',
    implemented: typeof feature === 'object' ? feature.implemented ?? true : true,
    priority: typeof feature === 'object' ? feature.priority || 'medium' : 'medium',
  }));
}

/**
 * Transform images array
 */
function transformImages(images: any[], mainImage?: string, screenshots?: string[]): Project['images'] {
  const result: Project['images'] = [];
  
  // Add main image if provided
  if (mainImage) {
    result.push({
      url: mainImage,
      alt: 'Project preview',
      type: 'preview',
      featured: true,
    });
  }
  
  // Add screenshots if provided
  if (screenshots?.length) {
    screenshots.forEach((screenshot, index) => {
      result.push({
        url: screenshot,
        alt: `Screenshot ${index + 1}`,
        type: 'screenshot',
        order: index,
      });
    });
  }
  
  // Add any additional images
  if (images?.length) {
    images.forEach((image, index) => {
      if (typeof image === 'string') {
        result.push({
          url: image,
          alt: `Image ${index + 1}`,
          type: 'screenshot',
          order: result.length,
        });
      } else {
        result.push({
          url: image.url || image.src || '',
          alt: image.alt || `Image ${index + 1}`,
          type: image.type || 'screenshot',
          featured: image.featured || false,
          order: image.order ?? result.length,
          width: image.width,
          height: image.height,
          caption: image.caption,
          placeholder: image.placeholder,
        });
      }
    });
  }
  
  return result;
}

/**
 * Transform technologies array
 */
function transformTechnologies(technologies: any[]): Technology[] {
  return technologies.map((tech, index) => {
    if (typeof tech === 'string') {
      return {
        id: `tech-${tech.toLowerCase().replace(/\s+/g, '-')}`,
        name: tech,
        category: 'other',
        icon: {
          name: tech.toLowerCase(),
          type: 'icon',
        },
        proficiency: 'advanced',
        learningStatus: 'proficient',
        featured: false,
        visible: true,
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    return {
      id: tech.id || `tech-${tech.name?.toLowerCase().replace(/\s+/g, '-')}` || `tech-${index}`,
      name: tech.name || '',
      category: tech.category || 'other',
      icon: tech.icon || { name: tech.name?.toLowerCase() || '', type: 'icon' },
      proficiency: tech.proficiency || 'advanced',
      learningStatus: tech.learningStatus || 'proficient',
      featured: tech.featured || false,
      visible: tech.visible ?? true,
      tags: tech.tags || [],
      createdAt: tech.createdAt ? new Date(tech.createdAt) : new Date(),
      updatedAt: tech.updatedAt ? new Date(tech.updatedAt) : new Date(),
    };
  });
}

/**
 * Transform links array
 */
function transformLinks(links: any[], githubUrl?: string, liveUrl?: string, liveDemoUrl?: string): Project['links'] {
  const result: Project['links'] = [];
  
  // Add GitHub link if provided
  if (githubUrl) {
    result.push({
      url: githubUrl,
      label: 'GitHub Repository',
      type: 'github',
      primary: true,
    });
  }
  
  // Add live demo link if provided
  if (liveUrl) {
    result.push({
      url: liveUrl,
      label: 'Live Demo',
      type: 'demo',
      primary: false,
    });
  }
  
  // Add additional live demo link if different from liveUrl
  if (liveDemoUrl && liveDemoUrl !== liveUrl) {
    result.push({
      url: liveDemoUrl,
      label: 'Live Demo',
      type: 'demo',
      primary: false,
    });
  }
  
  // Add any additional links
  if (links?.length) {
    links.forEach(link => {
      if (typeof link === 'string') {
        result.push({
          url: link,
          label: 'Link',
          type: 'website',
          primary: false,
        });
      } else {
        result.push({
          url: link.url || link.href || '',
          label: link.label || link.title || 'Link',
          type: link.type || 'website',
          primary: link.primary || false,
          external: link.external,
          icon: link.icon,
        });
      }
    });
  }
  
  return result;
}

/**
 * Transform timeline array
 */
function transformTimeline(timeline: any[]): Project['timeline'] {
  if (!timeline?.length) return undefined;
  
  return timeline.map(event => ({
    date: new Date(event.date),
    title: event.title || '',
    description: event.description || '',
    milestone: event.milestone ?? true,
    status: event.status,
  }));
}

/**
 * Transform tags array
 */
function transformTags(tags: any[]): string[] {
  return tags
    .map(tag => typeof tag === 'string' ? tag : tag.name || tag.title || '')
    .filter(Boolean)
    .map(tag => tag.toLowerCase());
}

/**
 * Generate a simple ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Format duration between two dates
 */
export function formatDuration(startDate: Date, endDate?: Date): string {
  const end = endDate || new Date();
  const diffTime = Math.abs(end.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'}`;
  }
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? '' : 's'}`;
  }
  
  const diffYears = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;
  
  if (remainingMonths === 0) {
    return `${diffYears} year${diffYears === 1 ? '' : 's'}`;
  }
  
  return `${diffYears} year${diffYears === 1 ? '' : 's'} ${remainingMonths} month${remainingMonths === 1 ? '' : 's'}`;
}

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`;
  } else {
    return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`;
  }
}

/**
 * Sort array by multiple criteria
 */
export function sortBy<T>(
  array: T[],
  ...criteria: Array<{
    key: keyof T | ((item: T) => any);
    order?: 'asc' | 'desc';
  }>
): T[] {
  return [...array].sort((a, b) => {
    for (const criterion of criteria) {
      const { key, order = 'asc' } = criterion;
      
      const aValue = typeof key === 'function' ? key(a) : a[key];
      const bValue = typeof key === 'function' ? key(b) : b[key];
      
      if (aValue < bValue) {
        return order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });
}

/**
 * Group array by key
 */
export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  key: keyof T | ((item: T) => K)
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : (item[key] as K);
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

/**
 * Filter array by multiple conditions
 */
export function filterBy<T>(
  array: T[],
  filters: Record<string, any>
): T[] {
  return array.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null) return true;
      
      const itemValue = (item as any)[key];
      
      if (Array.isArray(value)) {
        return Array.isArray(itemValue) 
          ? value.some(v => itemValue.includes(v))
          : value.includes(itemValue);
      }
      
      if (typeof value === 'string' && typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(value.toLowerCase());
      }
      
      return itemValue === value;
    });
  });
}

/**
 * Paginate array
 */
export function paginate<T>(
  array: T[],
  page: number,
  limit: number
): {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
} {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = array.slice(startIndex, endIndex);
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * Extract unique values from array
 */
export function unique<T>(array: T[], key?: keyof T | ((item: T) => any)): T[] {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Flatten nested array
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce<T[]>((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...flatten(item));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

/**
 * Calculate statistics for numeric array
 */
export function calculateStats(numbers: number[]): {
  min: number;
  max: number;
  sum: number;
  average: number;
  median: number;
  count: number;
} {
  if (numbers.length === 0) {
    return { min: 0, max: 0, sum: 0, average: 0, median: 0, count: 0 };
  }
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    sum,
    average,
    median,
    count: numbers.length,
  };
}