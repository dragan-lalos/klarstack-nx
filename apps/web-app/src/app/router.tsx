import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppShell } from './app-shell';
import { useAuth } from '../features/auth/auth.store';
import { DevLoginPage } from '../features/auth/dev-login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { MembersPage } from '../pages/members-page';
import { SettingsPage } from '../pages/settings-page';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <AppShell />;
};

/**
 * App routes configuration.
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <DevLoginPage />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'members',
        element: <MembersPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
