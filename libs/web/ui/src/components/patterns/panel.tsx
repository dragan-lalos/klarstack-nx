import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { DSCard, DSCardHeader, DSCardTitle, DSCardContent } from '../ds/card';

/**
 * Panel - Generic titled panel wrapper
 *
 * Provides consistent container for grouped content
 */

export interface PanelProps {
  /**
   * Panel title
   */
  title?: string;

  /**
   * Panel content
   */
  children: React.ReactNode;

  /**
   * Optional header actions
   */
  headerActions?: React.ReactNode;

  className?: string;
}

export const Panel = ({ title, children, headerActions, className }: PanelProps) => {
  return (
    <DSCard className={cn('', className)}>
      {(title || headerActions) && (
        <DSCardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          {title && <DSCardTitle className="text-lg">{title}</DSCardTitle>}
          {headerActions && <div>{headerActions}</div>}
        </DSCardHeader>
      )}
      <DSCardContent>{children}</DSCardContent>
    </DSCard>
  );
};
