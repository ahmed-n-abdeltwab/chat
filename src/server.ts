import { createServer } from './config/server';
import { setupProcessHandlers } from './utils/server/processHandlers';
import Logger from './utils/logger';

async function startServer(): Promise<void> {
  try {
    setupProcessHandlers();
    await createServer();
    Logger.info(`Server started successfully`);
  } catch (error) {
    Logger.error('Fatal error during server startup:', error as Error);
    process.exit(1);
  }
}

// Start the server
startServer().catch(error => {
  Logger.error('Unexpected error:', error);
  process.exit(1);
});
