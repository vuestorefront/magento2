import {
  Context,
  Logger,
  useShippingProviderFactory,
  UseShippingProviderParams,
} from '@vue-storefront/core';
import {
  SetShippingMethodsOnCartInput,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';

const factoryParams: UseShippingProviderParams<any, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShippingProvider');

    if (!context.cart.cart?.value?.shipping_addresses[0]?.selected_shipping_method) {
      await context.cart.load({ customQuery });
    }

    return context
      .cart
      .cart
      .value?.shipping_addresses[0]?.selected_shipping_method;
  },

  save: async (context: Context, { shippingMethod }) => {
    Logger.debug('[Magento] saveShippingProvider');

    const shippingMethodParams: SetShippingMethodsOnCartInput = {
      cart_id: context.cart.cart.value.id,
      shipping_methods: [{
        ...shippingMethod,
      }],
    };

    const { data } = await context.$magento.api.setShippingMethodsOnCart(shippingMethodParams);

    return data
      .setShippingMethodsOnCart
      .cart
      .shipping_addresses[0]
      .selected_shipping_method;
  },
};

export default useShippingProviderFactory<any, any>(factoryParams);
