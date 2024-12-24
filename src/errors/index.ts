import { AppError } from './AppError';
import { ErrorDetails } from '../types/error';

/**
 * Error class for database-related errors.
 */
export class DatabaseError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 500, 'DATABASE_ERROR', details);
  }
}

/**
 * Error class for validation-related errors.
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

/**
 * Error class for not found errors.
 */
export class NotFoundError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

/**
 * Error class for unauthorized access errors.
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access', details?: ErrorDetails) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

/**
 * Error class for forbidden access errors.
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden', details?: ErrorDetails) {
    super(message, 403, 'FORBIDDEN', details);
  }
}
