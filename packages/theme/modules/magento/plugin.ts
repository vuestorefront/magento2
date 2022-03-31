import type { NuxtCookies, GetOptions } from 'cookie-universal-nuxt';
import type { CookieSerializeOptions } from 'cookie';
import { integrationPlugin } from '~/helpers/integrationPlugin';
import { mapConfigToSetupObject } from '~/modules/magento/helpers';
import { defaultConfig } from '~/modules/magento/defaultConfig';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin((plugin) => {
  const getCookieName = (property: string) : string => moduleOptions.cookies?.[property] ?? defaultConfig.cookies[property];

  const cookieNames = {
    cart: getCookieName('cartCookieName'),
    customer: getCookieName('customerCookieName'),
    currency: getCookieName('currencyCookieName'),
    store: getCookieName('storeCookieName'),
    locale: getCookieName('localeCookieName'),
    country: getCookieName('countryCookieName'),
    message: getCookieName('messageCookieName'),
  };

  const { $cookies } = plugin.app;

  const createCookieOperationsInstance = <TValue = string>(cookies: NuxtCookies) => (cookieName: string) => ({
    get: (opts?: GetOptions) => cookies.get(cookieName, opts),
    set: (value: TValue, opts?: CookieSerializeOptions) => cookies.set(cookieName, value, opts),
    remove: (opts?: CookieSerializeOptions) => cookies.remove(cookieName, opts),
  });
  const createCookieOperations = createCookieOperationsInstance($cookies);

  const { get: getCartId, set: setCartId } = createCookieOperations(cookieNames.cart);
  const { get: getCustomerToken, set: setCustomerToken } = createCookieOperations(cookieNames.customer);
  const { get: getStore, set: setStore } = createCookieOperations(cookieNames.store);
  const { get: getCurrency, set: setCurrency } = createCookieOperations(cookieNames.currency);
  const { get: getLocale, set: setLocale } = createCookieOperations(cookieNames.locale);
  const { get: getCountry, set: setCountry } = createCookieOperations(cookieNames.country);
  const { get: getMessage, set: setMessage } = createCookieOperations(cookieNames.message);

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app: plugin.app,
    additionalProperties: {
      state: {
        getCartId,
        setCartId,

        getCustomerToken,
        setCustomerToken,

        getStore,
        setStore,

        getCurrency,
        setCurrency,

        getLocale,
        setLocale,

        getCountry,
        setCountry,

        getMessage,
        setMessage,
      },
    },
  });

  plugin.integration.configure('magento', settings);
});
