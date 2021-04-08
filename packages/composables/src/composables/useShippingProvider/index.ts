import { Context } from '@vue-storefront/core';
import { Shipping, ShippingMethod } from '../../types';
import { useShippingProviderFactory, UseShippingProviderParams } from '../../factories/useShippingProviderFactory';
import useCart from '../useCart';
import { SelectedShippingMethod } from '../../../../api-client';

/*
interface ShippingProviderState {
    response: SelectedShippingMethod
}
*/
/* Magento Shipping Methods are "Selected_Shipping_Method & avabile shipping methods." */
const params: UseShippingProviderParams<Shipping, SelectedShippingMethod> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('[Magento] loadShippingProvider');
    if (!context.cart.cart?.value?.shipping_addresses[0].selected_shipping_method) {
      await context.cart.load({ customQuery });
    }

    /*
        return {
            ...state.value,
            response: context.cart.cart.value.shipping_addresses[0].selected_shipping_method
        };
        */

    return context.cart.cart.value.shipping_addresses[0].selected_shipping_method;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingMethod, customQuery }) => {
    console.log('[Magento] saveShippingProvider');
    const setShippingMethodsOnCartResponse = await context.$ma.api.setShippingMethodsOnCart({
      cart_id: context.cart.cart.value.id,
      shipping_methods: [{
        ...shippingMethod,
      }],
    });

    return setShippingMethodsOnCartResponse.data.cart.shipping_addresses[0].selected_shipping_method;
  },
};

export default useShippingProviderFactory<Shipping, ShippingMethod>(params);
