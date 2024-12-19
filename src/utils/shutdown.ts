import { Server } from 'http';
import { Server as WebSocketServer } from 'ws';
import Logger from './logger';

export async function gracefulShutdown(
  httpServer: Server,
  wsServer: WebSocketServer
): Promise<void> {
  try {
    // Close WebSocket server first
    await new Promise<void>((resolve, reject) => {
      wsServer.close(err => {
        if (err) reject(err);
        else resolve();
      });
    });
    Logger.info('WebSocket server closed');

    // Then close HTTP server
    await new Promise<void>((resolve, reject) => {
      httpServer.close(err => {
        if (err) reject(err);
        else resolve();
      });
    });
    Logger.info('HTTP server closed');
  } catch (error) {
    Logger.error('Error during graceful shutdown:', error as Error);
    throw error;
  }
}
