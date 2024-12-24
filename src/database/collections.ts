import { Collection } from 'lokijs';
import { Message } from '../types/database';

/**
 * Interface representing the database collections.
 */
export interface DatabaseCollections {
  messages: Collection<Message>;
}

/**
 * Initializes the database collections.
 *
 * @param db - The Loki database instance.
 * @returns The initialized database collections.
 */
export function initializeCollections(db: Loki): DatabaseCollections {
  const messages =
    db.getCollection<Message>('messages') ||
    db.addCollection<Message>('messages', {
      indices: ['timestamp'],
    });

  return { messages };
}
