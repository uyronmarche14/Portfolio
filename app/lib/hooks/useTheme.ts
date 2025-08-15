/**
 * Theme management hook
 * Provides theme switching, persistence, and system theme detection
 */

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
}

export interface UseThemeOptions {
  defaultTheme?: Theme;
  storageKey?: string;
  enableTransitions?: boolean;
  onThemeChange?: (theme: Theme, resolvedTheme: 'light' | 'dark') => void;
}

export interface UseThemeReturn extends ThemeConfig {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  cycleTheme: () => void;
  resetTheme: () => void;
}

/**
 * Custom hook for managing application theme
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const {
    defaultTheme = 'system',
    storageKey = 'portfolio-theme',
    enableTransitions = true,
    onThemeChange,
  } = options;

  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  /**
   * Get the resolved theme (actual theme being used)
   */
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  /**
   * Theme state helpers
   */
  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';
  const isSystem = theme === 'system';

  /**
   * Detect system theme preference
   */
  const detectSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  /**
   * Apply theme to document
   */
  const applyTheme = useCallback((newResolvedTheme: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(newResolvedTheme);
    body.classList.add(newResolvedTheme);

    // Update data attributes for CSS
    root.setAttribute('data-theme', newResolvedTheme);
    body.setAttribute('data-theme', newResolvedTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const color = newResolvedTheme === 'dark' ? '#0f0f0f' : '#ffffff';
      metaThemeColor.setAttribute('content', color);
    }

    // Handle transitions
    if (enableTransitions) {
      // Temporarily disable transitions during theme change
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          `* {
            -webkit-transition: none !important;
            -moz-transition: none !important;
            -o-transition: none !important;
            -ms-transition: none !important;
            transition: none !important;
          }`
        )
      );
      document.head.appendChild(css);

      // Re-enable transitions after a brief delay
      setTimeout(() => {
        document.head.removeChild(css);
      }, 1);
    }
  }, [enableTransitions]);

  /**
   * Set theme with persistence
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      try {
        if (newTheme === defaultTheme) {
          localStorage.removeItem(storageKey);
        } else {
          localStorage.setItem(storageKey, newTheme);
        }
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }
    }

    // Calculate resolved theme
    const newResolvedTheme = newTheme === 'system' ? systemTheme : newTheme;
    
    // Apply theme
    applyTheme(newResolvedTheme);

    // Notify callback
    onThemeChange?.(newTheme, newResolvedTheme);
  }, [defaultTheme, storageKey, systemTheme, applyTheme, onThemeChange]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      // If system, toggle to opposite of current system theme
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }, [theme, systemTheme, setTheme]);

  /**
   * Cycle through all theme options
   */
  const cycleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [theme, setTheme]);

  /**
   * Reset theme to default
   */
  const resetTheme = useCallback(() => {
    setTheme(defaultTheme);
  }, [defaultTheme, setTheme]);

  /**
   * Initialize theme from localStorage
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    }

    setMounted(true);
  }, [storageKey]);

  /**
   * Listen for system theme changes
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
    };

    // Set initial system theme
    setSystemTheme(detectSystemTheme());

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [detectSystemTheme]);

  /**
   * Apply theme when resolved theme changes
   */
  useEffect(() => {
    if (!mounted) return;
    
    applyTheme(resolvedTheme);
    onThemeChange?.(theme, resolvedTheme);
  }, [mounted, resolvedTheme, theme, applyTheme, onThemeChange]);

  /**
   * Handle SSR hydration
   */
  useEffect(() => {
    if (!mounted) return;

    // Ensure theme is applied after hydration
    const currentResolvedTheme = theme === 'system' ? detectSystemTheme() : theme;
    applyTheme(currentResolvedTheme);
  }, [mounted, theme, detectSystemTheme, applyTheme]);

  return {
    theme,
    systemTheme,
    resolvedTheme,
    isDark,
    isLight,
    isSystem,
    setTheme,
    toggleTheme,
    cycleTheme,
    resetTheme,
  };
}

/**
 * Hook for theme-aware CSS classes
 */
export function useThemeClasses() {
  const { resolvedTheme, isDark, isLight } = useTheme();

  return {
    theme: resolvedTheme,
    isDark,
    isLight,
    themeClass: resolvedTheme,
    containerClass: `theme-${resolvedTheme}`,
    textClass: isDark ? 'text-white' : 'text-black',
    bgClass: isDark ? 'bg-black' : 'bg-white',
    borderClass: isDark ? 'border-gray-700' : 'border-gray-300',
  };
}

/**
 * Hook for theme-aware colors
 */
export function useThemeColors() {
  const { resolvedTheme, isDark } = useTheme();

  return {
    theme: resolvedTheme,
    isDark,
    colors: {
      primary: isDark ? '#ffffff' : '#000000',
      secondary: isDark ? '#e5e5e5' : '#666666',
      background: isDark ? '#000000' : '#ffffff',
      surface: isDark ? '#1a1a1a' : '#f5f5f5',
      border: isDark ? '#333333' : '#e5e5e5',
      accent: isDark ? '#0ea5e9' : '#0284c7',
      success: isDark ? '#22c55e' : '#16a34a',
      warning: isDark ? '#f59e0b' : '#d97706',
      error: isDark ? '#ef4444' : '#dc2626',
    },
  };
}