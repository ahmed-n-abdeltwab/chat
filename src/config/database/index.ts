import { DbConfig } from '../../types/database';

/**
 * Configuration for the database.
 */
export const dbConfig: DbConfig = {
  filename: 'data/chat.db', // Store the database in the 'data' directory
  options: {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000,
    persistenceMethod: 'fs',
  },
};
