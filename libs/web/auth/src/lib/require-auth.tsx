/**
 * RequireAuth Component
 * Route guard that protects routes requiring authentication
 */

import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Props for RequireAuth component
 */
interface RequireAuthProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

/**
 * RequireAuth component
 * Redirects to login if user is not authenticated
 */
export function RequireAuth({
  children,
  isAuthenticated,
  redirectTo = '/login',
}: RequireAuthProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
