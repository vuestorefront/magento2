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
  state: {
    getCartId: () => '',
    setCartId: () => {},
    getCustomerToken: () => '',
    setCustomerToken: () => {},
    getStore: () => '',
    setStore: () => {},
    getCurrency: () => '',
    setCurrency: () => {},
    getLocale: () => '',
    setLocale: () => {},
    getCountry: () => '',
    setCountry: () => {},
    setMessage: () => {},
    // @ts-ignore
    getMessage: () => ({}),
  },
  externalCheckout: {
    enable: false,
    syncUrlPath: '/vue/cart/sync',
    stores: {},
    cmsUrl: '',
  },
};
