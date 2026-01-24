import { ThemeProvider } from '@klastack-nx/web/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

import { ToastProvider } from '../shared/ui/toast';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

/**
 * Global app providers (query client, toast, theme).
 */
export const AppProviders = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = React.useState(createQueryClient);

  return (
    <ThemeProvider
      storageKey="webapp-theme"
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
