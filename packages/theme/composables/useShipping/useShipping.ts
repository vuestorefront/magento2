import { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import { ShippingCartAddress } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useShipping} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseShippingErrors {
  /** Error when loading the shipping information fails, otherwise is `null`. */
  load: Error | null;

  /** Error when saving new shipping information fails, otherwise is `null`. */
  save: Error | null;
}

/** The params received by {@link useShipping}'s `load` method. */
export type UseShippingLoadParams = ComposableFunctionArgs<{}>;

/** The params received by {@link useShipping}'s `save` method. */
export type UseShippingSaveParams = ComposableFunctionArgs<{
  params: any;
  shippingDetails: any;
}>;

/** The interface provided by {@link useShipping} composable. */
export interface UseShippingInterface {
  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UseShippingErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseShippingErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Loads the shipping information for current cart. */
  load(params: UseShippingLoadParams): Promise<ShippingCartAddress | {}>;

  /** Save new shipping information for current cart. */
  save(params: UseShippingSaveParams): Promise<ShippingCartAddress | {}>;
}
