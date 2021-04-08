import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams,
} from '@vue-storefront/core';

import useUser from '../useUser';

const params: UseUserBillingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  addAddress: async (context: Context, params?) => {
    console.log('[Magento]: addAddress', params.address);
    const response = await context.$ma.api.createCustomerAddress({ input: params.address });
    return Promise.resolve(response.data.createCustomerAddress);
  },

  deleteAddress: async (context: Context, params?) => {
    console.log('[Magento] deleteAddress', params);
    const response = await context.$ma.api.deleteCustomerAddress(params.address.id);

    // if (indexToRemove < 0) {
    // return Promise.reject('This address does not exist');
    // }

    // true ? false?
    return Promise.resolve(response.data.deleteCustomerAddress);
  },

  updateAddress: async (context: Context, params?) => {
    console.log('[Magento] updateAddress', params);
    const response = await context.$ma.api.updateCustomerAddress({ id: params.address.id, input: params.address });
    return Promise.resolve(response.data.updateCustomerAddress);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    console.log('[Magento] load address');
    if (!context.user.user?.value?.id) {
      await context.user.load();
    }
    return Promise.resolve(context.user.user?.value?.addresses);
  },

  setDefaultAddress: async (context: Context, params?) => {
    console.log('[Magento] setDefaultAddress');
    const response = await context.$ma.api.updateCustomerAddress({
      id: params.address.id,
      input: {
        ...params.address,
        default_billing: true,
      },
    });
    return Promise.resolve(response.data.updateCustomerAddress);
  },

};

export default useUserBillingFactory<any, any>(params);
