import type { useContext } from '@nuxtjs/composition-api';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';

type Context = ReturnType<typeof useContext>;

export const getAvailablePaymentMethodsCommand = {
  execute: async (context: Context, cartId: string): Promise<AvailablePaymentMethod[]> => {
    const { data } = await context.app.$vsf.$magento.api.getAvailablePaymentMethods({ cartId });

    return data?.cart?.available_payment_methods ?? [];
  },
};
