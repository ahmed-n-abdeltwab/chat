import jwt from 'jsonwebtoken';
import { UserDb } from '../database';
import { LoginCredentials, AuthResponse } from '../types';
import { UnauthorizedError } from '../errors';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
  constructor(private userDb: UserDb) {}

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const user = await this.userDb.validateCredentials(credentials);
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '24h',
      });
      return { token, user };
    } catch {
      throw new UnauthorizedError('Invalid credentials');
    }
  }

  async register(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await this.userDb.createUser(
      credentials.email,
      credentials.password
    );
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '24h',
    });
    return { token, user };
  }
}
