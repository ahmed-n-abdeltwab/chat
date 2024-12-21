import Logger from './logger';

type AsyncFunction<T> = () => Promise<T>;

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

// For Express route handlers
export function asyncRouteHandler<T>(
  operation: AsyncFunction<T>
): AsyncFunction<T> {
  return async () => withErrorHandler(operation, 'Route handler error');
}
