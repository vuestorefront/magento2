import {
  Context,
  Logger,
  useShippingFactory,
  UseShippingParams,
} from '@vue-storefront/core';
import {
  SetShippingAddressesOnCartInput,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';

const factoryParams: UseShippingParams<any, any> = {
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
  save: async (context: Context, saveParams) => {
    Logger.debug('[Magento] setShippingAddress');
    Logger.debug(context);

    const { id } = context.cart.cart.value;
    const {
      apartment,
      ...address
    } = saveParams.shippingDetails;

    const shippingAddressInput: SetShippingAddressesOnCartInput = {
      cart_id: id,
      shipping_addresses: [
        {
          address: {
            ...address,
            street: [address.street, apartment],
          },
        },
      ],
    };

    const setShippingAddressesOnCartResponse = await context
      .$magento
      .api
      .setShippingAddressesOnCart(shippingAddressInput);

    return setShippingAddressesOnCartResponse
      .data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0];
  },
};

export default useShippingFactory<any, any>(factoryParams);
