import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../errors';
import { ErrorResponse } from '../../types';
import Logger from '../../logger';

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  Logger.error('Error caught by error handler:', error);

  let statusCode = 500;
  const response: ErrorResponse = {
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: 'Internal Server Error',
  };
  // Check if error is an instance of AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    response.code = error.code;
    response.message = error.message;
    if (error.details) {
      response.details = error.details;
    }
  }

  // Send response with appropriate status code
  res.status(statusCode).json(response);
}
