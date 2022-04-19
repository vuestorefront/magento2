import type { NuxtAppOptions } from '@nuxt/types';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';
import type PaymentMethodParams from '../PaymentMethodParams';

export const setPaymentMethodOnCartCommand = {
  execute: async (app: NuxtAppOptions, params: PaymentMethodParams): Promise<AvailablePaymentMethod[]> => {
    const { data } = await app.$vsf.$magento.api.setPaymentMethodOnCart(params);

    return data?.setPaymentMethodOnCart?.cart.available_payment_methods ?? [];
  },
};
