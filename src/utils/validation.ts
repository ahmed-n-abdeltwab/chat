import { ValidationSchema, Message } from '../types';
import { ValidationError } from '../errors';

/**
 * Validates a message object.
 * @param message - The message to validate.
 * @returns The validated message.
 * @throws {ValidationError} If the message is invalid.
 */
export function validateMessage(message: Message): Message {
  if (!message.text || typeof message.text !== 'string') {
    throw new ValidationError('Invalid message text');
  }
  return message;
}

/**
 * Validates data against a schema.
 * @param schema - The validation schema.
 * @param data - The data to validate.
 * @param path - The path to the data (used for error messages).
 * @throws {ValidationError} If the data is invalid.
 */
export function validate<T>(
  schema: ValidationSchema,
  data: T, // Use generic type T for data
  path = ''
): void {
  if (schema.required && (data === undefined || data === null)) {
    throw new Error(`${path || 'Value'} is required`);
  }

  if (data === undefined || data === null) {
    return;
  }

  switch (schema.type) {
    case 'string':
      validateString(schema, data as unknown as string, path);
      break;
    case 'number':
      validateNumber(schema, data as unknown as number, path);
      break;
    case 'object':
      validateObject(schema, data as unknown as Record<string, unknown>, path);
      break;
    case 'array':
      validateArray(schema, data as unknown as unknown[], path);
      break;
    default:
      throw new Error(`Unsupported type: ${schema.type}`);
  }
}

function validateString(
  schema: ValidationSchema,
  value: string, // Explicitly type value as string
  path: string
): void {
  if (typeof value !== 'string') {
    throw new Error(`${path || 'Value'} must be a string`);
  }

  if (schema.minLength !== undefined && value.length < schema.minLength) {
    throw new Error(
      `${path || 'Value'} must be at least ${schema.minLength} characters long`
    );
  }

  if (schema.maxLength !== undefined && value.length > schema.maxLength) {
    throw new Error(
      `${path || 'Value'} must be at most ${schema.maxLength} characters long`
    );
  }

  if (schema.pattern && !schema.pattern.test(value)) {
    throw new Error(`${path || 'Value'} must match pattern ${schema.pattern}`);
  }
}

function validateNumber(
  schema: ValidationSchema,
  value: number, // Explicitly type value as number
  path: string
): void {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`${path || 'Value'} must be a number`);
  }

  if (schema.min !== undefined && value < schema.min) {
    throw new Error(`${path || 'Value'} must be at least ${schema.min}`);
  }

  if (schema.max !== undefined && value > schema.max) {
    throw new Error(`${path || 'Value'} must be at most ${schema.max}`);
  }
}

function validateObject(
  schema: ValidationSchema,
  value: Record<string, unknown>, // Explicitly type value as Record<string, unknown>
  path: string
): void {
  if (typeof value !== 'object' || Array.isArray(value) || value === null) {
    throw new Error(`${path || 'Value'} must be an object`);
  }

  if (schema.properties) {
    Object.entries(schema.properties).forEach(([key, propSchema]) => {
      const newPath = path ? `${path}.${key}` : key;
      validate(propSchema, value[key], newPath);
    });
  }
}

function validateArray(
  schema: ValidationSchema,
  value: unknown[], // Explicitly type value as unknown[]
  path: string
): void {
  if (!Array.isArray(value)) {
    throw new Error(`${path || 'Value'} must be an array`);
  }

  if (schema.items) {
    value.forEach((item, index) => {
      validate(schema.items!, item, `${path}[${index}]`);
    });
  }
}
