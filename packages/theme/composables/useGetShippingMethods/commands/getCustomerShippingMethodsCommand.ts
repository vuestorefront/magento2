import { Context } from '@vue-storefront/core';
import { AvailableShippingMethod } from '~/modules/GraphQL/types';

export const getCustomerShippingMethodsCommand = {
  execute: async (context: Context): Promise<AvailableShippingMethod[]> => {
    const { data } = await context.$vsf.$magento.api.getAvailableCustomerShippingMethods();
    const hasAddresses = data.cart.shipping_addresses.length > 0;

    return hasAddresses ? data?.cart?.shipping_addresses[0]?.available_shipping_methods : [];
  },
};
