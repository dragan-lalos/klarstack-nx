/**
 * Auth Logic
 * Core authentication functions (login, logout)
 */

import type { AuthUser } from './types';

// Demo credentials for MVP
const DEMO_EMAIL = 'dlalos@matluk.dev';
const DEMO_PASSWORD = '1234';

/**
 * Attempt to login with email and password
 * @param email - User email
 * @param password - User password
 * @returns AuthUser if credentials are valid, null otherwise
 */
export function login(email: string, password: string): AuthUser | null {
  // Simple hardcoded validation for MVP
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return { email };
  }
  return null;
}

/**
 * Logout is handled by clearing session storage
 * This function exists for symmetry and future extension
 */
export function logout(): void {
  // In a real app, this might call an API endpoint
  // For MVP, session clearing is handled by AuthContext
}
