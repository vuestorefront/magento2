import {
  Context,
  Logger,
  useUserBillingFactory,
  UseUserBillingFactoryParams,
} from '@vue-storefront/core';

import useUser from '../useUser';

const factoryParams: UseUserBillingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },
  addAddress: async (context: Context, params?) => {
    Logger.debug('[Magento]: addAddress', params.address);
    const response = await context.$ma.api.createCustomerAddress({ input: params.address });
    return Promise.resolve(response.data.createCustomerAddress);
  },

  deleteAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] deleteAddress', params);
    const response = await context.$ma.api.deleteCustomerAddress(params.address.id);

    // if (indexToRemove < 0) {
    // return Promise.reject('This address does not exist');
    // }

    // true ? false?
    return Promise.resolve(response.data.deleteCustomerAddress);
  },

  updateAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] updateAddress', params);
    const response = await context.$ma.api.updateCustomerAddress({ id: params.address.id, input: params.address });
    return Promise.resolve(response.data.updateCustomerAddress);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    Logger.debug('[Magento] load address');
    if (!context.user.user?.value?.id) {
      await context.user.load();
    }
    return Promise.resolve(context.user.user?.value?.addresses);
  },

  setDefaultAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] setDefaultAddress');
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

export default useUserBillingFactory<any, any>(factoryParams);
