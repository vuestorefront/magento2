/* istanbul ignore file */
import {
  Context,
  Logger,
  useReviewFactory,
  UseReviewFactoryParams,
} from '@vue-storefront/core';
import {
  GetProductSearchParams,
  CreateProductReviewMutationVariables,
} from '@vue-storefront/magento-api';

const factoryParams: UseReviewFactoryParams<any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params: GetProductSearchParams) => {
    Logger.debug('[Magento] searchReviews');

    const { data } = await context.$magento.api.productReview(params as GetProductSearchParams);

    return data.products.items;
  },
  addReview: async (context: Context, params: CreateProductReviewMutationVariables) => {
    Logger.debug('[Magento] addReview');
    Logger.debug('[Magento] review params input:');
    Logger.debug(JSON.stringify(params, null, 2));

    const { data } = await context.$magento.createProductReview(params);

    return data.createProductReview.review;
  },
};

export default useReviewFactory<any, any, any>(factoryParams);
