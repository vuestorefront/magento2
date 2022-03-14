import { ref, useContext } from '@nuxtjs/composition-api';
import { Context, Logger } from '@vue-storefront/core';
import { ReviewMetadata } from '@vue-storefront/magento';
import * as commands from './commands';

export const useReview = (id: string) => {
  const reviews = ref([]);
  const metadata = ref<ReviewMetadata[]>([]);
  const loading = ref(false);
  const error = ref({
    search: null,
    addReview: null,
    loadReviewMetadata: null,
    loadCustomerReviews: null,
  });

  const { app } = useContext();
  const context = app.$vsf as Context;

  const search = async (searchParams?): Promise<void> => {
    Logger.debug(`useReview/${id}/search`, searchParams);

    try {
      loading.value = true;
      reviews.value = await commands.searchReviews.execute(context, searchParams);
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
      reviews.value = await commands.loadCustomerReviews.execute(context);
      error.value.loadCustomerReviews = null;
    } catch (err) {
      error.value.loadCustomerReviews = err;
      Logger.error(`useReview/${id}/loadCustomerReviews`, err);
    } finally {
      loading.value = false;
    }
  };

  const loadReviewMetadata = async (params): Promise<void> => {
    Logger.debug(`useReview/${id}/loadReviewMetadata`);

    try {
      loading.value = true;
      metadata.value = await commands.loadReviewMetadata.execute(context);
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
      reviews.value = await commands.addReview.execute(context, params);
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
    metadata,
    reviews,
    loading,
    error,
  };
};
