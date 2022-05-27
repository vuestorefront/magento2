import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { RelatedProductQuery } from '~/modules/GraphQL/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

export type RelatedProduct = RelatedProductQuery['products']['items'][number]['related_products'];

/**
 * The {@link useRelatedProducts} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UseRelatedProductsErrors {
  /** Error when searching for related products fails, otherwise is `null`. */
  search: Error | null;
}

/** The params received by {@link useRelatedProducts}'s `search` method. */
export type UseRelatedProductsSearchParams = ComposableFunctionArgs<GetProductSearchParams>;

/**
 * Data and methods returned from the {@link useRelatedProducts} composable.
 */
export interface UseRelatedProductsInterface {
  /**
   * Contains errors from any of the composable methods.
   *
   * @see {@link UseRelatedProductsErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseRelatedProductsErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /**
   * Searches for the related products with params for sort, filter and
   * pagination.
   */
  search(params: UseRelatedProductsSearchParams): Promise<RelatedProduct[]>;
}
