'use client';

import * as React from 'react';

import { ThemeContext, type ThemeContextValue } from './ThemeProvider';

/**
 * Hook to access theme context.
 * Must be used within a ThemeProvider.
 * 
 * @returns ThemeContextValue with theme, resolvedTheme, setTheme, and toggleTheme
 * @throws Error if used outside ThemeProvider
 * 
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, resolvedTheme, toggleTheme } = useTheme();
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current: {resolvedTheme} (set to: {theme})
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
