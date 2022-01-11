import cookieNames from '~/enums/cookieNameEnum';

/**
 * Read vsf-store cookie value.
 *
 * @param app {NuxtAppOptions} - Nuxt App options object
 * @returns {string} - vsf-store cookie value
 */
export const readStoreCookie = (app) => app.$cookies.get(cookieNames.storeCookieName);

/**
 * Find locale code based on magento store code
 * @param storeCode {string} - magento store code
 * @param locales {array} - array with locales
 * @returns boolean
 */
export const findLocaleBasedOnStoreCode = (storeCode, locales) => locales.find((locale) => locale.code === storeCode);

/**
 * Set default locale
 * @param i18n {i18n} i18n API
 * @returns {Promise<void>}
 */
export const setDefaultLocale = async (i18n) => {
  await i18n.setLocale(i18n.defaultLocale);
};

/**
 * Prepare new cookie string based on app state.
 *
 * @param apiState {ConfigState}
 * @returns {string}
 */
export const prepareNewCookieString = (apiState, newStoreCode) => {
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

  console.log(cookie)

  return cookie;
};

export default async ({ app }) => {
  const { i18n } = app;
  const currentStoreCode = readStoreCookie(app);

  if (!currentStoreCode) {
    await setDefaultLocale(i18n);

    return;
  }

  const i18nLocaleObject = findLocaleBasedOnStoreCode(currentStoreCode, i18n.locales);

  if (!i18nLocaleObject) {
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
    app.$vsf.$magento.config.axios.headers.cookie = prepareNewCookieString(apiState, i18nCurrentLocaleCode);
  }
};
