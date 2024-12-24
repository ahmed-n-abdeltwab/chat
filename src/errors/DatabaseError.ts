import { AppError } from './AppError';
import { ErrorDetails } from '../types';

/**
 * Error class for database-related errors.
 */
export class DatabaseError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 500, 'DATABASE_ERROR', details);
  }
}
