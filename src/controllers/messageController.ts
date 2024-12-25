import { Request, Response } from 'express';
import { MessageService } from '../services';
import { asyncRouteHandler } from '../utils';

export class MessageController {
  constructor(private messageService: MessageService) {}

  public getMessages = asyncRouteHandler(
    async (_req: Request, res: Response) => {
      const messages = await this.messageService.getMessages();
      res.json({ status: 'success', data: messages });
    }
  );

  public createMessage = asyncRouteHandler(
    async (req: Request, res: Response) => {
      const message = await this.messageService.saveMessage(req.body);
      res.status(201).json({ status: 'success', data: message });
    }
  );
}
