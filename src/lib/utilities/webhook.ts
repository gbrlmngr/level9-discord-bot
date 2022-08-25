import { Configuration } from '../configuration';
import { Webhook } from '../constants';

export function parseIdentity(identity: string): { type: string; value: string } {
  const [type, value] = identity.split(Webhook.IdentitySeparator);
  return { type, value };
}

export function constructAuthenticationUrlForUser(id: string) {
  const { Webhook: { SteamVerification: { AuthenticationBaseUrl } } } = Configuration;
  const { QueryParameters: { IntegrationIdentifier }, IntegrationDestination, IdentityTypes } = Webhook;

  const integrationIdentifierValue = encodeURIComponent(
    `${IntegrationDestination}/${IdentityTypes.User}/${id}`
  );

  const url = new URL(AuthenticationBaseUrl);
  url.searchParams.set(IntegrationIdentifier, integrationIdentifierValue);

  return url.href;
}
