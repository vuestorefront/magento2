import { integrationPlugin } from '@vue-storefront/core'
import { mapConfigToSetupObject } from '@vue-storefront/magento/nuxt/helpers';
import defaultConfig from '@vue-storefront/magento/nuxt/defaultConfig';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration }) => {
  const cartCookieName = moduleOptions.cookies?.cartCookieName || defaultConfig.cookies.cartCookieName;
  const customerCookieName = moduleOptions.cookies?.customerCookieName || defaultConfig.cookies.customerCookieName;
  const storeCookieName = moduleOptions.cookies?.storeCookieName || defaultConfig.cookies.storeCookieName;

  const getCartId = () => app.$cookies.get(cartCookieName);

  const setCartId = (id) => {
    if (!id) {
      app.$cookies.remove(cartCookieName);
      return;
    }
    app.$cookies.set(cartCookieName, id);
  };

  const getCustomerToken = () => app.$cookies.get(customerCookieName);

  const setCustomerToken = (token) => {
    if (!token) {
      app.$cookies.remove(customerCookieName);
      return;
    }
    app.$cookies.set(customerCookieName, token);
  };

  const getStore = () => app.$cookies.get(storeCookieName);

  const setStore = (id) => {
    if (!id) {
      app.$cookies.remove(storeCookieName);
      return;
    }
    app.$cookies.set(storeCookieName, id);
  };

  const settings = mapConfigToSetupObject({
    moduleOptions,
    app,
    additionalProperties: {
      state: {
        getCartId,
        setCartId,
        getCustomerToken,
        setCustomerToken,
        getStore,
        setStore,
      },
    }
  });

  integration.configure('magento', settings);
});
