import assert from 'assert';
import { BinaryLike, createHmac, timingSafeEqual } from 'crypto';

export function generateHMAC256Signature(payload: BinaryLike, timestamp: number | string): string {
  assert(process.env.HMAC_SIGNATURE_SECRET_KEY, `"HMAC_SIGNATURE_SECRET_KEY" has not been set. Unable to generate HMAC256 signatures.`)
  const hmac = createHmac('sha256', process.env.HMAC_SIGNATURE_SECRET_KEY);
  const timestampAsString = typeof timestamp === 'number' ? String(timestamp) : timestamp;
  return hmac.update(payload).update(timestampAsString).digest('hex');
}

export function verifyHMAC256Signature(payload: BinaryLike, timestamp: number | string, signature: string): boolean {
  assert(process.env.HMAC_SIGNATURE_SECRET_KEY, `"HMAC_SIGNATURE_SECRET_KEY" has not been set. Unable to verify HMAC256 signatures.`)

  try {
    const timestampAsString = typeof timestamp === 'number' ? String(timestamp) : timestamp;
    const payloadSignature = generateHMAC256Signature(payload, timestampAsString);

    return timingSafeEqual(
      Buffer.from(payloadSignature),
      Buffer.from(signature)
    );
  } catch {
    return false;
  }
}