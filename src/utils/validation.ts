import { Message } from '../types/database';

export function validateMessage(message: unknown): Message {
  if (!message || typeof message !== 'object') {
    throw new Error('Message object is required');
  }

  const msg = message as Partial<Message>;

  if (!msg.username || typeof msg.username !== 'string') {
    throw new Error('Username is required and must be a string');
  }

  if (!msg.text || typeof msg.text !== 'string') {
    throw new Error('Message text is required and must be a string');
  }

  return {
    username: msg.username.trim(),
    text: msg.text.trim(),
  };
}
