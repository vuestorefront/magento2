import type { Ref } from '@nuxtjs/composition-api';
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
 * Errors that occured in the {@link useReview|useReview()} composable
 */
export interface UseReviewErrors {
  /**
   * Contains error if `search` method failed, otherwise is `null`
   */
  search: Error;

  /**
   * Contains error if `addReview` method failed, otherwise is `null`
   */
  addReview: Error;

  /**
   * Contains error if `loadReviewMetadata` method failed, otherwise is `null`
   */
  loadReviewMetadata: Error;

  /**
   * Contains error if `loadCustomerReviews` method failed, otherwise is `null`
   */
  loadCustomerReviews: Error;
}

/**
 * The params object accepted by the `search` method in the {@link useReview|useReview()} composable
 */
export type UseReviewSearchParams = ComposableFunctionArgs<GetProductSearchParams>;

/**
 * The params object accepted by the `addReview` method in the {@link useReview|useReview()} composable
 */
export type UseReviewAddReviewParams = ComposableFunctionArgs<CreateProductReviewInput>;

/**
 * Data and methods returned from the {@link useCountrySearch|useCountrySearch()} composable
 */
export interface UseReviewInterface {
  /**
   * Fetches reviews for the product matching the provided filters
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#productReview} API endpoint
   * and accepts the custom queries named `productReview`.
   */
  search(params: UseReviewSearchParams): Promise<ProductReviewQuery['products']['items'] | []>;

  /**
   * Fetches product reviews created by the current customer
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#customerProductReview} API endpoint
   * and accepts the custom queries named `reviews`.
   */
  loadCustomerReviews(): Promise<CustomerProductReviewQuery['customer'] | {}>;

  /**
   * Fetches additional product reviews data
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#productReviewRatingsMetadata} API endpoint
   * and accepts the custom queries named `productReviewRatingsMetadata`.
   */
  loadReviewMetadata(params?: ComposableFunctionArgs<{}>): Promise<ProductReviewRatingsMetadataQuery['productReviewRatingsMetadata']['items'] | []>;

  /**
   * Submits a new product review
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#createProductReview} API endpoint
   * and accepts the custom queries named `createProductReview`.
   */
  addReview(params: UseReviewAddReviewParams): Promise<CreateProductReviewMutation['createProductReview']['review'] | {}>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from any of the composable methods
   */
  error: Readonly<Ref<UseReviewErrors>>;
}
