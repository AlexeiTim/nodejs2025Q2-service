import { scryptSync } from 'crypto';

export function randomUUID(): string {
  return scryptSync('password', 'salt', 64).toString('hex');
}
