import {
  Context,
  Logger,
  useUserShippingFactory,
  UseUserShippingFactoryParams,
} from '@vue-storefront/core';
import useUser from '../useUser';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '../../helpers/userAddressManipulator';

const factoryParams: UseUserShippingFactoryParams<any, any> = {
  provide() {
    return {
      user: useUser(),
    };
  },

  addAddress: async (context: Context, params?) => {
    Logger.debug('[Magento]: add shipping address', { params });

    const { data } = await context.$magento.api.createCustomerAddress(transformUserCreateAddressInput(params));

    Logger.debug('[Result]:', { data });

    return data.createCustomerAddress;
  },

  deleteAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] delete shipping address', { params });
    const { data } = await context.$magento.api.deleteCustomerAddress(params.address.id);

    return data.deleteCustomerAddress;
  },

  updateAddress: async (context: Context, params?) => {
    Logger.debug('[Magento] update shipping address', { params });

    const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(params));

    return data.updateCustomerAddress;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, _params?) => {
    Logger.debug('[Magento] load user address');

    if (!context.user.user?.value?.id) {
      await context.user.load();
    }

    return context.user.user?.value;
  },

  setDefaultAddress: async (context: Context, params) => {
    Logger.debug('[Magento] set default shipping address');

    const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(params));

    Logger.debug('[Result]:', { data });

    return data.updateCustomerAddress;
  },
};

export default useUserShippingFactory<any, any>(factoryParams);
