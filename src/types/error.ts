export interface ErrorResponse {
  status: 'error';
  code: string;
  message: string;
  details?: ErrorDetails;
}

/**
 * Represents additional error details.
 */
export interface ErrorDetails {
  [key: string]: string | number | boolean | ErrorDetails;
}

/**
 * Represents the error code.
 */
export type ErrorCode =
  | 'DATABASE_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN';
