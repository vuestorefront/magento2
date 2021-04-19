import { integrationPlugin } from '@vue-storefront/core'
import { mapConfigToSetupObject } from '@vue-storefront/magento/nuxt/helpers';
import defaultConfig from '@vue-storefront/magento/nuxt/defaultConfig';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration }) => {
  const loadState = () => {
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

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      state: loadState(),
    }
  });

  integration.configure('magento', settings);
});
