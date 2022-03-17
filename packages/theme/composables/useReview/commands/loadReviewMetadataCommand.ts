import { Context, Logger } from '@vue-storefront/core';

export const loadReviewMetadataCommand = {
  execute: async (context: Context) => {
    Logger.debug('[Magento] load review metadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata();

    Logger.debug('[Result]:', { data });

    return data?.productReviewRatingsMetadata?.items ?? [];
  },
};
