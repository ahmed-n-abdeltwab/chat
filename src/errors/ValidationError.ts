import { AppError } from './AppError';
import { ErrorDetails } from '../types';

/**
 * Error class for validation-related errors.
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}
