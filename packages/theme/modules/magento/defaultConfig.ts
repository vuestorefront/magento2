export const defaultConfig = {
  cookies: {
    currencyCookieName: 'vsf-currency',
    countryCookieName: 'vsf-country',
    localeCookieName: 'vsf-locale',
    cartCookieName: 'vsf-cart',
    customerCookieName: 'vsf-customer',
    storeCookieName: 'vsf-store',
    messageCookieName: 'vsf-message',
  },
  locale: undefined,
  country: undefined,
  currency: undefined,
} as const;
