import { AppError } from './AppError';
import { ErrorDetails } from '../types';

/**
 * Error class for unauthorized access errors.
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access', details?: ErrorDetails) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}
