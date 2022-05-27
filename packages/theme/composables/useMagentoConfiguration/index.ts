import { computed, useContext } from '@nuxtjs/composition-api';
import { useConfig } from '~/composables';
import type { UseMagentoConfigurationInterface } from './UseMagentoConfiguration';

/**
 * Allows getting the Magento's major
 * definitions, e.g., the selected currency, store, locale, and config object.
 *
 * See the {@link UseMagentoConfigurationInterface} for a list of methods and values available in this composable.
 */
export function useMagentoConfiguration(): UseMagentoConfigurationInterface {
  const {
    app: {
      $vsf: {
        $magento: { config },
      },
    },
  } = useContext();

  const { config: storeConfig } = useConfig();

  const selectedCurrency = computed<string | undefined>(() => config.state.getCurrency());
  const selectedLocale = computed<string | undefined>(() => config.state.getLocale());
  const selectedStore = computed<string | undefined>(() => config.state.getStore());

  return {
    storeConfig,
    selectedCurrency,
    selectedLocale,
    selectedStore,
  };
}

export * from './UseMagentoConfiguration';
export default useMagentoConfiguration;
