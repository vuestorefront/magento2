import { UseContextReturn } from '~/types/core';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';

export const getAvailablePaymentMethodsCommand = {
  execute: async (context: UseContextReturn, cartId: string): Promise<AvailablePaymentMethod[]> => {
    const { data } = await context.app.$vsf.$magento.api.getAvailablePaymentMethods({ cartId });

    return data?.cart?.available_payment_methods ?? [];
  },
};
