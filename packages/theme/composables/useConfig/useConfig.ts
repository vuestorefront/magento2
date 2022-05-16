import { ComputedRef, Readonly, Ref } from '@nuxtjs/composition-api';
import { StoreConfig } from '~/modules/GraphQL/types';

/**
 * Errors that occured in the {@link useConfig|useConfig()} composable
 */
export interface UseConfigErrors {
  /**
   * Contains error if `load` method failed, otherwise is `null`
   */
  load: Error | null;
}

/**
 * The refs and methods returned by the {@link useConfig|useConfig()} composable
 */
export interface UseConfigInterface {
  /**
   * Store configuration loaded using the `load` method
   */
  config: ComputedRef<StoreConfig>,

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>,

  /**
   * Loads store configuration
   */
  load(): Promise<void>
}
