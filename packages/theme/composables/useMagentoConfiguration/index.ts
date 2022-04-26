import { computed, useContext } from '@nuxtjs/composition-api';
import { useConfig } from '~/composables';
import type { UseMagentoConfigurationInterface } from './UseMagentoConfiguration';

export const useMagentoConfiguration = (): UseMagentoConfigurationInterface => {
  const { app: { $vsf: { $magento: { config } } } } = useContext();

  const {
    config: storeConfig,
  } = useConfig();

  const selectedCurrency = computed<string | undefined>(() => config.state.getCurrency());
  const selectedLocale = computed<string | undefined>(() => config.state.getLocale());
  const selectedStore = computed<string | undefined>(() => config.state.getStore());

  return {
    storeConfig,
    selectedCurrency,
    selectedLocale,
    selectedStore,
  };
};
