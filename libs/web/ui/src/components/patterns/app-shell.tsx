import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * AppShell - Main application layout wrapper
 * Provides the core structure for the application with sidebar and main content areas
 */

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Sidebar content (typically SidebarNav)
   */
  sidebar?: React.ReactNode;
  /**
   * Top navigation bar (typically Topbar)
   */
  topbar?: React.ReactNode;
  /**
   * Main content area
   */
  children: React.ReactNode;
  /**
   * Whether the sidebar is collapsed
   */
  sidebarCollapsed?: boolean;
}

function AppShell({
  className,
  sidebar,
  topbar,
  children,
  sidebarCollapsed = false,
  ...props
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn('flex h-screen w-full overflow-hidden bg-background', className)}
      {...props}
    >
      {/* Sidebar - Hidden on mobile/tablet (< 1024px) */}
      {sidebar && (
        <aside
          className={cn(
            'hidden lg:flex flex-shrink-0 border-r border-border bg-card transition-all duration-300',
            sidebarCollapsed ? 'w-16' : 'w-64',
          )}
        >
          {sidebar}
        </aside>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        {topbar && (
          <header className="flex-shrink-0 border-b border-border bg-card">{topbar}</header>
        )}

        {/* Page content with responsive padding */}
        <main className="flex-1 overflow-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export { AppShell };
