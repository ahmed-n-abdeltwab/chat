import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

/**
 * Middleware function to log HTTP requests.
 *
 * Logs the HTTP method, URL, status code, and the duration of the request.
 * The duration is calculated from the time the request is received.
 */
export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.info(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });

  next();
}
