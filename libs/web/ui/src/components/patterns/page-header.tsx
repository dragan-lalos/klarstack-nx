import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * PageHeader - Header section for pages
 * Displays page title, description, and actions
 */

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Page title
   */
  title: string;
  /**
   * Optional description or subtitle
   */
  description?: string;
  /**
   * Action buttons or controls
   */
  actions?: React.ReactNode;
  /**
   * Breadcrumbs or back navigation
   */
  breadcrumbs?: React.ReactNode;
}

function PageHeader({
  className,
  title,
  description,
  actions,
  breadcrumbs,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn('border-b border-border bg-card', className)}
      {...props}
    >
      <div className="px-4 py-4 sm:px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && <div className="mb-2 text-sm text-muted-foreground">{breadcrumbs}</div>}

        {/* Title and actions - responsive layout */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h1>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>

          {/* Actions */}
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

export { PageHeader };
