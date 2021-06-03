import {
  Context,
  Logger,
  useShippingProviderFactory,
  UseShippingProviderParams,
} from '@absolute-web/vsf-core';
import {
  SetShippingMethodsOnCartInput, ShippingMethodInput,
} from '@absolute-web/magento-api';
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

    // workaround to save shipping method to the cart,
    // so in case load() will be called shipping method will be populated correctly
    const shippingAddresses = context.cart.cart?.value?.shipping_addresses;
    const prices = context.cart.cart?.value?.prices;

    if (shippingAddresses && shippingAddresses[0]) {
      shippingAddresses[0].selected_shipping_method = cart.shipping_addresses[0].selected_shipping_method;
    }

    // end workaround

    context.cart.setCart({
      ...cart,
      shipping_addresses: shippingAddresses,
      prices: {
        ...prices,
        ...cart.prices,
      },
    });

    return cart
      .shipping_addresses[0]
      .selected_shipping_method;
  },
};

export default useShippingProviderFactory<any, ShippingMethodInput>(factoryParams);
