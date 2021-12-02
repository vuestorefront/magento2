import { ClientConfig } from '../../types/setup';

export const defaultSettings: ClientConfig = {
  api: '',
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale',
    cartCookieName: 'vsf-cart',
    customerCookieName: 'vsf-customer',
    storeCookieName: 'vsf-store',
  },
  tax: {
    displayCartSubtotalIncludingTax: true,
  },
  state: {
    getCartId: () => '',
    setCartId: () => {},
    getCustomerToken: () => '',
    setCustomerToken: () => {},
    getStore: () => '',
    setStore: () => {},
    getCurrency: () => '',
    setCurrency: () => {},
  },
  externalCheckout: {
    enable: false,
    syncUrlPath: '/vue/cart/sync',
    stores: {},
    cmsUrl: '',
  },
};
