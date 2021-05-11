import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config } from './types/setup';
import createMagentoConnection from './link';

const onSetup = (settings: Config): {
  config: Config;
  client: ApolloClient<any>
} => {
  const defaultSettings = {
    api: '',
    tax: {
      displayCartSubtotalIncludingTax: true,
    },
    externalCheckout: {
      enable: false,
    },
  };

  const config = {
    ...defaultSettings,
    ...settings,
  } as any;

  if (settings.client) {
    return {
      client: settings.client,
      config,
    };
  }

  if (settings.customOptions && settings.customOptions.link) {
    return {
      client: new ApolloClient({
        cache: new InMemoryCache({ addTypename: false }), ...settings.customOptions,
      }),
      config,
    };
  }

  const client = createMagentoConnection(config);

  return {
    config,
    client,
  };
};

export {
  onSetup,
};
