import { Request, Response } from 'express';
import { AppError } from '../utils/errors';
import { ErrorResponse } from '../types/http';
import Logger from '../utils/logger';

/**
 * Error handling middleware for Express applications.
 * Logs the error and sends a JSON response with error details.
 *
 * @param err - The error object caught by the middleware.
 * @param req - The Express request object.
 * @param res - The Express response object.
 *
 * @remarks
 * If the error is an instance of `AppError`, the response will include the specific
 * error message and code, and the status code will be set accordingly.
 * Otherwise, a generic "Internal Server Error" message is sent with a 500 status code.
 *
 * @example
 * ```typescript
 * app.use(errorHandler);
 * ```
 */
export function errorHandler(err: Error, req: Request, res: Response): void {
  Logger.error('Error caught by error handler:', err);

  const response: ErrorResponse = {
    status: 'error',
    message: 'Internal Server Error',
  };

  if (err instanceof AppError) {
    response.message = err.message;
    response.code = err.code;
    res.status(err.statusCode);
  } else {
    res.status(500);
  }

  res.json(response);
}
