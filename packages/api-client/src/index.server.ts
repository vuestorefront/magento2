/* istanbul ignore file */
import { type AlokaiContainer, ApiClientExtension, apiClientFactory } from "@vue-storefront/middleware";
import * as api from "./api";
import { defaultSettings } from "./helpers/apiClient/defaultSettings";
import { createMagentoConnection } from "./helpers/magentoLink";
import { apolloClientFactory } from "./helpers/magentoLink/graphQl";
import { ClientInstance, Config } from "./types/setup";

const buildConfig = (settings: Config) =>
  ({
    ...defaultSettings,
    ...settings,
    state: settings.state || defaultSettings.state,
  } as unknown as Config);

const init = (settings: Config, alokai: AlokaiContainer) => {
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

  const { apolloLink } = createMagentoConnection(config, alokai);

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

const onCreate = (settings: Config, alokai: AlokaiContainer): { config: Config; client: ClientInstance } => {
  if (!settings?.client) {
    return init(settings, alokai);
  }

  const config = buildConfig(settings);

  return { config, client: settings.client };
};

const tokenExtension: ApiClientExtension = {
  name: "tokenExtension",
  hooks: (req, res) => ({
    beforeCreate: ({ configuration }: { configuration: Config }) => {
      const cartCookieName: string = configuration.cookies?.cartCookieName || defaultSettings.cookies.cartCookieName;
      const customerCookieName: string = configuration.cookies?.customerCookieName || defaultSettings.cookies.customerCookieName;
      const storeCookieName: string = configuration.cookies?.storeCookieName || defaultSettings.cookies.storeCookieName;
      const currencyCookieName: string = configuration.cookies?.currencyCookieName || defaultSettings.cookies.currencyCookieName;

      function setCookie(name: string, value: string) {
        res.cookie(name, value, configuration.cookieOptions?.[name]);
      }

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
            setCookie(cartCookieName, JSON.stringify(id));
          },
          getCustomerToken: () => req.cookies[customerCookieName],
          setCustomerToken: (token) => {
            if (!token) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[customerCookieName];
              return;
            }
            setCookie(customerCookieName, JSON.stringify(token));
          },
          getStore: () => (configuration as any)?.storeViewCode ?? req.cookies[storeCookieName],
          setStore: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[storeCookieName];
              return;
            }
            setCookie(storeCookieName, JSON.stringify(id));
          },
          getCurrency: () => req.cookies[currencyCookieName],
          setCurrency: (id) => {
            if (!id) {
              // eslint-disable-next-line no-param-reassign
              delete req.cookies[currencyCookieName];
              return;
            }
            setCookie(currencyCookieName, JSON.stringify(id));
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
