import { ComputedRef, DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { StoreConfig } from '~/modules/GraphQL/types';

/** Errors returned by the {@link useConfig} composable */
export interface UseConfigErrors {
  /** Error when loading configuration fails, otherwise is `null` */
  load: Error | null;
}

/**
 * Represents the data and methods returned by the {@link useConfig} composable
 */
export interface UseConfigInterface {
  /** Returns the loaded config as computed property */
  config: ComputedRef<StoreConfig>,
  /** Return state of loadConfig Function as computed property */
  loading: DeepReadonly<Ref<boolean>>,
  /** Function to load the config */
  load (): Promise<void>
}
