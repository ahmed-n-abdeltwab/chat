import { DbConfig } from '../types/database';

/**
 * Configuration for the database.
 */
export const dbConfig: DbConfig = {
  filename: process.env.DB_FILENAME || 'data/chat.db', // Use environment variable
  options: {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000,
    persistenceMethod: 'fs',
  },
};
