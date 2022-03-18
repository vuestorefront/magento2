import { CustomerAddress } from '~/modules/GraphQL/types';

export const deleteCustomerAddressCommand = {
  execute: async (context, address: CustomerAddress) => {
    const { data } = await context.$vsf.$magento.api.deleteCustomerAddress(address.id);

    return data?.deleteCustomerAddress ?? {};
  },
};
