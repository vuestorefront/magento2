import { CustomerAddressInput } from '~/modules/GraphQL/types';

export const createCustomerAddressCommand = {
  execute: async (context, params: CustomerAddressInput) => {
    const { data } = await context.$vsf.$magento.api.createCustomerAddress(params);

    return data?.createCustomerAddress ?? {};
  },
};
