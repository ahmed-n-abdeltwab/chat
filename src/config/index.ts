import { ServerConfig } from '../types/server';

// Load environment variables
import './dotenv';

export * from './database';
export * from './server';
export * from './websocket';

/**
 * Configuration for the server.
 */
export const serverConfig: ServerConfig = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
};
