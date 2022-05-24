import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';

/**
 * The {@link useMakeOrder} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseMakeOrderErrors {
  /** Error when making an order fails, otherwise is `null`. */
  make: Error | null;
}

/** The interface provided by {@link useMakeOrder} composable. */
export interface UseMakeOrderInterface {
  /** Makes an order with current cart. */
  make(): Promise<PlaceOrderOutput | null>;

  /**
   * Contains errors from any of the composable methods.
   *
   * Read {@link UseMakeOrderErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseMakeOrderErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
