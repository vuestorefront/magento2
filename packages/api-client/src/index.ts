import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import getUrls from './api/getUrls';
import { Config } from './types/setup';
import createMagentoConnection from './helpers/magentoLink';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const defaultSettings = {
  locale: 'en',
  acceptLanguage: ['en']
};

const onSetup = (settings: Config): {config: Config, client: ApolloClient<any>} => {
  const languageMap = settings.languageMap || {};
  const acceptLanguage = settings.acceptLanguage || defaultSettings.acceptLanguage;
  const locale = settings.locale || defaultSettings.locale;

  const config = {
    ...defaultSettings,
    ...settings,
    languageMap,
    acceptLanguage: languageMap[locale] || acceptLanguage
  } as any as Config;

  if (settings.client) {
    return {
      client: settings.client,
      config
    };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(),
        ...settings.customOptions
      }),
      config
    };
  }

  const client = createMagentoConnection(config);

  return {
    config,
    client
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  tag: 'm2',
  onSetup,
  api: {
    getProduct,
    getCategory,
    getUrls
  }
});

export {
  createApiClient
};

export * from './types';
