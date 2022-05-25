import type { useContext } from '@nuxtjs/composition-api';
import { CustomerAddressInput } from '~/modules/GraphQL/types';

type Context = ReturnType<typeof useContext>;

export const createCustomerAddressCommand = {
  execute: async (context: Context, params: CustomerAddressInput) => {
    const { data } = await context.app.$vsf.$magento.api.createCustomerAddress(params);

    return data?.createCustomerAddress ?? {};
  },
};
