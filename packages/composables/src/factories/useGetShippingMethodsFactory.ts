import { computed } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseGetShippingMethods, UseGetShippingMethodsErrors } from '../types/composeables';

export interface UseGetShippingMethodsFactory<SHIPPING_METHOD> extends FactoryParams {
  load: (context: Context, params: { cartId: string }) => Promise<SHIPPING_METHOD[]>;
}

export function useGetShippingMethodsFactory<SHIPPING_METHOD>(
  factoryParams: UseGetShippingMethodsFactory<SHIPPING_METHOD>,
) {
  return function useGetShippingMethods(id: string = ''): UseGetShippingMethods<SHIPPING_METHOD> {
    const ssrKey = id || 'useGetShippingMethods';
    // @ts-ignore
    const result = sharedRef<SHIPPING_METHOD[]>([], `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseGetShippingMethodsErrors>({
      load: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async (params: { cartId: string }): Promise<SHIPPING_METHOD[]> => {
      Logger.debug(`useGetShippingMethods/${ssrKey}/load`);

      try {
        loading.value = true;

        const data = await _factoryParams.load(params);

        result.value = data;

        error.value.search = null;

        return data;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useGetShippingMethods/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
