/**
 * Auth Context
 * Provides authentication state and actions throughout the app
 */

import {
  getToken as getStoredToken,
  setToken as setStoredToken,
  clearToken as clearStoredToken,
  setUnauthorizedHandler,
} from '@klastack-nx/api/client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import type { AuthUser } from './types';

interface AuthContextValue {
  /** Currently authenticated user, or null if not authenticated */
  user: AuthUser | null;
  /** JWT token */
  token: string | null;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Whether initial auth check is loading */
  isLoading: boolean;
  /**
   * Set token and mark user as authenticated
   * @param token - JWT access token
   */
  setToken: (token: string) => void;
  /** Logout and clear token */
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider Component
 * Wraps the app to provide authentication context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [{ token, user }, setAuthState] = useState<{
    token: string | null;
    user: AuthUser | null;
  }>(() => {
    const storedToken = getStoredToken();
    return storedToken
      ? { token: storedToken, user: { email: 'authenticated@user' } } // TODO: decode JWT if needed
      : { token: null, user: null };
  });

  // Token restore is synchronous; keep the API but avoid a "setState in effect" anti-pattern.
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  // Set up 401 handler to clear auth state
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setAuthState({ token: null, user: null });
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  const setToken = useCallback((newToken: string) => {
    setAuthState({ token: newToken, user: { email: 'authenticated@user' } }); // TODO: decode JWT if needed
    setStoredToken(newToken);
  }, []);

  const clearToken = useCallback(() => {
    setAuthState({ token: null, user: null });
    clearStoredToken();
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    setToken,
    clearToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * Access authentication state and actions
 * Must be used within AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
