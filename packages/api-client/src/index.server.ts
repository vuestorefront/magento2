/* istanbul ignore file */
import { ApiClientExtension, apiClientFactory } from "@vue-storefront/middleware";
import * as api from "./api";
import { ClientInstance, Config } from "./types/setup";
import { createMagentoConnection } from "./helpers/magentoLink";
import { defaultSettings } from "./helpers/apiClient/defaultSettings";
import { apolloClientFactory } from "./helpers/magentoLink/graphQl";

const buildConfig = (settings: Config) =>
  ({
    ...defaultSettings,
    ...settings,
    state: settings.state || defaultSettings.state,
  } as unknown as Config);

const init = (settings: Config) => {
  const config = buildConfig(settings);

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
    defaultOptions: {
      query: {
        errorPolicy: "all",
        fetchPolicy: "no-cache",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    ...settings.customOptions,
  });

  return {
    config,
    client,
  };
};

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
  if (!settings?.client) {
    return init(settings);
  }

  const config = buildConfig(settings);

  return { config, client: settings.client };
};

const tokenExtension: ApiClientExtension = {
  name: "tokenExtension",
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }) => {
      const cartCookieName: string = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;
      const customerCookieName: string = configuration.cookies?.customerCookieName || defaultSettings.cookies.customerCookieName;
      const storeCookieName: string = configuration.cookies?.storeCookieName || defaultSettings.cookies.storeCookieName;
      const currencyCookieName: string = configuration.cookies?.currencyCookieName || defaultSettings.cookies.currencyCookieName;

      const cookieParams = [];
      let body = null;

      if (req.query.body) {
        if (typeof req.query.body === 'string') {
          body = JSON.parse(req.query.body);
        }
        if (body[1]) {
          if (body[1].hasOwnProperty(cartCookieName)) {
            cookieParams[cartCookieName] = body[1][cartCookieName];
          }
          if (body[1].hasOwnProperty(customerCookieName)) {
            cookieParams[customerCookieName] = body[1][customerCookieName];
          }
          if (body[1].hasOwnProperty(storeCookieName)) {
            cookieParams[storeCookieName] = body[1][storeCookieName];
          }
          if (body[1].hasOwnProperty(currencyCookieName)) {
            cookieParams[currencyCookieName] = body[1][currencyCookieName];
          }
        }
      }

      return {
        ...configuration,
        state: {
          getCartId: () => req.query[cartCookieName] ?? (cookieParams[cartCookieName] ?? req.cookies[cartCookieName]),
          setCartId: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.query[cartCookieName];
              delete req.cookies[cartCookieName];
              return;
            }
            res.cookie(cartCookieName, JSON.stringify(id));
          },
          getCustomerToken: () => req.query[customerCookieName] ?? (cookieParams[cartCookieName] ?? req.cookies[customerCookieName]),
          setCustomerToken: (token) => {
            if (!token) {
              // eslint-disable-next-line no-param-reassign
              delete req.query[customerCookieName];
              delete req.cookies[customerCookieName];
              return;
            }
            res.cookie(customerCookieName, JSON.stringify(token));
          },
          getStore: () => req.query[storeCookieName] ?? (cookieParams[storeCookieName] ?? (configuration?.storeViewCode ?? req.cookies[storeCookieName])),
          setStore: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.query[storeCookieName];
              delete req.cookies[storeCookieName];
              return;
            }
            res.cookie(storeCookieName, JSON.stringify(id));
          },
          getCurrency: () => req.query[currencyCookieName] ?? (cookieParams[storeCookieName] ?? req.cookies[currencyCookieName]),
          setCurrency: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.query[currencyCookieName];
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

export { createApiClient, init };
