export interface ValidationSchema {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  properties?: Record<string, ValidationSchema>;
  items?: ValidationSchema;
}

export interface ValidationError {
  path: string;
  message: string;
  value?: unknown;
}
