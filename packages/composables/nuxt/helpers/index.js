import defaultConfig from './defaultConfig';

export const getLocaleSettings = (moduleOptions, app) => {
  let localeSettings = {};

  if (moduleOptions.cookies) {
    localeSettings = {
      locale: app.$cookies.get(moduleOptions.cookies.localeCookieName),
      country: app.$cookies.get(moduleOptions.cookies.currencyCookieName),
      currency: app.$cookies.get(moduleOptions.cookies.countryCookieName),
    };
  }

  return {
    locale: app.i18n.locale || (localeSettings.locale || moduleOptions.locale || defaultConfig.locale),
    country: localeSettings.country || moduleOptions.country || defaultConfig.country,
    currency: localeSettings.currency || moduleOptions.currency || defaultConfig.currency,
  };
};

export const loadState = (app) => {
  let cartId = app.$cookies.get(defaultConfig.cookies.cartCookieName);
  let customerToken = app.$cookies.get(defaultConfig.cookies.customerCookieName);
  let store = app.$cookies.get(defaultConfig.cookies.storeCookieName);

  const getCartId = () => cartId;

  const setCartId = (id) => {
    if (!id) {
      app.$cookies.remove(defaultConfig.cookies.cartCookieName);
      return;
    }
    app.$cookies.set(defaultConfig.cookies.cartCookieName, id);
    cartId = id;
  };

  const getCustomerToken = () => customerToken;

  const setCustomerToken = (token) => {
    if (!token) {
      app.$cookies.remove(defaultConfig.cookies.customerCookieName);
      return;
    }
    app.$cookies.set(defaultConfig.cookies.customerCookieName, token);
    customerToken = token;
  };

  const getStore = () => store;

  const setStore = (id) => {
    if (!id) {
      app.$cookies.remove(defaultConfig.cookies.storeCookieName);
      return;
    }
    app.$cookies.set(defaultConfig.cookies.storeCookieName, id);
    store = id;
  };

  return {
    getCartId,
    setCartId,
    getCustomerToken,
    setCustomerToken,
    getStore,
    setStore,
  };
};

export const mapConfigToSetupObject = ({ moduleOptions, app, additionalProperties = {} }) => ({
  ...defaultConfig,
  ...moduleOptions,
  ...additionalProperties,
  ...getLocaleSettings(moduleOptions, app),
});
