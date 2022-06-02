import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { StoreConfig } from '~/modules/GraphQL/types';
import type { AvailableStores } from '~/composables/types';

/**
 * Errors that occured in the {@link useStore|useStore()} composable
 */
export interface UseStoreErrors {
  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;

  /**
   * Contains error if `change` method failed, otherwise is `null`
   */
  change: Error | null;
}

/**
 * Data and methods returned from the {@link useStore|useStore()} composable
 */
export interface UseStoreInterface {
  /**
   * Changes the current store and reloads the page
   */
  change(store: StoreConfig): void;

  /**
   * Fetches a list of available stores
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#availableStores} API endpoint
   * and accepts the custom queries named `availableStores`.
   */
  load(customQuery?: { availableStores: string }): Promise<void>;

  /**
   * Main data object populated by the `load()` method
   */
  stores: Ref<AvailableStores>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseStoreErrors>>;
}
