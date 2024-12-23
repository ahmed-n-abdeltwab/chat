import { AppError } from './AppError';
import { ErrorDetails } from '../types/error';
export class DatabaseError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 500, 'DATABASE_ERROR', details);
  }
}
export class ValidationError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, details?: ErrorDetails) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access', details?: ErrorDetails) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden', details?: ErrorDetails) {
    super(message, 403, 'FORBIDDEN', details);
  }
}
