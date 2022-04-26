import type { ComputedRef } from '@nuxtjs/composition-api';
import type { StoreConfig } from '~/../api-client/lib';

/** The interface provided by {@link useProduct} composable. */
export interface UseMagentoConfigurationInterface {
  /** The store configuration object. */
  storeConfig: ComputedRef<StoreConfig>;

  /** The selected currency. */
  selectedCurrency: ComputedRef<string | undefined>;

  /** The selected locale. */
  selectedLocale: ComputedRef<string | undefined>;

  /** The selected store. */
  selectedStore: ComputedRef<string | undefined>;
}
