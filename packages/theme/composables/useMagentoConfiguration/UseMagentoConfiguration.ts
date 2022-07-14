import type { ComputedRef } from '@nuxtjs/composition-api';
import type { StoreConfig } from '~/modules/GraphQL/types';

/**
 * Data and methods returned from the {@link useMagentoConfiguration|useMagentoConfiguration()} composable
 */
export interface UseMagentoConfigurationInterface {
  /**
   * Store configuration object.
   */
  storeConfig: ComputedRef<StoreConfig>;

  /**
   * Currently active currency
   */
  selectedCurrency: ComputedRef<string | undefined>;

  /**
   * Currently active locale
   */
  selectedLocale: ComputedRef<string | undefined>;

  /**
   * Currently active store
   */
  selectedStore: ComputedRef<string | undefined>;
}
