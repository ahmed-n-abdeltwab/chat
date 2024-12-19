import http from 'http';
import { createApp } from './config/app';
import { setupWebSocket } from './config/websocket';
import { setupProcessHandlers } from './utils/processHandlers';
import { serverConfig } from './config/server';
import Logger from './utils/logger';

class Server {
  private server: http.Server;

  constructor() {
    const app = createApp();
    this.server = http.createServer(app);
  }

  private setupWebSocket(): void {
    setupWebSocket(this.server);
  }

  private listen(): void {
    this.server.listen(serverConfig.port, () => {
      Logger.info(`Server is running on port ${serverConfig.port}`);
      Logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  }

  public async start(): Promise<void> {
    try {
      // Setup error handlers
      setupProcessHandlers();

      // Setup WebSocket
      this.setupWebSocket();

      // Start listening
      this.listen();
    } catch (error) {
      Logger.error('Failed to start server:', error as Error);
      process.exit(1);
    }
  }
}

// Start the server
const server = new Server();
server.start().catch(error => {
  Logger.error('Fatal error during server startup:', error);
  process.exit(1);
});
