import Logger from '../../logger';

/**
 * Sets up process handlers for handling unhandled promise rejections,
 * uncaught exceptions, and SIGTERM signals.
 *
 * This function performs the following steps:
 * 1. Listens for unhandled promise rejections and logs the error before exiting the process.
 * 2. Listens for uncaught exceptions and logs the error before exiting the process.
 * 3. Listens for SIGTERM signals (e.g., from `kill` command or Docker stop) and logs a message before exiting the process.
 *
 * @example
 * ```typescript
 * setupProcessHandlers();
 * ```
 */
export function setupProcessHandlers(): void {
  process.on('unhandledRejection', (error: Error) => {
    Logger.error('Unhandled Promise Rejection:', error);
    process.exit(1);
  });

  process.on('uncaughtException', (error: Error) => {
    Logger.error('Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('SIGTERM', () => {
    Logger.info('Received SIGTERM, shutting down gracefully');
    process.exit(0);
  });
}
