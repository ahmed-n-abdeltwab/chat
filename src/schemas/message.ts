import { ValidationSchema } from '../types';

export const messageSchema: ValidationSchema = {
  type: 'object',
  required: true,
  properties: {
    username: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 50,
    },
    text: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 1000,
    },
  },
};
