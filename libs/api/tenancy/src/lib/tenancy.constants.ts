export const WORKSPACE_HEADER_NAME = 'x-workspace-id' as const;

export const TenancyErrorCodes = {
  WORKSPACE_HEADER_REQUIRED: 'WORKSPACE_HEADER_REQUIRED',
  WORKSPACE_FORBIDDEN: 'WORKSPACE_FORBIDDEN',
} as const;

export type TenancyErrorCode = (typeof TenancyErrorCodes)[keyof typeof TenancyErrorCodes];
