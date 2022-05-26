import type { useContext } from '@nuxtjs/composition-api';
import { CustomerAddressInput } from '~/modules/GraphQL/types';

type Context = ReturnType<typeof useContext>;

export const updateCustomerAddressCommand = {
  execute: async (context: Context, params: {
    addressId: number;
    input: CustomerAddressInput;
  }) => {
    const { data } = await context.app.$vsf.$magento.api.updateCustomerAddress(params);

    return data?.updateCustomerAddress ?? {};
  },
};
