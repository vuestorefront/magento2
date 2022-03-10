import { Context } from '@vue-storefront/core';

export const clearCartCommand = {
  execute: (context: Context) => {
    context.$magento.config.state.setCartId(null);
  },
};
