import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ErrorResponse } from '../types/http';
import Logger from '../utils/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
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
