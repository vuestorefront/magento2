import { Context, Logger } from '@vue-storefront/core';
import { SelectedShippingMethod, ShippingMethod, SetShippingMethodsOnCartInput } from '@vue-storefront/magento-api';
import { useShippingProviderFactory, UseShippingProviderParams } from '../../factories/useShippingProviderFactory';
import useCart from '../useCart';

const factoryParams: UseShippingProviderParams<any, SelectedShippingMethod> = {
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

    const shippingMethodParams: SetShippingMethodsOnCartInput = {
      cart_id: context.cart.cart.value.id,
      shipping_methods: [{
        ...shippingMethod,
      }],
    };

    const { data } = await context.$magento.api.setShippingMethodsOnCart(shippingMethodParams);

    return data.setShippingMethodsOnCart.cart.shipping_addresses[0].selected_shipping_method;
  },
};

export default useShippingProviderFactory<any, ShippingMethod>(factoryParams);
