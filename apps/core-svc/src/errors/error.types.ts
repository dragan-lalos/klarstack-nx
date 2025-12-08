export const ErrorTypes = {
  AUTH_INVALID_CREDENTIALS: 'auth.invalidCredentials',
  AUTH_UNAUTHORIZED: 'auth.unauthorized',
  AUTH_FORBIDDEN: 'auth.forbidden',
  USER_BLOCKED: 'user.userBlocked',
  INCIDENT_NOT_FOUND: 'incident.notFound',
  INTERNAL_UNEXPECTED: 'internal.unexpected',
  REQUEST_BAD: 'request.badRequest',
  REQUEST_UNAUTHORIZED: 'request.unauthorized',
  REQUEST_FORBIDDEN: 'request.forbidden',
  REQUEST_NOT_FOUND: 'request.notFound',
} as const;

export type NamespacedErrorType =
  | `${string}.badRequest`
  | `${string}.unauthorized`
  | `${string}.forbidden`
  | `${string}.notFound`
  | `${string}.error`;

export type ErrorType = (typeof ErrorTypes)[keyof typeof ErrorTypes] | NamespacedErrorType;
