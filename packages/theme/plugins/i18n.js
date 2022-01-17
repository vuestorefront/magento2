import cookieNames from '~/enums/cookieNameEnum';

/**
 * Read vsf-store cookie value.
 *
 * @param app {NuxtAppOptions} - Nuxt App options object
 * @returns {string} - vsf-store cookie value
 */
const readStoreCookie = (app) => app.$cookies.get(cookieNames.storeCookieName);

/**
 * Find locale code based on magento store code
 * @param storeCode {string} - magento store code
 * @param locales {array} - array with locales
 * @returns boolean
 */
const findLocaleBasedOnStoreCode = (storeCode, locales) => locales.find((locale) => locale.code === storeCode);

/**
 * Set default locale
 * @param i18n {i18n} i18n API
 * @returns {Promise<void>}
 */
const setDefaultLocale = async (i18n) => {
  await i18n.setLocale(i18n.defaultLocale);
};

/**
 * Prepare new cookie string based on app state.
 *
 * @param apiState {ConfigState}
 * @returns {string}
 */
const prepareNewCookieString = (apiState, newStoreCode) => {
  let cookie = `vsf-store=${newStoreCode}; `;

  cookie += `vsf-locale=${newStoreCode}; `;
  cookie += `vsf-currency=${apiState.getCurrency()}; `;
  cookie += `vsf-country=${apiState.getCountry()}; `;

  const customerTokenCookie = apiState.getCustomerToken();

  if (customerTokenCookie) {
    cookie += `vsf-customer=${customerTokenCookie}; `;
  }

  const cartIdCookie = apiState.getCartId();

  if (cartIdCookie) {
    cookie += `vsf-cart=${cartIdCookie} `;
  }

  return cookie;
};


export default ({ app, redirect }) => {
  let once = true;

  app.$vsf.$magento.client.interceptors.request.use(async (r) => {


    const { i18n } = app;
    const currentStoreCode = readStoreCookie(app);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!currentStoreCode || !findLocaleBasedOnStoreCode(currentStoreCode, i18n.locales)) {
      await setDefaultLocale(i18n);

      return;
    }

    const i18nCurrentLocaleCode = i18n.locale;
    const localeCookie = app.$cookies.get(cookieNames.localeCookieName);

    if (i18nCurrentLocaleCode !== localeCookie) {
      const apiState = app.$vsf.$magento.config.state;

      apiState.setStore(i18nCurrentLocaleCode);
      apiState.setLocale(i18nCurrentLocaleCode);

      // eslint-disable-next-line no-param-reassign
      r.headers.cookie = prepareNewCookieString(apiState, i18nCurrentLocaleCode);

    }


    return r;
  });
};
