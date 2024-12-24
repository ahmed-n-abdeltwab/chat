/**
 * Represents an error response.
 */
export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
}
