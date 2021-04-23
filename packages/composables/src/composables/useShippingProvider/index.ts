import { Context, Logger } from '@vue-storefront/core';
import { SelectedShippingMethod } from '@vue-storefront/magento-api';
import { useShippingProviderFactory, UseShippingProviderParams } from '../../factories/useShippingProviderFactory';
import useCart from '../useCart';

const factoryParams: UseShippingProviderParams<Shipping, SelectedShippingMethod> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShippingProvider');
    if (!context.cart.cart?.value?.shipping_addresses[0].selected_shipping_method) {
      await context.cart.load({ customQuery });
    }

    return context.cart.cart.value.shipping_addresses[0].selected_shipping_method;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingMethod, customQuery }) => {
    Logger.debug('[Magento] saveShippingProvider');
    const setShippingMethodsOnCartResponse = await context.$magento.api.setShippingMethodsOnCart({
      cart_id: context.cart.cart.value.id,
      shipping_methods: [{
        ...shippingMethod,
      }],
    });

    return setShippingMethodsOnCartResponse.data.cart.shipping_addresses[0].selected_shipping_method;
  },
};

export default useShippingProviderFactory<Shipping, ShippingMethod>(factoryParams);
