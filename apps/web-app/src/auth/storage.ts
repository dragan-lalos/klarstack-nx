/**
 * Auth Storage
 * Handles persistence of authentication state in localStorage
 */

import type { AuthUser } from './types';

const SESSION_KEY = 'web.session.user';

/**
 * Retrieve the current session from localStorage
 * @returns AuthUser if session exists, null otherwise
 */
export function getSession(): AuthUser | null {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    // Basic validation
    if (parsed && typeof parsed.email === 'string') {
      return parsed as AuthUser;
    }
    return null;
  } catch (error) {
    console.error('Failed to parse session from localStorage:', error);
    return null;
  }
}

/**
 * Store a user session in localStorage
 * @param user - The authenticated user to store
 */
export function setSession(user: AuthUser): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to store session in localStorage:', error);
  }
}

/**
 * Clear the current session from localStorage
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session from localStorage:', error);
  }
}
