import { configureHttpClient } from '@klastack-nx/api/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Import global styles (includes theme tokens and Tailwind)
import '@klastack-nx/shared/tailwind/global.css';

import App from './app/app';
import { AuthProvider } from './auth';

// Configure the API client with the base URL from environment variables
configureHttpClient(import.meta.env.VITE_API_URL ?? '');

const queryClient = new QueryClient({
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
