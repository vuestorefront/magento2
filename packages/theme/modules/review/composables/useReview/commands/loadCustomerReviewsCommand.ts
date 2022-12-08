import { ComposableFunctionArgs } from '~/composables/types';
import { VsfContext } from '~/composables/context';
import { Logger } from '~/helpers/logger';

export type CustomerProductReviewParams = {
  pageSize: number;
  currentPage: number;
};

export const loadCustomerReviewsCommand = {
  execute: async (context: VsfContext, params?: ComposableFunctionArgs<CustomerProductReviewParams>) => {
    Logger.debug('[Magento] load customer review based on:', { params });

    const { data } = await context.$magento.api.customerProductReview(params, params?.customQuery ?? null, params?.customHeaders);

    Logger.debug('[Result]:', { data });

    return data?.customer ?? {};
  },
};
