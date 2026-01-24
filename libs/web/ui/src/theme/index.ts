/**
 * Shared theming utilities for Klarstack-nx apps.
 * 
 * Provides SSR-safe dark/light mode with:
 * - No theme flash on page load
 * - System preference detection
 * - localStorage persistence
 * - Independent per-app configuration
 */

export { ThemeProvider } from './ThemeProvider';
export type {
  ThemeProviderOptions,
  ThemeProviderProps,
  ThemeContextValue,
  ThemeOption,
  ResolvedTheme,
  Attribute,
} from './ThemeProvider';

export { useTheme } from './useTheme';

export { getThemeScript } from './themeScript';
export type { ThemeScriptOptions } from './themeScript';

export { ThemeSelector } from './ThemeSelector';
