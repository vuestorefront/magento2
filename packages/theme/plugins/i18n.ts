import { Context, NuxtAppOptions } from '@nuxt/types';
import { LocaleObject } from 'nuxt-i18n';
import cookieNames from '~/enums/cookieNameEnum';

export declare type ConfigState = {
  getCartId(): string;
  setCartId(id?: string | null): void;
  getCustomerToken(): string;
  setCustomerToken(token?: string | null): void;
  getStore(): string;
  setStore(id?: string | null): void;
  getCurrency(): string;
  setCurrency(id?: string | null): void;
  getLocale(): string;
  setLocale(id?: string | null): void;
  getCountry(): string;
  setCountry(id?: string | null): void;
};

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
 * @returns string
 */
const findLocaleBasedOnStoreCode = (storeCode: string, locales: string[] | LocaleObject[]) => {
  if (locales.some((l) => typeof l !== 'string')) {
    return (locales as LocaleObject[]).find((locale) => locale.code === storeCode);
  }

  return (locales as string[]).find((locale) => locale === storeCode);
};

/**
 * Find defaultCurrency code based on magento store code
 * @param storeCode {string} - magento store code
 * @param locales {array} - array with locales
 * @returns string
 */
const findCurrencyBasedOnStoreCode = (storeCode: string, locales: string[] | LocaleObject[]): string => {
  const match = (locales as LocaleObject[]).find((locale) => locale.code === storeCode);

  return match.defaultCurrency;
};

/**
 * Set default locale
 * @param i18n {i18n} i18n API
 * @returns {Promise<void>}
 */
const setDefaultLocale = async (i18n) => {
  await i18n.setLocale(i18n.defaultLocale);
};

export default async ({ app, route }: Context) => {
  await app.$vsf.$magento.client.interceptors.request.use(async (request) => {
    const { i18n } = app;
    const currentStoreCode = readStoreCookie(app) ?? route.path.split('/').find((element) => String(element));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!currentStoreCode || !findLocaleBasedOnStoreCode(currentStoreCode, i18n.locales)) {
      await setDefaultLocale(i18n);

      return request;
    }

    const i18nCurrentLocaleCode = i18n.locale;

    const localeCookie = app.$cookies.get(cookieNames.localeCookieName);

    if (i18nCurrentLocaleCode !== localeCookie) {
      const apiState = app.$vsf.$magento.config.state as ConfigState;
      const currency = findCurrencyBasedOnStoreCode(i18nCurrentLocaleCode, i18n.locales);

      apiState.setStore(i18nCurrentLocaleCode);
      apiState.setLocale(i18nCurrentLocaleCode);
      apiState.setCurrency(currency);
    }

    return request;
  });
};
