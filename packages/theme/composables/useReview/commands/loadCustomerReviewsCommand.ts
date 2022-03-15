import { Context, Logger } from '@vue-storefront/core';

export const loadCustomerReviewsCommand = {
  execute: async (context: Context, params?) => {
    Logger.debug('[Magento] load customer review based on:', { params });
    const { data } = await context.$magento.api.customerProductReview(params);

    Logger.debug('[Result]:', { data });

    return data?.customer ?? {};
  },
};
