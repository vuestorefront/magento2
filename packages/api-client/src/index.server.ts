/* istanbul ignore file */
import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core';
import * as api from './api';
import { ClientInstance, Config } from './types/setup';
import { createMagentoConnection } from './helpers/magentoLink';
import { defaultSettings } from './helpers/apiClient/defaultSettings';
import { apolloClientFactory } from './helpers/magentoLink/graphQl';

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
  const config = {
    ...defaultSettings,
    ...settings,
    state: settings.state || defaultSettings.state,
  } as unknown as Config;

  if (settings.client) {
    return {
      client: settings.client,
      config,
    };
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

const tokenExtension: ApiClientExtension = {
  name: 'tokenExtension',
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      const cartCookieName: string = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;
      const customerCookieName: string = configuration.cookies?.customerCookieName || defaultSettings.cookies.customerCookieName;
      const storeCookieName: string = configuration.cookies?.storeCookieName || defaultSettings.cookies.storeCookieName;
      const currencyCookieName: string = configuration.cookies?.currencyCookieName || defaultSettings.cookies.currencyCookieName;

      return {
        ...configuration,
        state: {
          getCartId: () => req.cookies[cartCookieName],
          setCartId: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[cartCookieName];
              return;
            }
            res.cookie(cartCookieName, JSON.stringify(id));
          },
          getCustomerToken: () => req.cookies[customerCookieName],
          setCustomerToken: (token) => {
            if (!token) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[customerCookieName];
              return;
            }
            res.cookie(customerCookieName, JSON.stringify(token));
          },
          getStore: () => req.cookies[storeCookieName],
          setStore: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[storeCookieName];
              return;
            }
            res.cookie(storeCookieName, JSON.stringify(id));
          },
          getCurrency: () => req.cookies[currencyCookieName],
          setCurrency: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[currencyCookieName];
              return;
            }
            res.cookie(currencyCookieName, JSON.stringify(id));
          },
        },
      };
    },
  }),
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: [tokenExtension],
});

export {
  createApiClient,
};
