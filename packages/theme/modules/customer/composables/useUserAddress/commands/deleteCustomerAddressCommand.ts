import { CustomQuery, UseContextReturn } from '~/types/core';
import { CustomerAddress } from '~/modules/GraphQL/types';

export const deleteCustomerAddressCommand = {
  execute: async (context: UseContextReturn, address: CustomerAddress, customQuery: CustomQuery) => {
    const { data } = await context.app.$vsf.$magento.api.deleteCustomerAddress(address.id, customQuery);

    return data?.deleteCustomerAddress ?? {};
  },
};
