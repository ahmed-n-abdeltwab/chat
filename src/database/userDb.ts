import { Collection } from 'lokijs';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { User, LoginCredentials } from '../types';
import { DatabaseError } from '../errors';
import Logger from '../logger';

export class UserDb {
  private collection: Collection<User>;

  constructor(collection: Collection<User>) {
    this.collection = collection;
  }

  async createUser(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = this.collection.findOne({ email });
      if (existingUser) {
        throw new DatabaseError('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.collection.insert({
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      Logger.error('Failed to create user:', error as Error);
      throw error;
    }
  }

  async validateCredentials(
    credentials: LoginCredentials
  ): Promise<Omit<User, 'password'>> {
    const user = this.collection.findOne({ email: credentials.email });
    if (!user) {
      throw new DatabaseError('Invalid credentials');
    }

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new DatabaseError('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
