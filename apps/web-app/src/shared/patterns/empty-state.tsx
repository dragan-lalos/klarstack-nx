import * as React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Minimal empty state component.
 */
export const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-card p-10 text-center">
      <div className="text-lg font-semibold text-foreground">{title}</div>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
