/**
 * Auth API
 * Authentication endpoints
 */

import { httpClient } from './http-client';

/**
 * Login request payload
 */
export type LoginRequest = {
  email: string;
  password: string;
};

/**
 * Login response payload
 */
export type LoginResponse = {
  access_token: string;
};

/**
 * Login with email and password
 * @param req - Login credentials
 * @returns Login response with access token
 * @throws ApiError if login fails
 */
export async function login(req: LoginRequest): Promise<LoginResponse> {
  const response = await httpClient.post<LoginResponse>('/api/auth/login', req);
  return response.data;
}
