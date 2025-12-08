import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { useTheme } from '../../hooks/use-theme';
import { DSButton } from '../ds/button';

/**
 * Topbar - Application top navigation bar
 * Contains search, time, theme toggle, and user menu placeholders
 */

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Left-aligned content (e.g., page title, breadcrumbs)
   */
  left?: React.ReactNode;
  /**
   * Right-aligned actions and controls
   */
  right?: React.ReactNode;
  /**
   * Show search placeholder
   */
  showSearch?: boolean;
  /**
   * Show time/clock placeholder
   */
  showTime?: boolean;
  /**
   * Show theme toggle placeholder
   */
  showTheme?: boolean;
  /**
   * Show user menu placeholder
   */
  showUser?: boolean;
}

function Topbar({
  className,
  left,
  right,
  showSearch = true,
  showTime = true,
  showTheme = true,
  showUser = true,
  ...props
}: TopbarProps) {
  const { toggleTheme, resolvedTheme } = useTheme();

  return (
    <header
      data-slot="topbar"
      className={cn(
        'flex h-14 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-4',
        className,
      )}
      {...props}
    >
      {/* Left section */}
      <div className="flex items-center gap-2 sm:gap-4">{left}</div>

      {/* Right section with placeholders */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Search placeholder - responsive width */}
        {showSearch && (
          <DSButton
            variant="outline"
            size="sm"
            className="h-9 w-32 justify-start gap-2 text-muted-foreground sm:w-48 lg:w-64"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="hidden sm:inline">Search...</span>
          </DSButton>
        )}

        {/* Time placeholder */}
        {showTime && (
          <DSButton variant="ghost" size="icon" title="Time">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </DSButton>
        )}

        {/* Theme toggle - functional */}
        {showTheme && (
          <DSButton variant="ghost" size="icon" title="Toggle theme" onClick={toggleTheme}>
            {resolvedTheme === 'dark' ? (
              // Moon icon for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              // Sun icon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            )}
          </DSButton>
        )}

        {/* User menu placeholder */}
        {showUser && (
          <DSButton variant="ghost" size="icon" className="rounded-full" title="User menu">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              U
            </div>
          </DSButton>
        )}

        {/* Custom right content - appears after built-in controls */}
        {right}
      </div>
    </header>
  );
}

export { Topbar };
