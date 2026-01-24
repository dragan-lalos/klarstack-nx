import * as React from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './providers';
import { router } from './router';
import { ErrorBoundary } from '../shared/error-boundary';

/**
 * App entry component used by the Vite root.
 */
export const AppMain = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
};
