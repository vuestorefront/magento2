import { SetShippingMethodsOnCartInput, Cart } from '~/modules/GraphQL/types';

export const setShippingMethodsOnCartCommand = {
  execute: async (context, shippingMethodParams: SetShippingMethodsOnCartInput): Promise<Cart> => {
    const { data } = await context.$vsf.$magento.api.setShippingMethodsOnCart(shippingMethodParams);

    return data.setShippingMethodsOnCart.cart as Cart;
  },
};
