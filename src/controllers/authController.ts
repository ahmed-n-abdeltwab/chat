import { Request, Response } from 'express';
import { AuthService } from '../services';
import { asyncRouteHandler } from '../utils';

export class AuthController {
  constructor(private authService: AuthService) {}

  public login = asyncRouteHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.authService.login({ email, password });
    res.json(response);
  });

  public register = asyncRouteHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await this.authService.register({ email, password });
    res.json(response);
  });
}
