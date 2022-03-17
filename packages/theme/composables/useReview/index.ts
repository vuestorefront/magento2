/* eslint-disable consistent-return */
import { ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs, Context, Logger } from '@vue-storefront/core';
import { CreateProductReviewInput } from '~/modules/GraphQL/types';
import { UseReviewErrors } from './useReview';
import { addReviewCommand } from './commands/addReviewCommand';
import { loadCustomerReviewsCommand } from './commands/loadCustomerReviewsCommand';
import { loadReviewMetadataCommand } from './commands/loadReviewMetadataCommand';
import { searchReviewsCommand } from './commands/searchReviewsCommand';
import { GetProductSearchParams } from '../useProduct/useProduct';

export const useReview = () => {
  const loading = ref(false);
  const error = ref<UseReviewErrors>({
    search: null,
    addReview: null,
    loadReviewMetadata: null,
    loadCustomerReviews: null,
  });

  const { app } = useContext();
  const context = app.$vsf as Context;

  const search = async (searchParams: ComposableFunctionArgs<GetProductSearchParams>) => {
    Logger.debug('useReview/search', searchParams);

    try {
      loading.value = true;
      error.value.search = null;
      return await searchReviewsCommand.execute(context, searchParams);
    } catch (err) {
      error.value.search = err;
      Logger.error('useReview/search', err);
    } finally {
      loading.value = false;
    }
  };

  const loadCustomerReviews = async () => {
    Logger.debug('useReview/loadCustomerReviews');

    try {
      loading.value = true;
      error.value.loadCustomerReviews = null;
      return await loadCustomerReviewsCommand.execute(context);
    } catch (err) {
      error.value.loadCustomerReviews = err;
      Logger.error('useReview/loadCustomerReviews', err);
    } finally {
      loading.value = false;
    }
  };

  const loadReviewMetadata = async () => {
    Logger.debug('useReview/loadReviewMetadata');

    try {
      loading.value = true;
      error.value.loadReviewMetadata = null;
      return await loadReviewMetadataCommand.execute(context);
    } catch (err) {
      error.value.loadReviewMetadata = err;
      Logger.error('useReview/loadReviewMetadata', err);
    } finally {
      loading.value = false;
    }
  };

  const addReview = async (params: ComposableFunctionArgs<CreateProductReviewInput>) => {
    Logger.debug('useReview/addReview', params);
    try {
      loading.value = true;
      error.value.addReview = null;
      return await addReviewCommand.execute(context, params);
    } catch (err) {
      error.value.addReview = err;
      Logger.error('useReview/addReview', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    addReview,
    loadReviewMetadata,
    loadCustomerReviews,
    loading,
    error,
  };
};

export default useReview;
