import { apiClientFactory } from '@vue-storefront/core';
import { getCategory, getProduct, getUrls } from './api';
import { Config } from './types/setup';
import createMagentoConnection from './helpers/magentoLink';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

declare let window: any;

const onSetup = (settings: Config): { config: Config, client: ApolloClient<any> } => {
  const defaultSettings = {
    tax: {
      displayCartSubtotalIncludingTax: true
    },
    externalCheckout: {
      enable: false
    },
    storage: window.localStorage
  };

  const config = {
    ...defaultSettings, ...settings
  } as any;

  if (settings.client) {
    return {
      client: settings.client,
      config
    };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache(), ...settings.customOptions
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
