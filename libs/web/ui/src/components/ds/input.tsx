import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { Input, type InputProps } from '../ui/input';

/**
 * DSInput - Design System Input Wrapper
 *
 * Thin wrapper around shadcn Input that enforces:
 * - Consistent height and padding
 * - Default focus ring behavior
 * - Error state styling
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export interface DSInputProps extends InputProps {
  /**
   * Error state (adds error styling)
   */
  error?: boolean;

  /**
   * Helper text to display below input
   */
  helperText?: string;
}

function DSInput({ error, helperText, className, ...props }: DSInputProps) {
  return (
    <div className="w-full">
      <Input
        className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
        {...props}
      />
      {helperText && (
        <p className={cn('mt-1 text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export { DSInput };
export type { InputProps as DSInputBaseProps };
