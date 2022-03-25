import { Context } from '@vue-storefront/core';
import { Logger } from '~/helpers/logger';

export const loadReviewMetadataCommand = {
  execute: async (context: Context) => {
    Logger.debug('[Magento] load review metadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata();

    Logger.debug('[Result]:', { data });

    return data?.productReviewRatingsMetadata?.items ?? [];
  },
};
