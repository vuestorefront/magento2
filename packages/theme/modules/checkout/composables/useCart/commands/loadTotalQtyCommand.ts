import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';
import { ComposableFunctionArgs } from '~/composables';

export const loadTotalQtyCommand = {
  execute: async (context: VsfContext, params?: ComposableFunctionArgs<{}>) => {
    Logger.debug('[Magento]: Load cart total qty');

    const apiState = context.$magento.config.state;
    if (apiState.getCartId()) {
      const { data } : any = await context.$magento.api.cartTotalQty(
        apiState.getCartId(),
        params?.customQuery ?? null,
        params?.customHeaders ?? null,
      );

      return data?.cart?.total_quantity ?? 0;
    }

    return 0;
  },
};
