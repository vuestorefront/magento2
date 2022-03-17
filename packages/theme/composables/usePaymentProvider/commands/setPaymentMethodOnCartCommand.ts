import { AvailablePaymentMethod } from '~/modules/GraphQL/types';
import { SetPaymentMethodOnCartInputs } from '../usePaymentProvider';

export const setPaymentMethodOnCartCommand = {
  execute: async (context, paymentMethodParams: SetPaymentMethodOnCartInputs): Promise<AvailablePaymentMethod> => {
    const { data } = await context
      .$vsf
      .$magento
      .api
      .setPaymentMethodOnCart(paymentMethodParams);

    return data
      .setPaymentMethodOnCart
      .cart
      .available_payment_methods;
  },
};
