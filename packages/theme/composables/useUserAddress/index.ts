import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { UseUserAddressErrors } from '~/composables/useUserAddress/useUserAddress';
import { useUser } from '~/composables';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '~/helpers/userAddressManipulator';
import { createCustomerAddressCommand } from '~/composables/useUserAddress/commands/createCustomerAddressCommand';
import { deleteCustomerAddressCommand } from '~/composables/useUserAddress/commands/deleteCustomerAddressCommand';
import { updateCustomerAddressCommand } from '~/composables/useUserAddress/commands/updateCustomerAddressCommand';
import { CustomerAddress } from '~/modules/GraphQL/types';
import mask from '../utils/mask';

export const useUserAddress = () => {
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

  const addAddress = async ({ address, customQuery }: { address: CustomerAddress, customQuery: any }) => {
    Logger.debug('useUserAddress.addAddress', mask(address));
    let result = {};
    try {
      loading.value = true;
      const customerAddressInput = transformUserCreateAddressInput({
        address,
        shipping: shipping.value,
        customQuery,
      });
      result = await createCustomerAddressCommand.execute(context, customerAddressInput);
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

  const deleteAddress = async (address: CustomerAddress) => {
    Logger.debug('useUserAddress.deleteAddress', address);
    let result = {};

    try {
      loading.value = true;
      result = await deleteCustomerAddressCommand.execute(context, address);
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

  const updateAddress = async ({ address, customQuery }: { address: CustomerAddress, customQuery: any }) => {
    Logger.debug('useUserAddress.updateAddress', mask(address));
    let result = {};

    try {
      loading.value = true;
      const customerAddressInput = transformUserUpdateAddressInput({
        address,
        shipping: shipping.value,
        customQuery,
      });
      result = await updateCustomerAddressCommand.execute(context, customerAddressInput);
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

  const setDefaultAddress = async ({ address, customQuery }: { address: CustomerAddress, customQuery: any }) => {
    Logger.debug('useUserAddress.setDefaultAddress', mask(address));
    let result = {};

    try {
      loading.value = true;
      const updateAddressInput = transformUserUpdateAddressInput({
        address,
        shipping: shipping.value,
        customQuery,
      });

      result = await updateCustomerAddressCommand.execute(context, updateAddressInput);
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
    loading,
    error,
    addAddress,
    deleteAddress,
    updateAddress,
    load,
    setDefaultAddress,
  };
};

export default useUserAddress;
