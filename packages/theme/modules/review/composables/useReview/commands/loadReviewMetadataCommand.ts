import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';
import { ComposableFunctionArgs } from '~/composables';

export const loadReviewMetadataCommand = {
  execute: async (context: VsfContext, params?: ComposableFunctionArgs<{}>) => {
    Logger.debug('[Magento] load review metadata');

    const { data } = await context.$magento.api.productReviewRatingsMetadata(params?.customQuery ?? null, params?.customHeaders);

    Logger.debug('[Result]:', { data });

    return data?.productReviewRatingsMetadata?.items ?? [];
  },
};
