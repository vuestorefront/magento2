import { computed, ComputedRef, useContext } from '@nuxtjs/composition-api';
import { StoreConfig } from '~/modules/GraphQL/types';
import { useConfig } from '~/composables';

type UseMagentoConfiguration = () => {
  storeConfig: ComputedRef<StoreConfig>;
  selectedCurrency: ComputedRef<string | undefined>;
  selectedLocale: ComputedRef<string | undefined>;
  selectedStore: ComputedRef<string | undefined>;
};

export const useMagentoConfiguration: UseMagentoConfiguration = () => {
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
