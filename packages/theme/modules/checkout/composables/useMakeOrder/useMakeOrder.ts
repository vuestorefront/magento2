import type { Ref } from '@nuxtjs/composition-api';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables';

/**
 * The {@link useMakeOrder} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseMakeOrderErrors {
  /** Error when making an order fails, otherwise is `null`. */
  make: Error | null;
}

/**
 * Data and methods returned from the {@link useRelatedProducts} composable.
 */
export interface UseMakeOrderInterface {
  /** Makes an order with current cart. */
  make(params?: ComposableFunctionArgs<{}>): Promise<PlaceOrderOutput | null>;

  /**
   * Contains errors from any of the composable methods.
   *
   * Read {@link UseMakeOrderErrors} documentation for more details.
   */
  error: Readonly<Ref<UseMakeOrderErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
