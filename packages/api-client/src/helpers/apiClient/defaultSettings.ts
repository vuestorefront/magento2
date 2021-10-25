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
  currency: 'USD',
  defaultStore: 'default',
  tax: {
    displayCartSubtotalIncludingTax: true,
  },
  websites: {
    base: {
      code: 'base',
      defaultStoreGroup: 'main_website_store',
      storeGroups: {
        main_website_store: {
          code: 'main_website_store',
          defaultStore: 'default',
          stores: {
            default: { code: 'default' },
          },
        },
      },
    },
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
