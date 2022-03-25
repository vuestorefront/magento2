import { ComposableFunctionArgs, Context } from '@vue-storefront/core';
import { Logger } from '~/helpers/logger';
import { CustomerProductReviewParams } from '~/composables/types';

export const loadCustomerReviewsCommand = {
  execute: async (context: Context, params?: ComposableFunctionArgs<CustomerProductReviewParams>) => {
    Logger.debug('[Magento] load customer review based on:', { params });

    const { data } = await context.$magento.api.customerProductReview(params);

    Logger.debug('[Result]:', { data });

    return data?.customer ?? {};
  },
};
