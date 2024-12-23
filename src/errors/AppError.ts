import { ErrorCode, ErrorDetails } from '../types/error';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: ErrorCode,
    public details?: ErrorDetails
  ) {
    super(message);

    // Fix prototype chain
    Object.setPrototypeOf(this, AppError.prototype);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
