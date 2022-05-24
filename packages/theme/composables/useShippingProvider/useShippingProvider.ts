import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { SelectedShippingMethod } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useShippingProvider} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UseShippingProviderErrors {
  /** Error when loading the shipping provider fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving new shipping provider fails, otherwise is `null`. */
  save: Error | null;
}

/** The params received by {@link useShippingProvider}'s `load` method. */
export type UseShippingProviderLoadParams = ComposableFunctionArgs<{}>;

/** The params received by {@link useShippingProvider}'s `save` method. */
export type UseShippingProviderSaveParams = ComposableFunctionArgs<{
  // TODO: Define this type.
  shippingMethod: any;
}>;

/** The interface provided by {@link useShippingProvider} composable. */
export interface UseShippingProviderInterface {
  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UseShippingProviderErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseShippingProviderErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Loads the shipping provider for current cart. */
  load(params?: UseShippingProviderLoadParams): Promise<SelectedShippingMethod | null>;

  /** Save new shipping provider for current cart. */
  save(params: UseShippingProviderSaveParams): Promise<SelectedShippingMethod | null>;
}
