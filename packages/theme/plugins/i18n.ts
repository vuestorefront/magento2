import { Context, NuxtAppOptions } from '@nuxt/types';
import { LocaleObject } from 'nuxt-i18n';

const findLocaleBasedOnMagentoStoreCode = (storeCode: string, locales: Array<string | LocaleObject>) => locales.find((locale) => ((typeof locale === 'object' ? locale.code : locale) === storeCode));

const findCurrencyBasedOnMagentoStoreCode = (storeCode: string, locales: Array<string | LocaleObject>): string => {
  const match = locales.find((locale) => typeof locale === 'object' && locale.code === storeCode) as LocaleObject | undefined;
  return match?.defaultCurrency;
};

/**
 * Prepare new cookie string based on app state.
 *
 * @param app {NuxtAppOptions}
 * @param newStoreCode {string}
 * @param currency {string}
 * @returns {string}
 */
const prepareNewCookieString = (app: NuxtAppOptions, newStoreCode: string, currency: string) => {
  const apiState = app.$vsf.$magento.config.state;
  const customerTokenCookie = apiState.getCustomerToken();
  const cartIdCookie = apiState.getCartId();

  let cookie = `vsf-store=${newStoreCode}; `;
  cookie += `vsf-locale=${newStoreCode}; `;
  cookie += `vsf-currency=${currency}; `;
  cookie += `vsf-country=${apiState.getCountry()}; `;

  if (customerTokenCookie) {
    cookie += `vsf-customer=${customerTokenCookie}; `;
  }

  if (cartIdCookie) {
    cookie += `vsf-cart=${cartIdCookie} `;
  }

  return cookie;
};

export default ({ app, route }: Context) => app.$vsf.$magento.client.interceptors.request.use(async (request) => {
  const {
    $vsf: { $magento: { config: { state } } },
    i18n,
  } = app;

  const currentStoreCode = app.$vsf.$magento.config.state.getStore() ?? route.path.split('/')[1]; // localhost:3000/default
  const shouldSetDefaultLocale = !currentStoreCode || !findLocaleBasedOnMagentoStoreCode(currentStoreCode, i18n.locales);

  if (shouldSetDefaultLocale) {
    await i18n.setLocale(i18n.defaultLocale);
  }

  const i18nCurrentLocaleCode = i18n.locale;
  const shouldLocaleBeRefreshed = i18nCurrentLocaleCode !== state.getLocale();

  if (shouldLocaleBeRefreshed) {
    const currency = findCurrencyBasedOnMagentoStoreCode(i18nCurrentLocaleCode, i18n.locales);

    state.setStore(i18nCurrentLocaleCode);
    state.setLocale(i18nCurrentLocaleCode);
    state.setCurrency(currency);

    // eslint-disable-next-line no-param-reassign
    request.headers.cookie = prepareNewCookieString(app, i18nCurrentLocaleCode, currency);
  }

  return request;
});
