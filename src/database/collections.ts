import { Collection } from 'lokijs';
import { Message } from '../types/database';

export interface DatabaseCollections {
  messages: Collection<Message>;
}

export function initializeCollections(db: Loki): DatabaseCollections {
  const messages =
    db.getCollection<Message>('messages') ||
    db.addCollection<Message>('messages', {
      indices: ['timestamp'],
    });

  return { messages };
}
