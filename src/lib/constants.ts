export const Webhook = {
  Headers: {
    Signature: 'x-level9-signature',
    Timestamp: 'x-level9-timestamp',
  },
  QueryParameters: {
    IntegrationIdentifier: 'x-level9-integration-identifier',
  },
  IdentitySeparator: ':',
  IntegrationDestination: 'discord',
  IdentityTypes: {
    User: 'user'
  },
};
