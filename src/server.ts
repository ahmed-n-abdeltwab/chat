import http from 'http';
import { createApp } from './config/app';
import { setupWebSocket } from './config/websocket';
import { setupProcessHandlers } from './utils/processHandlers';
import { serverConfig } from './config/server';
import Logger from './utils/logger';

/**
 * Represents the server for the chat application.
 */
class Server {
  /**
   * The HTTP server instance.
   */
  private server: http.Server;

  /**
   * Initializes a new instance of the Server class.
   * Creates an Express application and HTTP server.
   */
  constructor() {
    const app = createApp();
    this.server = http.createServer(app);
    setupProcessHandlers();
  }

  /**
   * Sets up the WebSocket server.
   * This method is used internally to initialize WebSocket connections.
   */
  private setupWebSocket(): void {
    setupWebSocket(this.server);
  }

  /**
   * Starts the HTTP server and begins listening on the configured port.
   * Logs the server status and environment.
   */
  private listen(): void {
    const { port } = serverConfig;
    this.server.listen(port, () => {
      Logger.info(
        `Server is running on port ${port} in ${process.env.NODE_ENV} mode`
      );
    });
  }

  /**
   * Starts the server.
   * Sets up error handlers, initializes WebSocket, and starts listening on the configured port.
   * If an error occurs during startup, logs the error and exits the process.
   *
   * @returns {Promise<void>} A promise that resolves when the server has started.
   */
  public async start(): Promise<void> {
    try {
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
