/* eslint-disable no-param-reassign, consistent-return */
/**
 * @deprecated since version 1.0.0
 */
import {
  Context,
  Logger,
} from '@vue-storefront/core';
import { CustomerAddress, CustomerAddressInput } from '@vue-storefront/magento-api';
import {
  transformUserCreateAddressInput,
  transformUserUpdateAddressInput,
} from '../../helpers/userAddressManipulator';
import { useAddressesFactory, UseAddressesParams } from '../../factories/useAddressesFactory';
import { CustomQueryParams } from '../../types/composables';

type SaveAddressInput = {
  address: CustomerAddressInput,
} & CustomQueryParams;

type UpdateAddressInput = {
  address: CustomerAddressInput,
} & CustomQueryParams;

type RemoveAddressInput = {
  address: {
    id: number;
  }
} & CustomQueryParams;

const factoryParams: UseAddressesParams<CustomerAddress,
CustomQueryParams,
SaveAddressInput,
UpdateAddressInput,
RemoveAddressInput> = {
  load: async (context: Context) => {
    Logger.debug('[Magento] load user addresses');

    const { data } = await context.$magento.api.getCustomerAddresses();

    return data?.customer?.addresses ?? [];
  },
  save: async (context: Context, saveParams) => {
    Logger.debug('[Magento] save user address:', saveParams.address);
    const { data } = await context.$magento.api.createCustomerAddress(
      transformUserCreateAddressInput(saveParams),
    );

    Logger.debug('[Result]:', { data });

    return data?.createCustomerAddress ?? {};
  },
  remove: async (context: Context, params) => {
    Logger.debug('[Magento] remove user addresses');

    const { data } = await context.$magento.api.deleteCustomerAddress(
      params.address.id,
    );

    Logger.debug('[Result]:', { data });

    return !!data.deleteCustomerAddress;
  },
  update: async (context: Context, params) => {
    Logger.debug('[Magento] update user addresses', params);

    const { data } = await context.$magento.api.updateCustomerAddress(
      transformUserUpdateAddressInput(params),
    );

    Logger.debug('[Result]:', { data });

    return data?.updateCustomerAddress ?? {};
  },
};

export default useAddressesFactory(factoryParams);
