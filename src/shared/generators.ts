import { randomBytes } from 'crypto';

/**
 * Genera un Client ID único con prefijo
 * Ejemplo: cli_a1b2c3d4e5f6...
 */
export function generateClientId(): string {
  const rb = randomBytes(24).toString('hex');
  return `cli_${rb}`;
}

/**
 * Genera un Secret Key único con prefijo
 * Ejemplo: sk_live_a1b2c3d4e5f6...
 */
export function generateSecretKey(): string {
  const rb = randomBytes(32).toString('hex');
  return `sk_live_${rb}`;
}
