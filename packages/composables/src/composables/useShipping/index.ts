import { Context, Logger } from '@vue-storefront/core';
import { AddressOnCart } from '@vue-storefront/magento-api';
import { useShippingFactory, UseShippingParams } from '../../factories/useShippingFactory';
import useCart from '../useCart';

const factoryParams: UseShippingParams<AddressOnCart, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShipping');
    if (!context.cart.cart?.value?.shipping_addresses) {
      await context.cart.load({ customQuery });
    }
    return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    Logger.debug('[Magento] setShippingAddress');
    Logger.debug(context);
    const { id } = context.cart.cart.value;
    const setShippingAddressesOnCartResponse = await context.$magento.api.setShippingAddressesOnCart({
      cart_id: id,
      shipping_addresses: [
        {
          address: {
            ...shippingDetails,
          },
        },
      ],
    });

    return setShippingAddressesOnCartResponse.data.setShippingAddressesOnCart.cart.shipping_addresses[0];
  },
};

export default useShippingFactory<AddressOnCart, any>(factoryParams);
