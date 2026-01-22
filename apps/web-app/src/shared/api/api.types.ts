export interface ApiUser {
  id: string;
  email: string;
  displayName?: string | null;
  timezone?: string | null;
  emailNotifications?: boolean;
}

export interface ApiWorkspace {
  id: string;
  name: string;
  slug?: string | null;
}

export interface ApiMembership {
  id: string;
  role: string;
  workspaceId: string;
  workspace?: ApiWorkspace | null;
  workspaceName?: string | null;
}

export interface ApiMeResponse {
  user: ApiUser;
  memberships: ApiMembership[];
}

export interface ApiErrorPayload {
  message?: string;
  error?: string;
}

/**
 * Typed API error wrapper with status.
 */
export class ApiError extends Error {
  status: number;
  payload?: ApiErrorPayload;

  constructor(status: number, message: string, payload?: ApiErrorPayload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

/**
 * Narrow unknown errors to ApiError.
 */
export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
