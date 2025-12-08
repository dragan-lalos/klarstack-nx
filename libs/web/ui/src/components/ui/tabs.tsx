import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

/**
 * Tabs component (simplified HTML version)
 * For production, consider using @radix-ui/react-tabs
 */
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Tabs = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}: TabsProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeTab = controlledValue ?? internalValue;

  const setActiveTab = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};
Tabs.displayName = 'Tabs';

const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'inline-flex h-auto min-h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground flex-wrap gap-1',
        className,
      )}
      {...props}
    />
  );
};
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = ({ value, className, ...props }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2.5 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50',
        className,
      )}
      {...props}
    />
  );
};
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = ({ value, className, children, ...props }: TabsContentProps) => {
  const { activeTab } = useTabs();

  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
