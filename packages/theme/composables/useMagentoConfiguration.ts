import {
  useConfig,
  useCurrency,
  useStore,
  storeConfigGetters,
  Currency,
  AvailableStores,
  StoreConfig,
} from '@vue-storefront/magento';

import { computed, ComputedRef, useContext } from '@nuxtjs/composition-api';
import cookieNames from '~/enums/cookieNameEnum';

type UseMagentoConfiguration = () => {
  currencies: ComputedRef<Currency>;
  stores: ComputedRef<AvailableStores>;
  storeConfig: ComputedRef<StoreConfig>;
  selectedCurrency: ComputedRef<string | undefined>;
  selectedLocale: ComputedRef<string | undefined>;
  selectedStore: ComputedRef<string | undefined>;
  loadConfiguration: (params: { updateCookies: boolean; updateLocale: boolean; }) => Promise<void>;
};
// @ts-ignore
export const useMagentoConfiguration: UseMagentoConfiguration = () => {
  const { app } = useContext();
  const {
    config: storeConfig,
    loadConfig,
  } = useConfig();

  const {
    stores,
    load: loadStores,
  } = useStore();

  const {
    currencies,
    load: loadCurrencies,
  } = useCurrency();

  const selectedCurrency = computed<string | undefined>(() => app.$cookies.get(cookieNames.currencyCookieName));

  const selectedLocale = computed<string | undefined>(() => app.$cookies.get(cookieNames.localeCookieName));

  const selectedStore = computed<string | undefined>(() => app.$cookies.get(cookieNames.storeCookieName));

  const loadConfiguration: (params: { updateCookies: boolean; updateLocale: boolean; }) => void = (params = {
    updateCookies: false,
    updateLocale: false,
  }) => {
    const {
      updateCookies,
      updateLocale,
    } = params;

    // eslint-disable-next-line promise/catch-or-return
    loadConfig().then(() => {
      if (!app.$cookies.get(cookieNames.storeCookieName) || updateCookies) {
        app.$cookies.set(cookieNames.storeCookieName, storeConfigGetters.getCode(storeConfig.value));
      }

      if (!app.$cookies.get(cookieNames.localeCookieName) || updateCookies) {
        app.$cookies.set(cookieNames.localeCookieName, storeConfigGetters.getCode(storeConfig.value));
      }

      if (!app.$cookies.get(cookieNames.currencyCookieName) || updateCookies) {
        app.$cookies.set(cookieNames.currencyCookieName, storeConfigGetters.getCurrency(storeConfig.value));
      }

      if (updateLocale) {
        app.i18n.setLocale(storeConfigGetters.getLocale(storeConfig.value));
      }

      return true;
    });

    loadStores();
    loadCurrencies();
  };

  return {
    currencies,
    stores,
    storeConfig,
    selectedCurrency,
    selectedLocale,
    selectedStore,
    loadConfiguration,
  };
};
