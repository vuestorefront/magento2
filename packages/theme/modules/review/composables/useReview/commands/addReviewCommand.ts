import { VsfContext } from '~/composables/context';
import { Logger } from '~/helpers/logger';
import { CreateProductReviewInput } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables/types';

export const addReviewCommand = {
  execute: async (context: VsfContext, params: ComposableFunctionArgs<CreateProductReviewInput>) => {
    Logger.debug('[Magento] add review params input:', JSON.stringify(params, null, 2));

    const {
      customQuery,
      ...input
    } = params;

    const { data } = await context.$magento.api.createProductReview(input, params?.customQuery ?? null, params?.customHeaders);

    Logger.debug('[Result]:', { data });

    return data?.createProductReview?.review ?? {};
  },
};
