import { computed, Ref } from '@vue/composition-api';
import {
  ComposableFunctionArgs,
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  PlatformApi,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseGetShippingMethods, UseGetShippingMethodsErrors } from '../types/composables';

export interface UseGetShippingMethodsFactory<SHIPPING_METHOD, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params: ComposableFunctionArgs<{ cartId: string }>) => Promise<SHIPPING_METHOD[]>;
}

export function useGetShippingMethodsFactory<SHIPPING_METHOD, API extends PlatformApi = any>(
  factoryParams: UseGetShippingMethodsFactory<SHIPPING_METHOD, API>,
) {
  return function useGetShippingMethods(id: string = ''): UseGetShippingMethods<SHIPPING_METHOD, API> {
    // @ts-ignore
    const state: Ref<SHIPPING_METHOD[]> = sharedRef(null, 'UseGetShippingMethods-response');
    const ssrKey = id || 'useGetShippingMethods';
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseGetShippingMethodsErrors>({
      load: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const load = async (params: ComposableFunctionArgs<{ cartId: string }>): Promise<SHIPPING_METHOD[]> => {
      Logger.debug(`useGetShippingMethods/${ssrKey}/load`, { params });

      try {
        loading.value = true;

        const data = await _factoryParams.load(params);

        state.value = data;

        error.value.load = null;

        return data;
      } catch (err) {
        error.value.load = err;
        Logger.error(`useGetShippingMethods/${ssrKey}/load`, err);
      } finally {
        loading.value = false;
      }
    };

    const setState = (newState: SHIPPING_METHOD[]) => {
      state.value = newState;
      Logger.debug('useGetShippingMethods.setState', newState);
    };

    return {
      state,
      setState,
      load,
      result: computed(() => state.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
