import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';


export const loadReviewMetadataCommand = {
  execute: async (context: VsfContext) => {
    Logger.debug('[Magento] load review metadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata();

    Logger.debug('[Result]:', { data });

    return data?.productReviewRatingsMetadata?.items ?? [];
  },
};
