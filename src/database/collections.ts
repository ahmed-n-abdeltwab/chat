import Loki from 'lokijs';
import { Message, User } from '../types';

/**
 * Interface representing the database collections.
 */
export interface DatabaseCollections {
  messages: Collection<Message>;
  users: Collection<User>;
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

  const users =
    db.getCollection<User>('users') ||
    db.addCollection<User>('users', {
      unique: ['email'],
      indices: ['email'],
    });

  return { messages, users };
}
