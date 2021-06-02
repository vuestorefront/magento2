import { Ref, computed } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  CustomQuery,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseReview, UseReviewErrors } from '../types/composeables';

export interface UseReviewFactoryParams<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, REVIEW_METADATA> extends FactoryParams {
  searchReviews: (context: Context, params: REVIEWS_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<REVIEW>;
  addReview: (context: Context, params: REVIEW_ADD_PARAMS & { customQuery?: CustomQuery }) => Promise<REVIEW>;
  loadReviewMetadata: (context: Context) => Promise<REVIEW_METADATA[]>;
}

export function useReviewFactory<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA>(
  factoryParams: UseReviewFactoryParams<REVIEW,
  REVIEWS_SEARCH_PARAMS,
  REVIEW_ADD_PARAMS,
  REVIEW_METADATA>,
) {
  return function useReview(id: string): UseReview<REVIEW, REVIEWS_SEARCH_PARAMS, REVIEW_ADD_PARAMS, REVIEW_METADATA> {
    const reviews: Ref<REVIEW> = sharedRef([], `useReviews-reviews-${id}`);
    const metadatas: Ref<REVIEW_METADATA[]> = sharedRef([], `useReviews-metadata-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useReviews-loading-${id}`);
    const error: Ref<UseReviewErrors> = sharedRef({
      search: null,
      addReview: null,
      loadReviewMetadata: null,
    }, `useReviews-error-${id}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const search = async (searchParams): Promise<void> => {
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

    const loadReviewMetadata = async (): Promise<void> => {
      Logger.debug(`useReview/${id}/loadReviewMetadata`);

      try {
        loading.value = true;
        metadatas.value = await _factoryParams.loadReviewMetadata();
        error.value.loadReviewMetadata = null;
      } catch (err) {
        error.value.loadReviewMetadata = err;
        Logger.error(`useReview/${id}/loadReviewMetadata`, err);
      } finally {
        loading.value = false;
      }
    };

    const addReview = async (params): Promise<void> => {
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
      metadata: computed(() => metadatas.value),
      reviews: computed(() => reviews.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
