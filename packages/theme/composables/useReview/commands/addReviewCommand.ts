import { Context, Logger } from '@vue-storefront/core';

export const addReviewCommand = {
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
