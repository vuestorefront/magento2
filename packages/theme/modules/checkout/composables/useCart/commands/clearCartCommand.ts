import { VsfContext } from '~/composables/context';

export const clearCartCommand = {
  execute: (context: VsfContext) => {
    context.$magento.config.state.setCartId(null);
  },
};
