import { computed } from '@vue/composition-api';
import {
  Context,
  CustomQuery,
  FactoryParams,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseShipping, UseShippingErrors } from '../types';
import { configureFactoryParams } from '../utils';

export interface UseShippingParams<SHIPPING, SHIPPING_PARAMS> extends FactoryParams {
  load: (context: Context, params: { customQuery?: CustomQuery }) => Promise<SHIPPING>;
  save: (context: Context, params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING; customQuery?: CustomQuery }) => Promise<SHIPPING>;
}

export const useShippingFactory = <SHIPPING, SHIPPING_PARAMS>(
  factoryParams: UseShippingParams<SHIPPING, SHIPPING_PARAMS>,
) => function useShipping(): UseShipping<SHIPPING, SHIPPING_PARAMS> {
  const _factoryParams = configureFactoryParams(factoryParams);
  const context = generateContext(factoryParams);
  const shipping = sharedRef<SHIPPING>(null, 'useShipping-shipping');
  const loading = sharedRef<boolean>(false, 'useShipping-loading');
  const error = sharedRef<UseShippingErrors>({}, 'useShipping-error');

  const load = async ({ customQuery = null } = {}) => {
    Logger.debug('useShipping.load');

    try {
      loading.value = true;
      error.value.load = null;
      const shippingInfo = await factoryParams.load(context, { customQuery });
      shipping.value = shippingInfo;
    } catch (err) {
      error.value.load = err;
      Logger.error('useShipping/load', err);
    } finally {
      loading.value = false;
    }
  };

  const save = async (saveParams) => {
    Logger.debug('useShipping.save');

    try {
      loading.value = true;
      error.value.save = null;
      const shippingInfo = await factoryParams.save(context, saveParams);
      shipping.value = shippingInfo;
    } catch (err) {
      error.value.save = err;
      Logger.error('useShipping/save', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    error: computed(() => error.value),
    load,
    loading: computed(() => loading.value),
    save,
    shipping: computed(() => shipping.value),
  };
};
