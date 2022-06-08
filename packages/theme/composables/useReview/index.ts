/* eslint-disable consistent-return */
import { readonly, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { addReviewCommand } from './commands/addReviewCommand';
import { loadCustomerReviewsCommand } from './commands/loadCustomerReviewsCommand';
import { loadReviewMetadataCommand } from './commands/loadReviewMetadataCommand';
import { searchReviewsCommand } from './commands/searchReviewsCommand';
import type {
  UseReviewErrors,
  UseReviewInterface,
  UseReviewSearchParams,
  UseReviewAddReviewParams,
} from './useReview';
import { ComposableFunctionArgs } from '~/composables';

/**
 * Allows loading and adding product reviews.
 *
 * See the {@link UseReviewInterface} for a list of methods and values available in this composable.
 */
export function useReview(): UseReviewInterface {
  const loading = ref(false);
  const error = ref<UseReviewErrors>({
    search: null,
    addReview: null,
    loadReviewMetadata: null,
    loadCustomerReviews: null,
  });

  const { app } = useContext();
  const context = app.$vsf;

  const search = async (searchParams: UseReviewSearchParams) => {
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

  const loadReviewMetadata = async (params?: ComposableFunctionArgs<{}>) => {
    Logger.debug('useReview/loadReviewMetadata');

    try {
      loading.value = true;
      error.value.loadReviewMetadata = null;
      return await loadReviewMetadataCommand.execute(context, params);
    } catch (err) {
      error.value.loadReviewMetadata = err;
      Logger.error('useReview/loadReviewMetadata', err);
    } finally {
      loading.value = false;
    }
  };

  const addReview = async (params: UseReviewAddReviewParams) => {
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
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useReview;
export * from './useReview';
