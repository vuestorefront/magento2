/* istanbul ignore file */
import {
  ComposableFunctionArgs,
  Context,
  Logger,
} from '@vue-storefront/core';
import {
  GetProductSearchParams,
  ProductReviewRatingMetadata,
  CreateProductReviewInput,
  CustomerProductReviewParams,
} from '@vue-storefront/magento-api';
import { useReviewFactory, UseReviewFactoryParams } from '../../factories/useReviewFactory';

const factoryParams: UseReviewFactoryParams<any,
ComposableFunctionArgs<GetProductSearchParams>,
ComposableFunctionArgs<CustomerProductReviewParams>,
CreateProductReviewInput,
ProductReviewRatingMetadata> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchReviews: async (context: Context, params?: ComposableFunctionArgs<GetProductSearchParams>) => {
    Logger.debug('[Magento] search review params input:', JSON.stringify(params, null, 2));

    const { data } = await context.$magento.api.productReview(params as GetProductSearchParams);

    Logger.debug('[Result]:', { data });

    return data.products.items;
  },
  addReview: async (context: Context, params: CreateProductReviewInput) => {
    Logger.debug('[Magento] add review params input:', JSON.stringify(params, null, 2));

    const { data } = await context.$magento.api.createProductReview(params);

    Logger.debug('[Result]:', { data });

    return data.createProductReview.review;
  },
  loadReviewMetadata: async (context: Context) => {
    Logger.debug('[Magento] load review metadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata();

    Logger.debug('[Result]:', { data });

    return data.productReviewRatingsMetadata.items;
  },
  loadCustomerReviews: async (
    context: Context,
    params?: ComposableFunctionArgs<CustomerProductReviewParams>,
  ) => {
    Logger.debug('[Magento] load customer review based on:', { params });

    const { data } = await context.$magento.api.customerProductReview(params);

    Logger.debug('[Result]:', { data });

    return data.customer;
  },
};

export default useReviewFactory<any,
ComposableFunctionArgs<GetProductSearchParams>,
ComposableFunctionArgs<CustomerProductReviewParams>,
CreateProductReviewInput,
ProductReviewRatingMetadata>(factoryParams);
