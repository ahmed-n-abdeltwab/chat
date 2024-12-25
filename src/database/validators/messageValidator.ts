import { Message } from '../../types/';
import { messageSchema } from '../../schemas';
import { ValidationError } from '../../errors';
import { validate } from '../../utils/validation';

/**
 * Validates a message object for the database.
 * @param message - The message to validate.
 * @returns The validated message.
 * @throws {ValidationError} If the message is invalid.
 */
export function validateMessageForDb(message: Message): Message {
  try {
    validate(messageSchema, message);
    return message;
  } catch (error) {
    throw new ValidationError(
      `Invalid message format: ${(error as Error).message}`
    );
  }
}
