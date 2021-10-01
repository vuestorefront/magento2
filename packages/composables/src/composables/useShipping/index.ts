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
import useGetShippingMethods from '../useGetShippingMethods';

const factoryParams: UseShippingParams<any, any> = {
  provide() {
    return {
      useGetShippingMethods: useGetShippingMethods(),
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShipping', { customQuery });

    if (!context.cart.cart?.value?.shipping_addresses) {
      await context.cart.load({ customQuery });
    }

    return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, saveParams) => {
    Logger.debug('[Magento] save user shipping address', { saveParams });

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

    const { data } = await context
      .$magento
      .api
      .setShippingAddressesOnCart(shippingAddressInput);

    Logger.debug('[Result]:', JSON.stringify(data, null, 2));

    context.useGetShippingMethods.setState(data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0]
      .available_shipping_methods);

    return data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0];
  },
};

export default useShippingFactory<any, any>(factoryParams);
