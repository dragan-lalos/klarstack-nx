import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Simple switch component.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    return (
      <label htmlFor={switchId} className="flex items-center gap-3">
        <span className="relative inline-flex h-6 w-11 flex-shrink-0 items-center">
          <input ref={ref} id={switchId} type="checkbox" className="peer sr-only" {...props} />
          <span
            className={cn(
              'absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-primary',
              className,
            )}
          />
          <span className="absolute left-1 h-4 w-4 rounded-full bg-background transition-transform peer-checked:translate-x-5" />
        </span>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    );
  },
);
Switch.displayName = 'Switch';

export { Switch };
