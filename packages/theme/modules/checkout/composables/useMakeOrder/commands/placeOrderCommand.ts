import { UseContextReturn } from '~/types/core';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';
import { ComposableFunctionArgs } from '~/composables';

export const placeOrderCommand = {
  execute: async (context: UseContextReturn, cartId: string, params?: ComposableFunctionArgs<{}>): Promise<PlaceOrderOutput | null> => {
    const { data } = await context.app.$vsf.$magento.api.placeOrder(
      { cart_id: cartId },
      params?.customQuery ?? null,
      params?.customHeaders,
    );

    return data?.placeOrder ?? null;
  },
};
