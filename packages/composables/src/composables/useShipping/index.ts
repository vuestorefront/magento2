import {
  Context,
  Logger,
  useShippingFactory,
  UseShippingParams,
} from '@absolute-web/vsf-core';
import {
  SetShippingAddressesOnCartInput,
} from '@absolute-web/magento-api';
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
  save: async (context: Context, params) => {
    Logger.debug('[Magento] save user shipping address', { params });

    const { id } = context.cart.cart.value;

    const {
      apartment,
      neighborhood,
      extra,
      customerAddressId,
      ...address
    } = params.shippingDetails;

    const street = [address.street];

    if (apartment) street.push(apartment);

    if (neighborhood) street.push(neighborhood);

    if (extra) street.push(extra);

    const shippingData = customerAddressId
      ? ({
        customer_address_id: customerAddressId,
      })
      : ({
        address: {
          ...address,
          street,
        },
      });

    const shippingAddressInput: SetShippingAddressesOnCartInput = {
      cart_id: id,
      shipping_addresses: [
        {
          ...shippingData,
        },
      ],
    };

    const { data } = await context
      .$magento
      .api
      .setShippingAddressesOnCart(shippingAddressInput);

    Logger.debug('[Result]:', { data });

    context.useGetShippingMethods.setState(data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0]
      .available_shipping_methods);

    // workaround to save shipping address and totals to the cart,
    // so in case load() will be called shipping address will be populated correctly
    const prices = context.cart.cart?.value?.prices;

    context.cart.setCart({
      ...context.cart.cart.value,
      shipping_addresses: data.setShippingAddressesOnCart.cart.shipping_addresses,
      prices: {
        ...prices,
        ...data.setShippingAddressesOnCart.cart.prices
      },
    });

    return data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0];
  },
};

export default useShippingFactory<any, any>(factoryParams);
