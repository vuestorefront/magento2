import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { StoreConfig } from '~/modules/GraphQL/types';
import type { AvailableStores } from '~/composables/types';

/**
 * Errors that occured in the `useStore` composable
 */
export interface UseStoreErrors {
  load: Error | null;
  change: Error | null;
}

/**
 * Represents the data returned from and functions available in the `useStore()` composable.
 */
export interface UseStoreInterface {
  /**
   * Changes the current store and reloads the page
   */
  change(store: StoreConfig): void;

  /**
   * Fetches a list of available stores
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
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseStoreErrors>>;
}
