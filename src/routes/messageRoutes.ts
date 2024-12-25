import { Router } from 'express';
import { MessageController } from '../controllers';
import { MessageService } from '../services';
/**
 * Creates routes for message-related operations.
 *
 * @param messageService - The message service instance.
 * @returns The configured router instance.
 */
export function createMessageRoutes(messageService: MessageService): Router {
  const router = Router();
  const controller = new MessageController(messageService);

  router.route('/').get(controller.getMessages).post(controller.createMessage);

  return router;
}
