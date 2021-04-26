import {
  Context,
  Logger,
  useUserShippingFactory,
  UseUserShippingFactoryParams,
} from '@vue-storefront/core';
import { CustomerAddress, CustomerAddressInput } from '@vue-storefront/magento-api';
import useUser from '../useUser';

const factoryParams: UseUserShippingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },

  addAddress: async (context: Context, params?) => {
    Logger.debug('[Magento]: addAddress', params.address);
    const createParams: CustomerAddressInput = {
      ...params.address,
    };

    const { data } = await context.$magento.api.createCustomerAddress(createParams);

    return data.createCustomerAddress;
  },

  deleteAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] deleteAddress', params);
    const { data } = await context.$magento.api.deleteCustomerAddress(params.address.id);

    return data.deleteCustomerAddress;
  },

  updateAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] updateAddress', params);
    const updateAddressParams: {
      addressId: number;
      input: CustomerAddressInput;
    } = {
      addressId: params.address.id,
      input: params.address,
    };

    const { data } = await context.$magento.api.updateCustomerAddress(updateAddressParams);

    return data.updateCustomerAddress;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, _params?) => {
    Logger.debug('[Magento] load address');

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    return context.user.user?.value;
  },

  setDefaultAddress: async (context: Context, params) => {
    Logger.debug('[Magento] setDefaultAddress');
    const customerAddressParams: {
      addressId: number;
      input: CustomerAddressInput;
    } = {
      // @ts-ignore
      addressId: params.address.id,
      input: {
        ...params.address,
        default_shipping: true,
      },
    };

    const { data } = await context.$magento.api.updateCustomerAddress(customerAddressParams);

    return data.updateCustomerAddress;
  },
};

export default useUserShippingFactory<any, any>(factoryParams);
