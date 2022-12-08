import { CustomQuery, CustomHeaders, UseContextReturn } from '~/types/core';
import { CustomerAddressInput } from '~/modules/GraphQL/types';

export const createCustomerAddressCommand = {
  execute: async (context: UseContextReturn, params: CustomerAddressInput, customQuery: CustomQuery, customHeaders: CustomHeaders) => {
    const { data } = await context.app.$vsf.$magento.api.createCustomerAddress(params, customQuery, customHeaders);

    return data?.createCustomerAddress ?? {};
  },
};
