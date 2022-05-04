/**
 * @deprecated since version 1.0.0
 */
import { Ref, computed } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
  PlatformApi,
} from '@vue-storefront/core';
import { UseReview, UseReviewErrors } from '../types/composables';

export interface UseReviewFactoryParams<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API extends PlatformApi = any> extends FactoryParams<API> {
  searchReviews: (context: Context, params: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>) => Promise<REVIEW>;
  addReview: (context: Context, params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>) => Promise<REVIEW>;
  loadReviewMetadata: (context: Context, params?: ComposableFunctionArgs<{}>) => Promise<REVIEW_METADATA[]>;
  loadCustomerReviews: (context: Context, params: ComposableFunctionArgs<REVIEWS_USER_SEARCH_PARAMS>) => Promise<REVIEW>;
}

export function useReviewFactory<
  REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API extends PlatformApi = any>(
  factoryParams: UseReviewFactoryParams<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API>,
) {
  return function useReview(id: string): UseReview<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEWS_USER_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA,
  API> {
    const reviews: Ref<REVIEW> = sharedRef([], `useReviews-reviews-${id}`);
    const metadatas: Ref<REVIEW_METADATA[]> = sharedRef([], `useReviews-metadata-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<UseReviewErrors> = sharedRef({
      search: null,
      addReview: null,
      loadReviewMetadata: null,
      loadCustomerReviews: null,
    }, `useReviews-error-${id}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const search = async (searchParams?: ComposableFunctionArgs<REVIEWS_SEARCH_PARAMS>): Promise<void> => {
      Logger.debug(`useReview/${id}/search`, searchParams);

      try {
        loading.value = true;
        reviews.value = await _factoryParams.searchReviews(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useReview/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    const loadCustomerReviews = async (): Promise<void> => {
      Logger.debug(`useReview/${id}/loadCustomerReviews`);

      try {
        loading.value = true;
        reviews.value = await _factoryParams.loadCustomerReviews();
        error.value.loadCustomerReviews = null;
      } catch (err) {
        error.value.loadCustomerReviews = err;
        Logger.error(`useReview/${id}/loadCustomerReviews`, err);
      } finally {
        loading.value = false;
      }
    };

    const loadReviewMetadata = async (params?: ComposableFunctionArgs<{}>): Promise<void> => {
      Logger.debug(`useReview/${id}/loadReviewMetadata`);

      try {
        loading.value = true;
        metadatas.value = await _factoryParams.loadReviewMetadata(params);
        error.value.loadReviewMetadata = null;
      } catch (err) {
        error.value.loadReviewMetadata = err;
        Logger.error(`useReview/${id}/loadReviewMetadata`, err);
      } finally {
        loading.value = false;
      }
    };

    const addReview = async (params: ComposableFunctionArgs<REVIEW_ADD_PARAMS>): Promise<void> => {
      Logger.debug(`useReview/${id}/addReview`, params);

      try {
        loading.value = true;
        reviews.value = await _factoryParams.addReview(params);
        error.value.addReview = null;
      } catch (err) {
        error.value.addReview = err;
        Logger.error(`useReview/${id}/addReview`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      addReview,
      loadReviewMetadata,
      loadCustomerReviews,
      metadata: computed(() => metadatas.value),
      reviews: computed(() => reviews.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
