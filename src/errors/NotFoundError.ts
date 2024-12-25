import { AppError } from './AppError';
import { ErrorDetails } from '../types';

/**
 * Error class for not found errors.
 */
export class NotFoundError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 404, 'NOT_FOUND', details);
  }
}
