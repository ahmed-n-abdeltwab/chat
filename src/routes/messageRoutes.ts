import { Router } from 'express';
import { MessageController } from '../controllers/messageController';
import { MessageService } from '../services/messageService';

export function createMessageRoutes(messageService: MessageService): Router {
  const router = Router();
  const controller = new MessageController(messageService);

  router.route('/').get(controller.getMessages).post(controller.createMessage);

  return router;
}
