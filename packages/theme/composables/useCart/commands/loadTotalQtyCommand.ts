import { Context, Logger } from '@vue-storefront/core';

export const loadTotalQtyCommand = {
  execute: async (    context: Context  ) => {
    Logger.debug('[Magento]: Load cart total qty');

    const apiState = context.$magento.config.state;
    if (apiState.getCartId()) {
      const { data } : any = await context.$magento.api.cartTotalQty(apiState.getCartId());

      return data?.cart?.total_quantity ?? 0;
    }

    return 0;
  },
};
