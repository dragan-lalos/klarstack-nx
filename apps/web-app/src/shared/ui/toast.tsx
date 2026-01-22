import { cn } from '@klastack-nx/shared/tailwind';
import * as React from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastItem extends ToastProps {
  id: string;
}

interface ToastContextValue {
  toast: (props: ToastProps) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/**
 * Toast container that renders transient toasts.
 */
export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = React.useCallback(
    (props: ToastProps) => {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      setToasts((current) => [...current, { id, ...props }]);
      window.setTimeout(() => removeToast(id), 3_000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={cn(
              'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border bg-background shadow-lg',
              item.variant === 'destructive' &&
                'border-destructive bg-destructive text-destructive-foreground',
            )}
          >
            <div className="p-4">
              {item.title && <div className="font-semibold">{item.title}</div>}
              {item.description && (
                <div className="mt-1 text-sm opacity-90">{item.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/**
 * Hook to trigger toasts.
 */
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
