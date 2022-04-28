import type { Ref, DeepReadonly } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

import type {
  CreateProductReviewInput,
  ProductReviewQuery,
  CustomerProductReviewQuery,
  CreateProductReviewMutation,
  ProductReviewRatingsMetadataQuery,
} from '~/modules/GraphQL/types';

/**
 * Errors that occured in the `useReview` composable
 */
export interface UseReviewErrors {
  search: Error;
  addReview: Error;
  loadReviewMetadata: Error;
  loadCustomerReviews: Error;
}

/**
 * Parameters accepted by the `search` method in the `useReview` composable
 */
export type UseReviewSearchParams = ComposableFunctionArgs<GetProductSearchParams>;

/**
 * Parameters accepted by the `addReview` method in the `useReview` composable
 */
export type UseReviewAddReviewParams = ComposableFunctionArgs<CreateProductReviewInput>;

/**
 * Represents the data returned from and functions available in the `useReview()` composable.
 */
export interface UseReviewInterface {
  /**
   * Fetches reviews for the product matching the provided filters
   */
  search(params: UseReviewSearchParams): Promise<ProductReviewQuery['products']['items'] | []>;

  /**
   * Fetches product reviews created by the current customer
   */
  loadCustomerReviews(): Promise<CustomerProductReviewQuery['customer'] | {}>;

  /**
   * Fetches additional product reviews data
   */
  loadReviewMetadata(): Promise<ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'] | []>;

  /**
   * Submits a new product review
   */
  addReview(params: UseReviewAddReviewParams): Promise<CreateProductReviewMutation['createProductReview']['review'] | {}>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: DeepReadonly<Ref<UseReviewErrors>>;
}
