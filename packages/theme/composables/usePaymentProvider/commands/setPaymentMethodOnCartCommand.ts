import { AvailablePaymentMethod } from '~/modules/GraphQL/types';
import type { PaymentMethodParams } from '../usePaymentProvider';

export const setPaymentMethodOnCartCommand = {
  execute: async (context, paymentMethodParams: PaymentMethodParams): Promise<AvailablePaymentMethod> => {
    const { data } = await context.$vsf.$magento.api.setPaymentMethodOnCart(paymentMethodParams);

    return data.setPaymentMethodOnCart.cart.available_payment_methods;
  },
};
