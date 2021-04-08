/* istanbul ignore file */
import {
  useReviewFactory,
  UseReview,
  UseReviewFactoryParams,
  Context,
} from '@vue-storefront/core';

const factoryParams: UseReviewFactoryParams<any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/require-await
  searchReviews: async (context: Context, params) => {
    console.log('Mocked: searchReviews');
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/require-await
  addReview: async (context: Context, params) => {
    console.log('Mocked: addReview');
    return {};
  },
};

const useReview: (cacheId: string) => UseReview<any, any, any> = useReviewFactory<any, any, any>(factoryParams);

export default useReview;
