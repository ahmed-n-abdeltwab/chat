import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

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