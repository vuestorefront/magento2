import { computed, ComputedRef, useContext } from '@nuxtjs/composition-api';
import { StoreConfig } from '~/modules/GraphQL/types';
import { storeConfigGetters } from '~/getters';

import { useConfig } from '~/composables';

type UseMagentoConfiguration = () => {
  storeConfig: ComputedRef<StoreConfig>;
  selectedCurrency: ComputedRef<string | undefined>;
  selectedLocale: ComputedRef<string | undefined>;
  selectedStore: ComputedRef<string | undefined>;
  loadConfiguration: (params: { updateCookies: boolean; updateLocale: boolean; }) => Promise<void>;
};

export const useMagentoConfiguration: UseMagentoConfiguration = () => {
  const { app: { i18n, $vsf: { $magento: { config } } } } = useContext();

  const {
    config: storeConfig,
    load: loadConfig,
  } = useConfig();

  const selectedCurrency = computed<string | undefined>(() => config.state.getCurrency());
  const selectedLocale = computed<string | undefined>(() => config.state.getLocale());
  const selectedStore = computed<string | undefined>(() => config.state.getStore());

  const loadConfiguration: (params: { updateCookies: boolean; updateLocale: boolean; }) => Promise<void> = async (params = {
    updateCookies: false,
    updateLocale: false,
  }) => {
    const {
      updateCookies,
      updateLocale,
    } = params;

    await loadConfig();
    if (config.state.getStore() || updateCookies) {
      config.state.setStore(storeConfigGetters.getCode(storeConfig.value));
    }

    if (!config.state.getLocale() || updateCookies) {
      config.state.setLocale(storeConfigGetters.getLocale(storeConfig.value));
    }

    if (!config.state.getCurrency() || updateCookies) {
      config.state.setCurrency(storeConfigGetters.getCurrency(storeConfig.value));
    }

    // eslint-disable-next-line promise/always-return
    if (updateLocale) {
      i18n.setLocale(storeConfigGetters.getLocale(storeConfig.value));
    }
  };

  return {
    storeConfig,
    selectedCurrency,
    selectedLocale,
    selectedStore,
    loadConfiguration,
  };
};
