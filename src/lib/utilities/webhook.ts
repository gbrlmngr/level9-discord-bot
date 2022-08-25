import { Webhook } from '../constants';

export function parseIdentity(identity: string): { type: string; value: string } {
  const [type, value] = identity.split(Webhook.IdentitySeparator);
  return { type, value };
}
