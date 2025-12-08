/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to /login if user is not authenticated
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute
 * Renders children if authenticated, otherwise redirects to login
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  // Save the attempted location so we can redirect back after login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content
  return children;
}
