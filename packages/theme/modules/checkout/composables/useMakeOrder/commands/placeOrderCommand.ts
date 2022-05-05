import type { useContext } from '@nuxtjs/composition-api';
import type { PlaceOrderOutput } from '~/modules/GraphQL/types';

type Context = ReturnType<typeof useContext>;

export const placeOrderCommand = {
  execute: async (context: Context, cartId: string): Promise<PlaceOrderOutput | null> => {
    const { data } = await context.app.$vsf.$magento.api.placeOrder({ cart_id: cartId });

    return data?.placeOrder ?? null;
  },
};
