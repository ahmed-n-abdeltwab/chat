export interface ErrorResponse {
  status: 'error';
  code: string;
  message: string;
  details?: ErrorDetails;
}

export interface ErrorDetails {
  path?: string;
  value?: unknown;
  reason?: string;
}

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'DATABASE_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'BAD_REQUEST'
  | 'INTERNAL_ERROR';
