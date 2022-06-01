import { UseContextReturn } from '~/types/core';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';

export const placeOrderCommand = {
  execute: async (context: UseContextReturn, cartId: string): Promise<PlaceOrderOutput | null> => {
    const { data } = await context.app.$vsf.$magento.api.placeOrder({ cart_id: cartId });

    return data?.placeOrder ?? null;
  },
};
