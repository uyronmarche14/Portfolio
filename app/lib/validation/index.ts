/**
 * Validation utilities for the portfolio application
 */

import type { LegacyProject } from '@/lib/data/projects';

/**
 * Validate a project object
 */
export function validateProject(project: LegacyProject): boolean {
  if (!project.id || typeof project.id !== 'string') return false;
  if (!project.title || typeof project.title !== 'string') return false;
  if (!project.description || typeof project.description !== 'string') return false;
  if (!Array.isArray(project.technologies)) return false;
  if (!Array.isArray(project.features)) return false;
  if (!Array.isArray(project.screenshots)) return false;
  
  return true;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}