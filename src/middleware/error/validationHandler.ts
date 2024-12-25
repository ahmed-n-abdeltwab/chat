import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../../errors';
import { validate } from '../../utils/validation';
import { ValidationSchema } from '../../types';

export function validationHandler(schema: ValidationSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      validate(schema, req.body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(new ValidationError(error.message));
      } else {
        next(new Error('Unknown validation error'));
      }
    }
  };
}
