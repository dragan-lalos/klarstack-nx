import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './providers';
import { router } from './router';

/**
 * App entry component used by the Vite root.
 */
export const AppMain = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
