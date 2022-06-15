import { ref, useContext } from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import { Logger } from '~/helpers/logger';
import { transformUserCreateAddressInput, transformUserUpdateAddressInput } from '~/modules/customer/helpers/userAddressManipulator';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { UseAddressesInterface, UseAddressesParamsInput, UseAddressesErrors } from './useAddresses';
import { CustomQuery } from '~/types/core';

/**
 * @public
 *
 * Allows loading and manipulating addresses of the current user. These
 * addresses can be used for both billing and shipping.
 *
 * See the {@link UseAddressesInterface} for a list of methods and values available in this composable.
 */
export function useAddresses(): UseAddressesInterface {
  const error: Ref<UseAddressesErrors> = ref({
    load: null,
    save: null,
    remove: null,
    update: null,
  });
  const loading: Ref<boolean> = ref(false);
  const { app } = useContext();
  const context = app.$vsf;

  const load = async (customQuery?: CustomQuery) => {
    Logger.debug('[Magento] load user addresses');
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.getCustomerAddresses(customQuery);
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

  const save = async (params: ComposableFunctionArgs<UseAddressesParamsInput>) => {
    Logger.debug('[Magento] save user address:', params.address);
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.createCustomerAddress(transformUserCreateAddressInput(params), params?.customQuery ?? null);
      results = data?.createCustomerAddress ?? {};
      Logger.debug('[Magento] save user address results:', params.address);
      error.value.save = null;
    } catch (err) {
      error.value.save = err;
      Logger.error('[Magento] save user address error:', err);
    } finally {
      loading.value = false;
    }

    return results;
  };

  const update = async (params: ComposableFunctionArgs<UseAddressesParamsInput>) => {
    Logger.debug('[Magento] update user address:', params.address);
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.updateCustomerAddress(transformUserUpdateAddressInput(params), params?.customQuery ?? null);
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

  const remove = async (params: ComposableFunctionArgs<UseAddressesParamsInput>) => {
    Logger.debug('[Magento] remove user address:', params.address);
    let results = null;

    try {
      loading.value = true;
      const { data } = await context.$magento.api.deleteCustomerAddress(params.address.id, params?.customQuery ?? null);
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
}

export * from './useAddresses';
export default useAddresses;
