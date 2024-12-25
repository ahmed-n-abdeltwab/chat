import Loki from 'lokijs';
import { dbConfig } from '../config';
import { DatabaseCollections, initializeCollections } from './collections';
import Logger from '../logger';

/**
 * Initializes the database and collections.
 *
 * @returns The initialized database and collections.
 * @throws {Error} If the database initialization fails.
 */
export function initializeDatabase(): {
  db: Loki;
  collections: DatabaseCollections;
} {
  try {
    const db = new Loki(dbConfig.filename, dbConfig.options);
    const collections = initializeCollections(db);
    Logger.info('Database initialized successfully');
    return { db, collections };
  } catch (error) {
    Logger.error('Failed to initialize database:', error as Error);
    throw new Error('Database initialization failed');
  }
}
