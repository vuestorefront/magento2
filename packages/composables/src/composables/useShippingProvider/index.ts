/**
 * @deprecated since version 1.0.0
 */

import {
  Context,
  Logger,
  useShippingProviderFactory,
  UseShippingProviderParams,
} from '@vue-storefront/core';
import {
  SetShippingMethodsOnCartInput, ShippingMethodInput,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';

const factoryParams: UseShippingProviderParams<any, ShippingMethodInput> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShippingProvider', { customQuery });

    if (!context.cart.cart?.value?.shipping_addresses[0]?.selected_shipping_method) {
      await context.cart.load({ customQuery });
    }

    return context
      .cart
      .cart
      .value?.shipping_addresses[0]?.selected_shipping_method;
  },

  save: async (context: Context, params) => {
    Logger.debug('[Magento] saveShippingProvider', { params });

    const shippingMethodParams: SetShippingMethodsOnCartInput = {
      cart_id: context.cart.cart.value.id,
      shipping_methods: [{
        ...params.shippingMethod,
      }],
    };

    const { data } = await context.$magento.api.setShippingMethodsOnCart(shippingMethodParams);

    Logger.debug('[Result]:', { data });

    const { cart } = data
      .setShippingMethodsOnCart;

    context.cart.setCart(cart);

    return cart
      .shipping_addresses[0]
      .selected_shipping_method;
  },
};

export default useShippingProviderFactory<any, ShippingMethodInput>(factoryParams);
