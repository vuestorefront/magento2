import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';
import { ComposableFunctionArgs } from '~/composables/types';
import type { GetProductSearchParams } from '~/modules/catalog/product/types';

export const searchReviewsCommand = {
  execute: async (context: VsfContext, params?: ComposableFunctionArgs<GetProductSearchParams>) => {
    Logger.debug('[Magento] search review params input:', JSON.stringify(params, null, 2));

    const {
      customQuery,
      ...input
    } = params;

    const { data } = await context.$magento.api.productReview(
      input as GetProductSearchParams,
      params?.customQuery ?? null,
      params?.customHeaders,
    );

    Logger.debug('[Result]:', { data });

    return data?.products?.items ?? [];
  },
};
