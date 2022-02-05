import {
  Context,
  Logger,
  useShippingFactory,
  UseShippingParams,
} from '@absolute-web/vsf-core';
import {
  ShippingCartAddress,
  ShippingAddressInput,
  SetShippingAddressesOnCartInput,
} from '@absolute-web/magento-api';
import useCart from '../useCart';
import useGetShippingMethods from '../useGetShippingMethods';
import useShippingProvider from '../useShippingProvider';

const factoryParams: UseShippingParams<ShippingCartAddress, ShippingAddressInput> = {
  provide() {
    return {
      useGetShippingMethods: useGetShippingMethods(),
      useShippingProvider: useShippingProvider(),
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadShipping', { customQuery });

    if (!context.cart.cart?.value?.shipping_addresses) {
      await context.cart.load({ customQuery });
    }

    if (!context.cart.cart?.value) {
      throw context.cart.error.value.load ? context.cart.error.value.load : new Error('Error while loading shipping address');
    }

    return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { params }) => {
    Logger.debug('[Magento] save user shipping address', { params });

    const id = context.$magento.config.state.getCartId();

    const shippingAddressInput: SetShippingAddressesOnCartInput = {
      cart_id: id,
      shipping_addresses: [
        params
      ],
    };

    const { data } = await context
      .$magento
      .api
      .setShippingAddressesOnCart(shippingAddressInput);

    Logger.debug('[Result]:', { data });

    const shippingMethods = data
      .setShippingAddressesOnCart
      .cart
      .shipping_addresses[0]
      .available_shipping_methods;

    context.useGetShippingMethods.setMethods(shippingMethods);

    const selectedMethod = context.useShippingProvider.state.value;

    if (selectedMethod?.method_code) {
      const updatedMethod = shippingMethods.find(({ method_code }) => method_code === selectedMethod.method_code);

      context.useShippingProvider.setState(updatedMethod);
    }

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

export default useShippingFactory<ShippingCartAddress, ShippingAddressInput>(factoryParams);
