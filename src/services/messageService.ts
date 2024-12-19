import { Message } from '../types/message';
import { MessageDb } from '../database/messageDb';

/**
 * Service class for handling message-related operations.
 */
export class MessageService {
  /**
   * Creates an instance of MessageService.
   * @param db - The database instance for message operations.
   */
  constructor(private db: MessageDb) {}

  /**
   * Saves a message to the database.
   * @param message - The message to be saved.
   * @returns A promise that resolves to the saved message.
   * @throws An error if the message could not be saved.
   */
  public async saveMessage(message: Message): Promise<Message> {
    // Implementation here
    try {
      return await this.db.saveMessage(message);
    } catch (error) {
      console.error('Error saving message:', error);
      throw new Error('Failed to save message');
    }
  }

  /**
   * Retrieves all messages from the database.
   * @returns A promise that resolves to an array of messages.
   * @throws An error if the messages could not be fetched.
   */
  public async getMessages(): Promise<Message[]> {
    // Implementation here
    try {
      return await this.db.getMessages();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  }
}
