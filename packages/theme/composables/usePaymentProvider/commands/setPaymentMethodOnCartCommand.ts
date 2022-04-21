import type { useContext } from '@nuxtjs/composition-api';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';
import type PaymentMethodParams from '../PaymentMethodParams';

type Context = ReturnType<typeof useContext>;

export const setPaymentMethodOnCartCommand = {
  execute: async (context: Context, params: PaymentMethodParams): Promise<AvailablePaymentMethod[]> => {
    const { data } = await context.app.$vsf.$magento.api.setPaymentMethodOnCart(params);

    return data?.setPaymentMethodOnCart?.cart.available_payment_methods ?? [];
  },
};
