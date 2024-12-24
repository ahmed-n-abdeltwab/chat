/**
 * Safely parses a JSON string.
 * @param jsonString - The JSON string to parse.
 * @returns The parsed object.
 * @throws {Error} If the JSON string is invalid.
 */
export function safeJsonParse<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    throw new Error('Invalid JSON string');
  }
}
