import Logger from '../logger';
import { Request, Response, NextFunction } from 'express';

type AsyncFunction<T> = () => Promise<T>;
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Executes an asynchronous operation with error handling.
 *
 * @param operation - The asynchronous operation to execute.
 * @param errorMessage - The error message to log if the operation fails.
 * @returns The result of the asynchronous operation.
 * @throws The error if the operation fails.
 */
export async function withErrorHandler<T>(
  operation: AsyncFunction<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    Logger.error(errorMessage, error as Error);
    throw error;
  }
}

export function asyncRouteHandler(handler: AsyncRequestHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
