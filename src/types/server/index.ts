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
 * Configuration options for the server.
 */
export interface ServerConfig {
  /**
   * The port number on which the server will listen.
   */
  port: number;

  /**
   * The environment in which the server is running (e.g., 'development', 'production').
   */
  env: string;

  /**
   * Configuration for Cross-Origin Resource Sharing (CORS).
   */
  cors: {
    /**
     * The origin that is allowed to access the server.
     */
    origin: string;

    /**
     * The HTTP methods that are allowed for CORS.
     */
    methods: string[];
  };
}
