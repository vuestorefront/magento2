import { Context, Logger } from '@vue-storefront/core';
import { GetProductSearchParams } from '~/composables/useProduct/useProduct';

export const searchReviewsCommand = {
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
