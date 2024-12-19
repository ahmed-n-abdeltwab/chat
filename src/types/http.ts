import { Response } from 'express';

export interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  data?: unknown;
}

export interface ErrorResponse extends ApiResponse {
  status: 'error';
  message: string;
  code?: string;
}

export type ApiHandler<T> = (res: Response) => Promise<T>;
