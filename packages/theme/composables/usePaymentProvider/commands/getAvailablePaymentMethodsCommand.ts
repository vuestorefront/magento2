import { AvailablePaymentMethod } from '~/modules/GraphQL/types';

export const getAvailablePaymentMethodsCommand = {
  execute: async (context, cartId: string): Promise<AvailablePaymentMethod> => {
    const { data } = await context
      .$vsf
      .$magento
      .api
      .getAvailablePaymentMethods({ cartId });

    return data
      .cart
      .available_payment_methods;
  },
};
