import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { Maybe, UpsellProductsQuery } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

/**
 * Errors that occured in the `useUpsellProducts` composable
 */
export interface UseUpsellProductsError {
  search: Error | null;
}

export type UpsellProducts = UpsellProductsQuery['products']['items'][0]['upsell_products'];

/**
 * Parameters accepted by the `search` method in the `useUpsellProducts` composable
 */
export type UseUpsellProductsSearchParams = ComposableFunctionArgs<GetProductSearchParams>;

/**
 * Data and methods returned from the {@link useUpsellProducts|useUpsellProducts()} composable
 */
export interface UseUpsellProductsInterface {
  /**
   * Fetches upsell products matching the provided parameters
   */
  search(params?: UseUpsellProductsSearchParams): Promise<Maybe<UpsellProducts[]>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseUpsellProductsError>>;
}
