import { UseContextReturn } from '~/types/core';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';
import type { PaymentMethodParams } from '../usePaymentProvider';

export const setPaymentMethodOnCartCommand = {
  execute: async (context: UseContextReturn, params: PaymentMethodParams): Promise<AvailablePaymentMethod[]> => {
    const { data } = await context.app.$vsf.$magento.api.setPaymentMethodOnCart(params, params?.customQuery ?? null, params?.customHeaders);

    return data?.setPaymentMethodOnCart?.cart.available_payment_methods ?? [];
  },
};
