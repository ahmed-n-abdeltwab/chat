import Logger from './logger';

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
    Logger.info('SIGTERM received. Performing graceful shutdown...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    Logger.info('SIGINT received. Performing graceful shutdown...');
    process.exit(0);
  });
}
