import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type {
  Maybe,
  CustomerOrders,
  CustomerOrdersQueryVariables,
} from '~/modules/GraphQL/types';

/**
 * Errors that occured in the `useUserOrder` composable
 */
export interface UseUserOrderErrors {
  search: Error | null;
}

/**
 * Parameters accepted by the `search` method in the `useUserOrder` composable
 */
export type UseUserOrderSearchParams = ComposableFunctionArgs<CustomerOrdersQueryVariables>;

/**
 * Data and methods returned from the {@link useUserOrder|useUserOrder()} composable
 */
export interface UseUserOrderInterface {
  /**
   * Fetches orders of the current customer
   */
  search(params: UseUserOrderSearchParams) : Promise<Maybe<CustomerOrders>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: Readonly<Ref<UseUserOrderErrors>>;
}
