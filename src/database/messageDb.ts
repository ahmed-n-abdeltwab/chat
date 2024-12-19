import Datastore from 'nedb';
import { dbConfig } from '../config/database';
import { Message } from '../types/message';
import { DatabaseError } from '../utils/errors';
import Logger from '../utils/logger';

export class MessageDb {
  private db: Datastore;

  constructor() {
    this.db = new Datastore(dbConfig);
    this.setupIndexes();
  }

  private setupIndexes(): void {
    this.db.ensureIndex({ fieldName: 'timestamp' });
    Logger.info('Database indexes setup completed');
  }

  public async saveMessage(message: Message): Promise<Message> {
    try {
      const messageWithTimestamp: Message = {
        ...message,
        timestamp: new Date(),
      };

      return await new Promise((resolve, reject) => {
        this.db.insert(
          messageWithTimestamp,
          (err: Error | null, doc: Message) => {
            if (err) reject(new DatabaseError('Failed to save message'));
            else resolve(doc);
          }
        );
      });
    } catch (error) {
      Logger.error('Database error while saving message:', error as Error);
      throw error;
    }
  }

  public async getMessages(): Promise<Message[]> {
    try {
      return await new Promise((resolve, reject) => {
        this.db
          .find({})
          .sort({ timestamp: 1 })
          .exec((err: Error | null, docs: Message[]) => {
            if (err) reject(new DatabaseError('Failed to fetch messages'));
            else resolve(docs);
          });
      });
    } catch (error) {
      Logger.error('Database error while fetching messages:', error as Error);
      throw error;
    }
  }
}
