import type { useContext } from '@nuxtjs/composition-api';
import { CustomerAddress } from '~/modules/GraphQL/types';

type Context = ReturnType<typeof useContext>;

export const deleteCustomerAddressCommand = {
  execute: async (context: Context, address: CustomerAddress) => {
    const { data } = await context.app.$vsf.$magento.api.deleteCustomerAddress(address.id);

    return data?.deleteCustomerAddress ?? {};
  },
};
