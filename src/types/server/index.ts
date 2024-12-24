import { Server as HttpServer } from 'node:http';
import { Server as WebSocketServer } from 'ws';

/**
 * Represents an instance of the server, including both HTTP and WebSocket servers.
 */
export interface ServerInstance {
  /**
   * The HTTP server instance.
   */
  httpServer: HttpServer;

  /**
   * The WebSocket server instance.
   */
  wsServer: WebSocketServer;
}

/**
 * Represents the server configuration.
 */
export interface ServerConfig {
  port: number;
  env: string;
  cors: {
    origin: string;
    methods: string[];
  };
}
