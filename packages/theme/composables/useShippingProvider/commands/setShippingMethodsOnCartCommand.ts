import { Cart, Context } from '@vue-storefront/magento-api';
import { SetShippingMethodsOnCartInput } from '~/modules/GraphQL/types';

export const setShippingMethodsOnCartCommand = {
  execute: async (context: Context, shippingMethodParams: SetShippingMethodsOnCartInput): Promise<Cart> => {
    const { data } = await context.$vsf.$magento.api.setShippingMethodsOnCart(shippingMethodParams);

    return data.setShippingMethodsOnCart.cart as Cart;
  },
};
