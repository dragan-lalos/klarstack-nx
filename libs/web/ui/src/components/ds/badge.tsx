import * as React from 'react';

import { Badge, badgeVariants, type BadgeProps } from '../ui/badge';

/**
 * DSBadge - Design System Badge Wrapper
 *
 * Thin wrapper around shadcn Badge that enforces:
 * - Consistent variants (default, secondary, outline, destructive)
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export interface DSBadgeProps extends BadgeProps {
  /**
   * Badge variant
   */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

const DSBadge = ({ variant = 'default', ...props }: DSBadgeProps) => {
  return <Badge variant={variant} {...props} />;
};
DSBadge.displayName = 'DSBadge';

export { DSBadge, badgeVariants };
export type { BadgeProps as DSBadgeBaseProps };
