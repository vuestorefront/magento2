import { ComposableFunctionArgs, CustomerProductReviewParams } from '~/composables/types';
import { VsfContext } from '~/composables/context';
import { Logger } from '~/helpers/logger';

export const loadCustomerReviewsCommand = {
  execute: async (context: VsfContext, params?: ComposableFunctionArgs<CustomerProductReviewParams>) => {
    Logger.debug('[Magento] load customer review based on:', { params });

    const { data } = await context.$magento.api.customerProductReview(params);

    Logger.debug('[Result]:', { data });

    return data?.customer ?? {};
  },
};
