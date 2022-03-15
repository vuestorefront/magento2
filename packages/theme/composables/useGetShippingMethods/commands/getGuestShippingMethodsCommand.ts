import { Context } from '@vue-storefront/magento-api';

import {
  ComposableFunctionArgs,
  AvailableShippingMethod,
} from '~/composables/types';

export const getGuestShippingMethodsCommand = {
  execute: async (context: Context, params: ComposableFunctionArgs<{ cartId: string }>): Promise<AvailableShippingMethod[]> => {
    const { data } = await context.$vsf.$magento.api.getAvailableShippingMethods({ cartId: params.cartId });
    const hasAddresses = data.cart.shipping_addresses.length > 0;

    return hasAddresses ? data?.cart?.shipping_addresses[0]?.available_shipping_methods : [];
  },
};
