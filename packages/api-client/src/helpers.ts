import { Config } from './types/setup';
import createMagentoConnection from './link';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const onSetup = (settings: Config): {
  config: Config;
  client: ApolloClient<any>
} => {
  const defaultSettings = {
    api: "https://demo.site-builder.app/graphql",
    tax: {
      displayCartSubtotalIncludingTax: true
    },
    websites: {
      base: {
        code: 'base',
        defaultStoreGroup: 'main_website_store',
        storeGroups: {
          // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
          main_website_store: {
            code: 'main_website_store',
            defaultStore: 'default',
            stores: {
              default: {code: 'default'},
              de: {code: 'de'},
              fr: {code: 'fr'}
            }
          }
        }
      }
    },
    defaultStore: 'default'
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

export {
  onSetup
};
