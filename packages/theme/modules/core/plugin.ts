import type { NuxtCookies, GetOptions } from 'cookie-universal-nuxt';
import type { CookieSerializeOptions } from 'cookie';
import { integrationPlugin } from '~/modules/core/integrationPlugin';
import { mapConfigToSetupObject } from '~/modules/core/helpers/mapConfigToSetupObject';
import { defaultConfig } from '~/modules/core/defaultConfig';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin((plugin) => {
  const getCookieName = (property: keyof typeof defaultConfig['cookies']) : string => moduleOptions.cookies?.[property] ?? defaultConfig.cookies[property];
  const cookieOpts = {
    [defaultConfig.cookies.currencyCookieName]: { ...moduleOptions.cookiesDefaultOpts },
    [defaultConfig.cookies.localeCookieName]: { ...moduleOptions.cookiesDefaultOpts },
    [defaultConfig.cookies.storeCookieName]: { ...moduleOptions.cookiesDefaultOpts },
    [defaultConfig.cookies.customerCookieName]: { ...moduleOptions.cookiesDefaultOpts },
    [defaultConfig.cookies.cartCookieName]: { ...moduleOptions.cookiesDefaultOpts },
    [defaultConfig.cookies.messageCookieName]: { ...moduleOptions.cookiesDefaultOpts },
  };

  const getCookieOpt = (cookieName?: string): CookieSerializeOptions => cookieOpts[cookieName] ?? {};

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
    set: (value: TValue, opts?: CookieSerializeOptions) => cookies.set(cookieName, value, { ...getCookieOpt(cookieName), ...opts }),
    remove: (opts?: CookieSerializeOptions) => cookies.remove(cookieName, opts),
  });

  const createCookieOperations = createCookieOperationsInstance($cookies);

  // TODO Refactor to separate containers (state.cart.get() .set() .remove()) - this requires a breaking change in api-client types

  const {
    get: getCartId,
    set: setCartId,
    remove: removeCartId,
  } = createCookieOperations(cookieNames.cart);

  const {
    get: getCustomerToken,
    set: setCustomerToken,
    remove: removeCustomerToken,
  } = createCookieOperations(cookieNames.customer);

  const {
    get: getStore,
    set: setStore,
    remove: removeStore,
  } = createCookieOperations(cookieNames.store);

  const {
    get: getCurrency,
    set: setCurrency,
    remove: removeCurrency,
  } = createCookieOperations(cookieNames.currency);

  const {
    get: getLocale,
    set: setLocale,
    remove: removeLocale,
  } = createCookieOperations(cookieNames.locale);

  const {
    get: getCountry,
    set: setCountry,
    remove: removeCountry,
  } = createCookieOperations(cookieNames.country);

  const {
    get: getMessage,
    set: setMessage,
    remove: removeMessage,
  } = createCookieOperations(cookieNames.message);

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app: plugin.app,
    additionalProperties: {
      state: {
        getCartId,
        setCartId,
        removeCartId,

        getCustomerToken,
        setCustomerToken,
        removeCustomerToken,

        getStore,
        setStore,
        removeStore,

        getCurrency,
        setCurrency,
        removeCurrency,

        getLocale,
        setLocale,
        removeLocale,

        getCountry,
        setCountry,
        removeCountry,

        getMessage,
        setMessage,
        removeMessage,
      },
    },
  });

  plugin.integration.configure('magento', settings);
});
