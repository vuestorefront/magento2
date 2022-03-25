import { Ref, ref, useContext } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '~/helpers/userAddressManipulator';
import { ComposableFunctionArgs } from '~/composables/types';
import { UseAddressesInterface, UseAddressesParamsInput, UseAddressesErrors } from '~/composables/useAddresses/useAddresses';

export const useAddresses = () : UseAddressesInterface => {
  const error: Ref<UseAddressesErrors> = ref({
    load: null,
    save: null,
    remove: null,
    update: null,
  });
  const loading: Ref<boolean> = ref(false);
  const { app } = useContext();
  const context = app.$vsf;

  const load = async () => {
    Logger.debug('[Magento] load user addresses');
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.getCustomerAddresses();
      results = data?.customer?.addresses ?? [];
      Logger.debug('[Magento] load user addresses results:', results);
      error.value.load = null;
    } catch (err) {
      error.value.load = err;
      Logger.error('Magento] load user addresses error', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  const save = async (saveParams: ComposableFunctionArgs<UseAddressesParamsInput>) => {
    Logger.debug('[Magento] save user address:', saveParams.address);
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.createCustomerAddress(
        transformUserCreateAddressInput(saveParams),
      );
      results = data?.createCustomerAddress ?? {};
      Logger.debug('[Magento] save user address results:', saveParams.address);
      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('[Magento] save user address error:', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  const update = async (updateParams: ComposableFunctionArgs<UseAddressesParamsInput>) => {
    Logger.debug('[Magento] update user address:', updateParams.address);
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.updateCustomerAddress(
        transformUserUpdateAddressInput(updateParams),
      );
      results = data?.updateCustomerAddress ?? {};
      Logger.debug('[Magento] update user address results:', results);
      error.value.update = null;
    } catch (err) {
      error.value.update = err;
      Logger.error('[Magento] update user address error:', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  const remove = async (removeParams: ComposableFunctionArgs<UseAddressesParamsInput>) => {
    Logger.debug('[Magento] remove user address:', removeParams.address);
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.deleteCustomerAddress(
        removeParams.address.id,
      );
      results = !!data.deleteCustomerAddress;
      Logger.debug('[Magento] remove user address results:', results);
      error.value.remove = null;
    } catch (err) {
      error.value.remove = err;
      Logger.error('[Magento] remove user address error:', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  return {
    error,
    loading,
    load,
    save,
    update,
    remove,
  };
};

export default useAddresses;
