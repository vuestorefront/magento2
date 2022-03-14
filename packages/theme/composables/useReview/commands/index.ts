import { Context, Logger } from '@vue-storefront/core';
import { GetProductSearchParams } from '~/composables/useProduct/useProduct';

export const searchReviews = {
  execute: async (context: Context, params?) => {
    Logger.debug('[Magento] search review params input:', JSON.stringify(params, null, 2));
    const {
      customQuery,
      ...input
    } = params;
    const { data } = await context.$magento.api.productReview(input as GetProductSearchParams);
    Logger.debug('[Result]:', { data });
    return data?.products?.items ?? [];
  },
};
export const addReview = {
  execute: async (context: Context, params) => {
    Logger.debug('[Magento] add review params input:', JSON.stringify(params, null, 2));
    const {
      customQuery,
      ...input
    } = params;

    const { data } = await context.$magento.api.createProductReview(input);

    Logger.debug('[Result]:', { data });

    return data?.createProductReview?.review ?? {};
  },
};

export const loadReviewMetadata = {
  execute:
  async (context: Context) => {
    Logger.debug('[Magento] load review metadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata();

    Logger.debug('[Result]:', { data });

    return data?.productReviewRatingsMetadata?.items ?? [];
  },
};

export const loadCustomerReviews = {
  execute: async (context: Context, params?) => {
    Logger.debug('[Magento] load customer review based on:', { params });
    const { data } = await context.$magento.api.customerProductReview(params);

    Logger.debug('[Result]:', { data });

    return data?.customer ?? {};
  },
};
