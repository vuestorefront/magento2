import { Context } from '@vue-storefront/core';
import { Address } from '../../types';
import { useShippingFactory, UseShippingParams } from '../../factories/useShippingFactory';
import useCart from '../useCart';

const factoryParams: UseShippingParams<Address, any> = {
  provide() {
    return {
      cart: useCart(),
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('[Magento] loadShipping');
    if (!context.cart.cart?.value?.shipping_addresses) {
      await context.cart.load({ customQuery });
    }
    return context.cart.cart.value.shipping_addresses[0];
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @TODO Check because magento is getting array and not single address.
  // @TODO check for types
  save: async (context: Context, { shippingDetails, customQuery }) => {
    console.log('[Magento] setShippingAddress');
    console.log(context);
    const { id } = context.cart.cart.value;
    const setShippingAddressesOnCartResponse = await context.$ma.api.setShippingAddressesOnCart({
      cart_id: id,
      shipping_addresses: [
        {
          address: {

            /*
            firstname: "Bob",
            lastname: "Roll",
            company: "Magento",
            street: ["Magento Pkwy", "Main Street"],
            city: "Austin",
            region: "TX",
            postcode: "78758",
            country_code: "US",
            telephone: "8675309",
            save_in_address_book: false
            */
            ...shippingDetails,
          },
        },
      ],
    });
    return setShippingAddressesOnCartResponse.data.setShippingAddressesOnCart.cart.shipping_addresses[0];
  },
};

export default useShippingFactory<Address, any>(factoryParams);
