import { AppError } from './AppError';
import { ErrorDetails } from '../types';

/**
 * Error class for forbidden access errors.
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden', details?: ErrorDetails) {
    super(message, 403, 'FORBIDDEN', details);
  }
}
