import { CustomerAddressInput } from '~/modules/GraphQL/types';

export const updateCustomerAddressCommand = {
  execute: async (context, params: {
    addressId: number;
    input: CustomerAddressInput;
  }) => {
    const { data } = await context.$vsf.$magento.api.updateCustomerAddress(params);

    return data?.updateCustomerAddress ?? {};
  },
};
