import type { NuxtAppOptions } from '@nuxt/types';
import type { AvailablePaymentMethod } from '~/modules/GraphQL/types';

export const getAvailablePaymentMethodsCommand = {
  execute: async (app: NuxtAppOptions, cartId: string): Promise<AvailablePaymentMethod[]> => {
    const { data } = await app.$vsf.$magento.api.getAvailablePaymentMethods({ cartId });

    return data?.cart?.available_payment_methods ?? [];
  },
};
