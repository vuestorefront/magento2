/* istanbul ignore file */
import {
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  GetProductSearchParams,
  ProductReviewRatingMetadata,
  CreateProductReviewInput,
} from '@vue-storefront/magento-api';
import { useReviewFactory, UseReviewFactoryParams } from '../../factories/useReviewFactory';

const factoryParams: UseReviewFactoryParams<any,
GetProductSearchParams,
CreateProductReviewInput,
ProductReviewRatingMetadata> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params: GetProductSearchParams) => {
    Logger.debug('[Magento] searchReviews');
    Logger.debug('[Magento] search review params input:');
    Logger.debug(JSON.stringify(params, null, 2));

    const { data } = await context.$magento.api.productReview(params as GetProductSearchParams);

    return data.products.items;
  },
  addReview: async (context: Context, params: CreateProductReviewInput) => {
    Logger.debug('[Magento] addReview');
    Logger.debug('[Magento] review params input:');
    Logger.debug(JSON.stringify(params, null, 2));

    const { data } = await context.$magento.api.createProductReview(params);

    return data.createProductReview.review;
  },
  loadReviewMetadata: async (context: Context) => {
    Logger.debug('[Magento] loadReviewMetadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata();

    return data.productReviewRatingsMetadata.items;
  },
};

export default useReviewFactory<any,
GetProductSearchParams,
CreateProductReviewInput,
ProductReviewRatingMetadata>(factoryParams);
