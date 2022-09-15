import { CustomQuery, UseContextReturn, CustomHeaders } from '~/types/core';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';

export const getAvailablePaymentMethodsCommand = {
  execute: async (
    context: UseContextReturn,
    cartId: string,
    customQuery?: CustomQuery,
    customHeaders?: CustomHeaders,
  ): Promise<AvailablePaymentMethod[]> => {
    const { data } = await context.app.$vsf.$magento.api.getAvailablePaymentMethods({ cartId }, customQuery, customHeaders);

    return data?.cart?.available_payment_methods ?? [];
  },
};
