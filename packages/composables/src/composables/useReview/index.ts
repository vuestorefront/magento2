/* istanbul ignore file */
import {
  Context,
  Logger,
  useReviewFactory,
  UseReviewFactoryParams,
} from '@vue-storefront/core';
import { GetProductSearchParams } from '@vue-storefront/magento-api';

const factoryParams: UseReviewFactoryParams<any, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params: GetProductSearchParams) => {
    Logger.debug('[Magento] searchReviews');

    const { data } = await context.$magento.api.productReview(params as GetProductSearchParams);

    Logger.debug(JSON.stringify(data, null, 2));

    return data.products.items;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addReview: async (context: Context, params) => {
    Logger.debug('Mocked: addReview');
    return {};
  },
};

export default useReviewFactory<any, any, any>(factoryParams);
