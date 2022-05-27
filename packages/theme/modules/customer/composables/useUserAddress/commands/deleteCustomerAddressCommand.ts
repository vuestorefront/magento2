import { UseContextReturn } from '~/composables/types';
import { CustomerAddress } from '~/modules/GraphQL/types';

export const deleteCustomerAddressCommand = {
  execute: async (context: UseContextReturn, address: CustomerAddress) => {
    const { data } = await context.app.$vsf.$magento.api.deleteCustomerAddress(address.id);

    return data?.deleteCustomerAddress ?? {};
  },
};
