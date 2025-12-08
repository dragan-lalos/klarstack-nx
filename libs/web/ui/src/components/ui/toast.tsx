import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Toast/Sonner placeholder component
 * For production, use sonner or react-hot-toast
 */
export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const Toast = ({ title, description, variant = 'default' }: ToastProps) => {
  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border bg-background shadow-lg',
        variant === 'destructive' &&
          'border-destructive bg-destructive text-destructive-foreground',
      )}
    >
      <div className="p-4">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="mt-1 text-sm opacity-90">{description}</div>}
      </div>
    </div>
  );
};
Toast.displayName = 'Toast';

/**
 * Simple toast hook placeholder
 * Replace with actual toast library in production
 */
export const useToast = () => {
  const toast = React.useCallback((props: ToastProps) => {
    console.log('Toast:', props);
    // In production, integrate with sonner or react-hot-toast
  }, []);

  return { toast };
};

export { Toast };
