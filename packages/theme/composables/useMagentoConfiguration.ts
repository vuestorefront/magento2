import {
  useConfig,
  useCurrency,
  useStore,
  storeConfigGetters,
} from '@vue-storefront/magento';
import { computed, useContext } from '@nuxtjs/composition-api';
import cookieNames from '~/enums/cookieNameEnum';

export const useMagentoConfiguration = () => {
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

  const selectedCurrency = computed(() => app.$cookies.get(cookieNames.currencyCookieName));

  const selectedLocale = computed(() => app.$cookies.get(cookieNames.localeCookieName));

  const selectedStore = computed(() => app.$cookies.get(cookieNames.storeCookieName));

  const loadConfiguration = async () => {
    await Promise.all([
      loadConfig(),
      loadStores(),
      loadCurrencies(),
    ]);

    if (!app.$cookies.get(cookieNames.storeCookieName)) {
      app.$cookies.set(cookieNames.storeCookieName, storeConfigGetters.getCode(storeConfig.value));
    }

    if (!app.$cookies.get(cookieNames.localeCookieName)) {
      app.$cookies.set(cookieNames.localeCookieName, storeConfigGetters.getLocale(storeConfig.value));
    }

    if (!app.$cookies.get(cookieNames.currencyCookieName)) {
      app.$cookies.set(cookieNames.currencyCookieName, storeConfigGetters.getCurrency(storeConfig.value));
    }
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
