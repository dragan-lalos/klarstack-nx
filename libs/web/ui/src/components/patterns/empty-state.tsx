import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { DSButton } from '../ds/button';

/**
 * EmptyState - Empty state placeholder
 * Displays when no data or content is available
 */

function DefaultIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted-foreground"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Main title/heading
   */
  title: string;
  /**
   * Description or message
   */
  description?: string;
  /**
   * Optional icon or illustration
   */
  icon?: React.ReactNode;
  /**
   * Primary action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Secondary action button
   */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({
  className,
  title,
  description,
  icon,
  action,
  secondaryAction,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        'flex min-h-[400px] flex-col items-center justify-center p-8 text-center',
        className,
      )}
      {...props}
    >
      {/* Icon */}
      <div className="mb-4">{icon || <DefaultIcon />}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      {/* Description */}
      {description && <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="mt-6 flex items-center gap-3">
          {action && <DSButton onClick={action.onClick}>{action.label}</DSButton>}
          {secondaryAction && (
            <DSButton variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </DSButton>
          )}
        </div>
      )}
    </div>
  );
}

export { EmptyState };
