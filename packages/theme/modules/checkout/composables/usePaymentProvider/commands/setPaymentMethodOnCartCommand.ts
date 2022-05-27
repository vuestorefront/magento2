import { UseContextReturn } from '~/composables/types';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';
import type { PaymentMethodParams } from '../usePaymentProvider';

export const setPaymentMethodOnCartCommand = {
  execute: async (context: UseContextReturn, params: PaymentMethodParams): Promise<AvailablePaymentMethod[]> => {
    const { data } = await context.app.$vsf.$magento.api.setPaymentMethodOnCart(params);

    return data?.setPaymentMethodOnCart?.cart.available_payment_methods ?? [];
  },
};
