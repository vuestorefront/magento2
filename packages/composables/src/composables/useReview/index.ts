/* istanbul ignore file */
import {
  Context, Logger,
  UseReview,
  useReviewFactory,
  UseReviewFactoryParams,
} from '@vue-storefront/core';

const factoryParams: UseReviewFactoryParams<any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params) => {
    Logger.debug('Mocked: searchReviews');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    Logger.debug('Mocked: addReview');
    return {};
  },
};

const useReview: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>(factoryParams);

export default useReview;
