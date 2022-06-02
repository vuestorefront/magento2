import { Logger } from '~/helpers/logger';
import { VsfContext } from '~/composables/context';

export const loadTotalQtyCommand = {
  execute: async (context: VsfContext) => {
    Logger.debug('[Magento]: Load cart total qty');

    const apiState = context.$magento.config.state;
    if (apiState.getCartId()) {
      const { data } : any = await context.$magento.api.cartTotalQty(apiState.getCartId());

      return data?.cart?.total_quantity ?? 0;
    }

    return 0;
  },
};
