import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Switch component (simplified HTML version)
 * For production, consider using @radix-ui/react-switch
 */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

function Switch({ className, label, id, ...props }: SwitchProps) {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        role="switch"
        id={switchId}
        data-slot="switch"
        className={cn(
          'h-6 w-11 appearance-none rounded-full bg-input transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary',
          className,
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={switchId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { Switch };
