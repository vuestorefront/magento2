import { ref, readonly, useContext } from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { useUser } from '~/modules/customer/composables/useUser';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '~/modules/customer/helpers/userAddressManipulator';
import { CustomerAddress } from '~/modules/GraphQL/types';
import mask from '~/composables/utils/mask';
import { createCustomerAddressCommand } from './commands/createCustomerAddressCommand';
import { deleteCustomerAddressCommand } from './commands/deleteCustomerAddressCommand';
import { updateCustomerAddressCommand } from './commands/updateCustomerAddressCommand';
import type {
  UseUserAddressErrors,
  UseUserAddressInterface,
  UseUserAddressAddAddressParams,
  UseUserAddressUpdateAddressParams,
  UseUserAddressSetDefaultAddressParams,
} from './useUserAddress';
import { CustomQuery } from '~/types/core';

/**
 * Allows loading and manipulating addresses of the current user.
 *
 * See the {@link UseUserAddressInterface} for a list of methods and values available in this composable.
 */
export function useUserAddress(): UseUserAddressInterface {
  const loading = ref(false);
  const shipping = ref({});
  const error: Ref<UseUserAddressErrors> = ref({
    addAddress: null,
    deleteAddress: null,
    updateAddress: null,
    load: null,
    setDefaultAddress: null,
  });
  const { user, load: loadUser } = useUser();
  const context = useContext();

  const addAddress = async ({ address, customQuery }: UseUserAddressAddAddressParams) => {
    Logger.debug('useUserAddress.addAddress', mask(address));
    let result = {};
    try {
      loading.value = true;
      const customerAddressInput = transformUserCreateAddressInput({
        address,
        shipping: shipping.value,
      });
      result = await createCustomerAddressCommand.execute(context, customerAddressInput, customQuery);
      error.value.addAddress = null;
    } catch (err) {
      error.value.addAddress = err;
      Logger.error('useUserAddress/addAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  const deleteAddress = async (address: CustomerAddress, customQuery: CustomQuery) => {
    Logger.debug('useUserAddress.deleteAddress', address);
    let result = {};

    try {
      loading.value = true;
      result = await deleteCustomerAddressCommand.execute(context, address, customQuery);
      error.value.deleteAddress = null;
    } catch (err) {
      error.value.deleteAddress = err;
      Logger.error('useUserAddress/deleteAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  const updateAddress = async ({ address, customQuery }: UseUserAddressUpdateAddressParams) => {
    Logger.debug('useUserAddress.updateAddress', mask(address));
    let result = {};

    try {
      loading.value = true;
      const customerAddressInput = transformUserUpdateAddressInput({
        address,
        shipping: shipping.value,
      });
      result = await updateCustomerAddressCommand.execute(context, customerAddressInput, customQuery);
      error.value.updateAddress = null;
    } catch (err) {
      error.value.updateAddress = err;
      Logger.error('useUserAddress/updateAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  const load = async (force: boolean = false) => {
    Logger.debug('useUserAddress.load');

    try {
      loading.value = true;
      if (force || !user?.value?.id) {
        await loadUser();
      }
    } catch (err) {
      error.value.load = err;
      Logger.error('useUserAddress/load', err);
    } finally {
      loading.value = false;
    }

    return user?.value;
  };

  const setDefaultAddress = async ({ address, customQuery }: UseUserAddressSetDefaultAddressParams) => {
    Logger.debug('useUserAddress.setDefaultAddress', mask(address));
    let result = {};

    try {
      loading.value = true;
      const updateAddressInput = transformUserUpdateAddressInput({
        address,
        shipping: shipping.value,
        customQuery,
      });

      result = await updateCustomerAddressCommand.execute(context, updateAddressInput, customQuery);
      error.value.setDefaultAddress = null;
    } catch (err) {
      error.value.setDefaultAddress = err;
      Logger.error('useUserAddress/setDefaultAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  return {
    addAddress,
    deleteAddress,
    updateAddress,
    load,
    setDefaultAddress,
    loading: readonly(loading),
    error: readonly(error),
  };
}

export default useUserAddress;
export * from './useUserAddress';
