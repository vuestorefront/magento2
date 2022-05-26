import { UseContextReturn } from '~/composables/types';
import { CustomerAddressInput } from '~/modules/GraphQL/types';

export const updateCustomerAddressCommand = {
  execute: async (context: UseContextReturn, params: {
    addressId: number;
    input: CustomerAddressInput;
  }) => {
    const { data } = await context.app.$vsf.$magento.api.updateCustomerAddress(params);

    return data?.updateCustomerAddress ?? {};
  },
};
