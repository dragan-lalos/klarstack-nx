import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Checkbox component (simplified version)
 * For production, consider using @radix-ui/react-checkbox
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={checkboxId}
        data-slot="checkbox"
        className={cn(
          'h-4 w-4 rounded border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
}

export { Checkbox };
