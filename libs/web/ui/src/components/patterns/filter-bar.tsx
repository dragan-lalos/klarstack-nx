import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { DSButton } from '../ds/button';

/**
 * FilterBar - Filter controls bar
 * Displays filter options, quick filters, and clear action
 */

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Filter controls (dropdowns, inputs, etc.)
   */
  filters?: React.ReactNode;
  /**
   * Quick filter chips or buttons
   */
  quickFilters?: React.ReactNode;
  /**
   * Active filter count
   */
  activeCount?: number;
  /**
   * Callback when clear filters is clicked
   */
  onClear?: () => void;
  /**
   * Additional actions
   */
  actions?: React.ReactNode;
}

function FilterBar({
  className,
  filters,
  quickFilters,
  activeCount = 0,
  onClear,
  actions,
  ...props
}: FilterBarProps) {
  return (
    <div
      data-slot="filter-bar"
      className={cn(
        'flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-3',
        className,
      )}
      {...props}
    >
      {/* Filter controls */}
      {filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}

      {/* Quick filters */}
      {quickFilters && (
        <div className="flex items-center gap-2 border-l border-border pl-3">{quickFilters}</div>
      )}

      {/* Active count and clear */}
      {activeCount > 0 && (
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {activeCount} {activeCount === 1 ? 'filter' : 'filters'} active
          </span>
          {onClear && (
            <DSButton variant="ghost" size="sm" onClick={onClear}>
              Clear all
            </DSButton>
          )}
        </div>
      )}

      {/* Additional actions */}
      {actions && !activeCount && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export { FilterBar };
