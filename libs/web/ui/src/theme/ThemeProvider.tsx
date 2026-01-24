'use client';

import * as React from 'react';

export type ThemeOption = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type Attribute = 'class' | 'data-theme';

export interface ThemeProviderOptions {
  /**
   * The HTML attribute to use for applying the theme.
   * - 'class': Adds/removes 'dark' class to documentElement
   * - 'data-theme': Sets data-theme attribute to 'light' or 'dark'
   * @default 'class'
   */
  attribute?: Attribute;
  
  /**
   * The default theme to use when no stored theme is found.
   * @default 'system'
   */
  defaultTheme?: ThemeOption;
  
  /**
   * Whether to enable system theme preference detection.
   * @default true
   */
  enableSystem?: boolean;
  
  /**
   * The localStorage key to use for persisting the theme.
   * Must be unique per app to avoid conflicts.
   * @required
   */
  storageKey: string;
  
  /**
   * Whether to disable CSS transitions during theme changes.
   * Prevents jarring animations when switching themes.
   * @default true
   */
  disableTransitionOnChange?: boolean;
}

export interface ThemeContextValue {
  /** The current theme setting (may be 'system') */
  theme: ThemeOption;
  
  /** The resolved theme (always 'light' or 'dark', never 'system') */
  resolvedTheme: ResolvedTheme;
  
  /** Set the theme */
  setTheme: (theme: ThemeOption) => void;
  
  /** Toggle between light and dark */
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps extends ThemeProviderOptions {
  children: React.ReactNode;
}

/**
 * Shared theme provider that handles dark/light mode with SSR support.
 * 
 * Features:
 * - Persists theme choice to localStorage
 * - Supports system preference detection
 * - Prevents theme flash on page load (use with getThemeScript)
 * - Listens to system preference changes when theme is 'system'
 * - Optimized to avoid redundant DOM updates
 * - Optional transition disabling during theme changes
 */
export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  storageKey,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<ThemeOption>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>('light');

  // Resolve theme choice to actual 'light' or 'dark'
  const resolveTheme = React.useCallback(
    (themeOption: ThemeOption): ResolvedTheme => {
      if (themeOption === 'system' && enableSystem) {
        if (typeof window !== 'undefined') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
      }
      return themeOption as ResolvedTheme;
    },
    [enableSystem]
  );

  // Apply theme to DOM
  const applyTheme = React.useCallback(
    (resolved: ResolvedTheme) => {
      if (typeof window === 'undefined') return;

      const root = document.documentElement;

      // Temporarily disable transitions if requested
      if (disableTransitionOnChange) {
        const css = document.createElement('style');
        css.textContent = '*,*::before,*::after{transition:none!important;animation:none!important;}';
        document.head.appendChild(css);

        // Force reflow
        window.getComputedStyle(document.body);

        // Remove the style on next frame
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.head.removeChild(css);
          });
        });
      }

      // Apply theme based on attribute type
      if (attribute === 'class') {
        root.classList.toggle('dark', resolved === 'dark');
      } else if (attribute === 'data-theme') {
        root.dataset.theme = resolved;
      }
    },
    [attribute, disableTransitionOnChange]
  );

  // Initialize theme from localStorage on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(storageKey) as ThemeOption | null;
      const initialTheme = stored || defaultTheme;
      const resolved = resolveTheme(initialTheme);

      setThemeState(initialTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    } catch (e) {
      // localStorage might be blocked
      console.warn('Failed to load theme from localStorage:', e);
      const resolved = resolveTheme(defaultTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for system preference changes when theme is 'system'
  React.useEffect(() => {
    if (theme !== 'system' || !enableSystem) return;
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const resolved = resolveTheme('system');
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, enableSystem, resolveTheme, applyTheme]);

  const setTheme = React.useCallback(
    (newTheme: ThemeOption) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.warn('Failed to save theme to localStorage:', e);
      }

      setThemeState(newTheme);
      const resolved = resolveTheme(newTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    },
    [storageKey, resolveTheme, applyTheme]
  );

  const toggleTheme = React.useCallback(() => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
