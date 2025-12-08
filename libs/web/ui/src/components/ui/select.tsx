import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Select component (native HTML select)
 * For production, consider using @radix-ui/react-select for better UX
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: Array<{ value: string; label: string }>;
}

function Select({ className, label, options = [], id, children, ...props }: SelectProps) {
  const generatedId = React.useId();
  const selectId = id || generatedId;

  return (
    <div className="flex flex-col space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        data-slot="select"
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        {children ||
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export { Select };
