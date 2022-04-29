import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type {
  Maybe,
  CustomerOrdersQuery,
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
 * Represents the data returned from and functions available in the `useUserOrder()` composable
 */
export interface UseUserOrderInterface {
  /**
   * Fetches orders of the current customer
   */
  search(params: UseUserOrderSearchParams) : Promise<Maybe<Array<CustomerOrdersQuery['customer']['orders']['items']>>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: DeepReadonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseUserOrderErrors>>;
}
