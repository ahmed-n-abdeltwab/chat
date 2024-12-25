import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Middleware to check for the presence of a token.
 * If the token is not present, redirect to the login page.
 * If the token is present, verify it and proceed to the next middleware.
 */
export function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    console.log(!token);
    return res.redirect('/login.html');
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.redirect('/login.html');
  }
}
