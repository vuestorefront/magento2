/* istanbul ignore file */
import { apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import { ClientInstance, Config } from './types/setup';
import { createMagentoConnection } from './helpers/magentoLink';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import { apolloClientFactory } from './helpers/magentoLink/graphQl';

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
  const config = {
    ...defaultSettings,
    ...settings,
  } as unknown as Config;

  if (settings.client) {
    return { client: settings.client, config };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: apolloClientFactory(settings.customOptions),
      config,
    };
  }

  const { apolloLink } = createMagentoConnection(config);

  const client = apolloClientFactory({
    link: apolloLink,
    ...settings.customOptions,
  });

  return {
    config,
    client,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
});

export {
  createApiClient,
};
