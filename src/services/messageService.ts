import { Message } from '../types/message';
import { MessageDb } from '../database/messageDb';

export class MessageService {
  constructor(private db: MessageDb) {}

  public async saveMessage(message: Message): Promise<Message> {
    try {
      return await this.db.saveMessage(message);
    } catch (error) {
      console.error('Error saving message:', error);
      throw new Error('Failed to save message');
    }
  }

  public async getMessages(): Promise<Message[]> {
    try {
      return await this.db.getMessages();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }
}
