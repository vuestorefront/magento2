import { PlaceOrderOutput } from '~/modules/GraphQL/types';

export const placeOrderCommand = {
  execute: async (context, cartId: string): Promise<PlaceOrderOutput> => {
    const { data } = await context.$vsf.$magento.api.placeOrder({ cart_id: cartId });

    return data.placeOrder.order;
  },
};
