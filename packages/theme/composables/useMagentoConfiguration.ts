import {
  useConfig,
  useCurrency,
  useStore,
  storeConfigGetters,
} from '@vue-storefront/magento';
import { useContext } from '@nuxtjs/composition-api';
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

  const loadConfiguration = async () => {
    await Promise.all([
      loadConfig(),
      loadStores(),
      loadCurrencies(),
    ]);

    if (!app.$cookies.get(cookieNames.storeCookieName)) {
      console.log('defining store');
      app.$cookies.set(cookieNames.storeCookieName, storeConfigGetters.getCode(storeConfig.value));
    }

    if (!app.$cookies.get(cookieNames.localeCookieName)) {
      console.log('defining locale');
      app.$cookies.set(cookieNames.localeCookieName, storeConfigGetters.getLocale(storeConfig.value));
    }

    if (!app.$cookies.get(cookieNames.currencyCookieName)) {
      console.log('defining currency');
      app.$cookies.set(cookieNames.currencyCookieName, storeConfigGetters.getCurrency(storeConfig.value));
    }

    /*    if (!app.$cookies.get(cookieNames.countryCookieName)) {
      app.$cookies.set(cookieNames.countryCookieName, storeConfigGetters.(storeConfig.value));
    } */
  };

  return {
    currencies,
    stores,
    storeConfig,
    loadConfiguration,
  };
};
