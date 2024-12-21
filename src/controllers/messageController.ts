import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import { asyncRouteHandler } from '../utils/asyncHandler';

export class MessageController {
  constructor(private messageService: MessageService) {}

  public getMessages = async (_req: Request, res: Response): Promise<void> => {
    const messages = await asyncRouteHandler(async () => {
      return this.messageService.getMessages();
    })();

    res.json({ status: 'success', data: messages });
  };

  public createMessage = async (req: Request, res: Response): Promise<void> => {
    const message = await asyncRouteHandler(async () => {
      return this.messageService.saveMessage(req.body);
    })();

    res.status(201).json({ status: 'success', data: message });
  };
}
