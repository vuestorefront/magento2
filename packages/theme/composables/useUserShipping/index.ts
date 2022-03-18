import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '@vue-storefront/core';
import { UseUserShippingErrors } from '~/composables/useUserShipping/useUserShipping';
import { useUser } from '~/composables';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '~/helpers/userAddressManipulator';
import { createCustomerAddressCommand } from '~/composables/useUserShipping/commands/createCustomerAddressCommand';
import { deleteCustomerAddressCommand } from '~/composables/useUserShipping/commands/deleteCustomerAddressCommand';
import { updateCustomerAddressCommand } from '~/composables/useUserShipping/commands/updateCustomerAddressCommand';
import { CustomerAddress } from '~/modules/GraphQL/types';
import mask from '../utils/mask';

export const useUserShipping = () => {
  const loading = ref(false);
  const shipping = ref({});
  const error: Ref<UseUserShippingErrors> = ref({
    addAddress: null,
    deleteAddress: null,
    updateAddress: null,
    load: null,
    setDefaultAddress: null,
  });
  const { user, load: loadUser } = useUser();
  const context = useContext();

  const addAddress = async ({ address, customQuery }: { address: CustomerAddress, customQuery: any }) => {
    Logger.debug('useUserShipping.addAddress', mask(address));
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
      Logger.error('useUserShipping/addAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  const deleteAddress = async (address: CustomerAddress) => {
    Logger.debug('useUserShipping.deleteAddress', address);
    let result = {};

    try {
      loading.value = true;
      result = await deleteCustomerAddressCommand.execute(context, address);
      error.value.deleteAddress = null;
    } catch (err) {
      error.value.deleteAddress = err;
      Logger.error('useUserShipping/deleteAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  const updateAddress = async ({ address, customQuery }: { address: CustomerAddress, customQuery: any }) => {
    Logger.debug('useUserShipping.updateAddress', mask(address));
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
      Logger.error('useUserShipping/updateAddress', err);
    } finally {
      loading.value = false;
    }

    Logger.debug('[Result]:', { result: mask(result) });

    return result;
  };

  const load = async (force: false) => {
    Logger.debug('useUserShipping.load');

    try {
      loading.value = true;
      if (force || !user?.value?.id) {
        await loadUser();
      }
    } catch (err) {
      error.value.load = err;
      Logger.error('useUserShipping/load', err);
    } finally {
      loading.value = false;
    }

    return user?.value;
  };

  const setDefaultAddress = async ({ address, customQuery }: { address: CustomerAddress, customQuery: any }) => {
    Logger.debug('useUserShipping.setDefaultAddress', mask(address));
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
      Logger.error('useUserShipping/setDefaultAddress', err);
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

export default useUserShipping;
