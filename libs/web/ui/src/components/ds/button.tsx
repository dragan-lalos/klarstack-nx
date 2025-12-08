import * as React from 'react';

import { Button, buttonVariants, type ButtonProps } from '../ui/button';

/**
 * DSButton - Design System Button Wrapper
 *
 * Thin wrapper around shadcn Button that enforces:
 * - Consistent variants (default, secondary, outline, ghost, destructive, link)
 * - Consistent sizes (sm, md/default, lg)
 * - Default focus ring behavior
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export interface DSButtonProps extends Omit<ButtonProps, 'size'> {
  /**
   * Button size: sm | default | lg | icon (square button for icons only)
   */
  size?: 'sm' | 'default' | 'lg' | 'icon';

  /**
   * Button variant
   */
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
}

function DSButton({ size = 'default', variant = 'default', ...props }: DSButtonProps) {
  return <Button size={size} variant={variant} {...props} />;
}

export { DSButton, buttonVariants };
export type { ButtonProps as DSButtonBaseProps };
