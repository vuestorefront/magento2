import type { NuxtAppOptions } from '@nuxt/types';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';

export const placeOrderCommand = {
  execute: async (app: NuxtAppOptions, cartId: string): Promise<PlaceOrderOutput | null> => {
    const { data } = await app.$vsf.$magento.api.placeOrder({ cart_id: cartId });

    return data?.placeOrder ?? null;
  },
};
