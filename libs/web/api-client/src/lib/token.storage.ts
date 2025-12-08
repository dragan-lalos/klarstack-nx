/**
 * Token Storage
 * Handles JWT token persistence in localStorage
 */

const TOKEN_KEY = 'auth.token';

/**
 * Retrieve the authentication token from localStorage
 * @returns token string if exists, null otherwise
 */
export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get token from localStorage:', error);
    return null;
  }
}

/**
 * Store the authentication token in localStorage
 * @param token - JWT token to store
 */
export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to set token in localStorage:', error);
  }
}

/**
 * Clear the authentication token from localStorage
 */
export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear token from localStorage:', error);
  }
}
