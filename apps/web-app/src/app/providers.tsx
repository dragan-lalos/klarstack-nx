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
 * Global app providers (query client, toast).
 */
export const AppProviders = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = React.useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
};
