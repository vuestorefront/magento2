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

// @ts-ignore
export const useMagentoConfiguration: UseMagentoConfiguration = () => {
  const { app } = useContext();

  const {
    config: storeConfig,
    load: loadConfig,
  } = useConfig();

  const selectedCurrency = computed<string | undefined>(() => app.$vsf.$magento.config.state.getCurrency());
  const selectedLocale = computed<string | undefined>(() => app.$vsf.$magento.config.state.getLocale());
  const selectedStore = computed<string | undefined>(() => app.$vsf.$magento.config.state.getStore());

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
      if (!app.$vsf.$magento.config.state.getStore() || updateCookies) {
        // @ts-ignore
        app.$vsf.$magento.config.state.setStore(storeConfig.value);
      }

      if (!app.$vsf.$magento.config.state.getLocale() || updateCookies) {
        // @ts-ignore
        app.$vsf.$magento.config.state.setLocale(storeConfig.value);
      }

      if (!app.$vsf.$magento.config.state.getCurrency() || updateCookies) {
        // @ts-ignore
        app.$vsf.$magento.config.state.setCurrency(storeConfig.value);
      }

      if (updateLocale) {
        app.i18n.setLocale(storeConfigGetters.getLocale(storeConfig.value as StoreConfig));
      }
      return true;
    });
  };

  return {
    storeConfig,
    selectedCurrency,
    selectedLocale,
    selectedStore,
    loadConfiguration,
  };
};
