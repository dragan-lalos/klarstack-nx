import { useEffect, useState } from 'react';

/**
 * Theme options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Hook for managing application theme
 * Persists theme preference to localStorage
 * Supports system preference detection
 */
export function useTheme() {
  // Initialize theme from localStorage or default to system
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('@klastack-nx-theme') as Theme) || 'system';
  });

  // Get the actual theme to apply (resolving 'system' to 'light' or 'dark')
  const getResolvedTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return currentTheme;
  };

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    const resolvedTheme = getResolvedTheme(theme);

    // Light theme is the default (:root), only add class for dark theme
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist to localStorage
    localStorage.setItem('@klastack-nx-theme', theme);
  }, [theme]);

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const root = window.document.documentElement;
      const resolvedTheme = getResolvedTheme('system');

      if (resolvedTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    // Modern browsers
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  /**
   * Toggle between light and dark theme
   * If currently on system, switches to the opposite of current system preference
   */
  const toggleTheme = () => {
    const currentResolvedTheme = getResolvedTheme(theme);
    const newTheme = currentResolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    resolvedTheme: getResolvedTheme(theme),
  };
}
