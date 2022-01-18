import { ConfigState } from '@vue-storefront/magento-api';
import { Context, NuxtAppOptions } from '@nuxt/types';
import { LocaleObject } from 'nuxt-i18n';
import cookieNames from '~/enums/cookieNameEnum';

/**
 * Read vsf-store cookie value.
 *
 * @param app {NuxtAppOptions} - Nuxt App options object
 * @returns {string} - vsf-store cookie value
 */
const readStoreCookie = (app: NuxtAppOptions) => app.$cookies.get(cookieNames.storeCookieName);

/**
 * Find locale code based on magento store code
 * @param storeCode {string} - magento store code
 * @param locales {array} - array with locales
 * @returns boolean
 */
const findLocaleBasedOnStoreCode = (storeCode: string, locales: string[] | LocaleObject[]) => {
  if (locales.some((l) => typeof l !== 'string')) {
    return !!(locales as LocaleObject[]).find((locale) => locale.code === storeCode);
  }

  return (locales as string[]).includes(storeCode);
};

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
 * @param newStoreCode {string}
 * @returns {string}
 */
const prepareNewCookieString = (apiState: ConfigState, newStoreCode: string) => {
  const customerTokenCookie = apiState.getCustomerToken();
  const cartIdCookie = apiState.getCartId();

  let cookie = `vsf-store=${newStoreCode}; `;
  cookie += `vsf-locale=${newStoreCode}; `;
  cookie += `vsf-currency=${apiState.getCurrency()}; `;
  cookie += `vsf-country=${apiState.getCountry()}; `;

  if (customerTokenCookie) {
    cookie += `vsf-customer=${customerTokenCookie}; `;
  }

  if (cartIdCookie) {
    cookie += `vsf-cart=${cartIdCookie} `;
  }

  return cookie;
};

export default async ({ app }: Context) => {
  await app.$vsf.$magento.client.interceptors.request.use(async (request) => {
    const { i18n } = app;
    const currentStoreCode = readStoreCookie(app);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!currentStoreCode || !findLocaleBasedOnStoreCode(currentStoreCode, i18n.locales)) {
      await setDefaultLocale(i18n);

      return request;
    }

    const i18nCurrentLocaleCode = i18n.locale;
    const localeCookie = app.$cookies.get(cookieNames.localeCookieName);

    if (i18nCurrentLocaleCode !== localeCookie) {
      const apiState = app.$vsf.$magento.config.state as ConfigState;

      apiState.setStore(i18nCurrentLocaleCode);
      apiState.setLocale(i18nCurrentLocaleCode);

      // eslint-disable-next-line no-param-reassign
      request.headers.cookie = prepareNewCookieString(apiState, i18nCurrentLocaleCode);
    }

    return request;
  });
};
