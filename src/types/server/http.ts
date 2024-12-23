import { Response } from 'express';
import { ErrorDetails } from '../error';

/**
 * Represents the structure of an API response.
 *
 * @interface ApiResponse
 *
 * @property {'success' | 'error'} status - Indicates whether the API request was successful or encountered an error.
 * @property {string} [message] - An optional message providing additional information about the response.
 * @property {unknown} [data] - Optional data returned by the API, the type of which can vary.
 */
export interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  data?: unknown;
}

export interface ErrorResponse extends ApiResponse {
  status: 'error';
  message: string;
  code?: string;
  details?: ErrorDetails;
}

export type ApiHandler<T> = (res: Response) => Promise<T>;
