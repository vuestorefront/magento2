import { ComposableFunctionArgs, Context, Logger } from '@vue-storefront/core';
import { CustomerProductReviewParams } from '@vue-storefront/magento-api';

export const loadCustomerReviewsCommand = {
  execute: async (context: Context, params?: ComposableFunctionArgs<CustomerProductReviewParams>) => {
    Logger.debug('[Magento] load customer review based on:', { params });

    const { data } = await context.$magento.api.customerProductReview(params);

    Logger.debug('[Result]:', { data });

    return data?.customer ?? {};
  },
};
