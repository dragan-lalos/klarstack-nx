import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

import { Textarea, type TextareaProps } from '../ui/textarea';

/**
 * DSTextarea - Design System Textarea Wrapper
 *
 * Thin wrapper around shadcn Textarea that enforces:
 * - Consistent padding and focus ring
 * - Error state styling
 *
 * POLICY: Keep under 60 lines. No business logic.
 */

export interface DSTextareaProps extends TextareaProps {
  /**
   * Error state (adds error styling)
   */
  error?: boolean;

  /**
   * Helper text to display below textarea
   */
  helperText?: string;
}

function DSTextarea({ error, helperText, className, ...props }: DSTextareaProps) {
  return (
    <div className="w-full">
      <Textarea
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

export { DSTextarea };
export type { TextareaProps as DSTextareaBaseProps };
