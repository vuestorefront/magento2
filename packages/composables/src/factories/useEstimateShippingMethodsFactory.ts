import { computed, Ref } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseEstimateShippingMethods, UseEstimateShippingMethodsErrors } from '../types/composables';

export interface UseEstimateShippingMethodsFactory<SHIPPING_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params) => Promise<SHIPPING_METHOD[]>;
}

export function useEstimateShippingMethodsFactory<SHIPPING_METHOD, API extends PlatformApi = any>(
  factoryParams: UseEstimateShippingMethodsFactory<SHIPPING_METHOD, API>,
) {
  return function useEstimateShippingMethods(id: string = ''): UseEstimateShippingMethods<SHIPPING_METHOD, API> {
    // @ts-ignore
    const ssrKey = id || 'useEstimateShippingMethods';
    const estimatedShippingMethods: Ref<SHIPPING_METHOD[]> = sharedRef(null, `${ssrKey}-estimatedShippingMethods`);
    const lowerEstimatedShippingMethod: Ref<SHIPPING_METHOD> = sharedRef(null, `${ssrKey}-lowerEstimatedShippingMethod`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseEstimateShippingMethodsErrors>({
      load: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const getLowerShippingMethod = (shippingMethods) => {
      if (shippingMethods.length === 1) {
        return shippingMethods[0];
      }
      // eslint-disable-next-line no-param-reassign
      shippingMethods = shippingMethods.filter((method) => method.carrier_code !== 'instore' && method.available);
      return shippingMethods.reduce((a, b) => (a.price_incl_tax?.value < b.price_incl_tax?.value ? a : b));
    };

    // eslint-disable-next-line consistent-return
    const load = async (params): Promise<SHIPPING_METHOD[]> => {
      Logger.debug(`useEstimateShippingMethods/${ssrKey}/load`);

      try {
        loading.value = true;

        const data = await _factoryParams.load(params);

        estimatedShippingMethods.value = data;

        lowerEstimatedShippingMethod.value = getLowerShippingMethod(data);

        error.value.load = null;

        return data;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useEstimateShippingMethods/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    const setEstimatedShippingMethods = (newState: SHIPPING_METHOD[]) => {
      estimatedShippingMethods.value = newState;
      Logger.debug('useEstimateShippingMethods.setEstimatedShippingMethods', newState);
    };

    const setLowerEstimatedShippingMethod = (newState: SHIPPING_METHOD) => {
      lowerEstimatedShippingMethod.value = newState;
      Logger.debug('useEstimateShippingMethods.setLowerEstimatedShippingMethod', newState);
    };

    return {
      estimatedShippingMethods,
      lowerEstimatedShippingMethod,
      setEstimatedShippingMethods,
      setLowerEstimatedShippingMethod,
      load,
      result: computed(() => estimatedShippingMethods.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
