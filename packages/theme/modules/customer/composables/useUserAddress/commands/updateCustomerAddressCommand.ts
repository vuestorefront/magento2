import { CustomQuery, CustomHeaders, UseContextReturn } from '~/types/core';
import { CustomerAddressInput } from '~/modules/GraphQL/types';

export const updateCustomerAddressCommand = {
  execute: async (context: UseContextReturn, params: {
    addressId: number;
    input: CustomerAddressInput;
  }, customQuery: CustomQuery, customHeaders: CustomHeaders) => {
    const { data } = await context.app.$vsf.$magento.api.updateCustomerAddress(params, customQuery, customHeaders);

    return data?.updateCustomerAddress ?? {};
  },
};
