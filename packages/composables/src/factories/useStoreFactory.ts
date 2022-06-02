/**
 * @deprecated since version 1.0.0
 */
import { computed } from '@vue/composition-api';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams,
  FactoryParams,
  ComposableFunctionArgs,
  PlatformApi,
} from '@vue-storefront/core';
import { UseStore } from '../types/composables';

export interface UseStoreFactoryParams<STORES, STORE, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context, params?: ComposableFunctionArgs<{}>) => Promise<STORES>;
  change: (context: Context, params: ComposableFunctionArgs<STORE>) => void;
}

export function useStoreFactory<STORES, STORE,
  API extends PlatformApi = any>(factoryParams: UseStoreFactoryParams<STORES, API>) {
  return function useStore(cacheId: string = ''): UseStore<STORES, STORE, API> {
    const ssrKey = cacheId || 'useStoreFactory';
    // @ts-ignore
    const stores = sharedRef<STORES>([], `${ssrKey}-stores`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async (params?: ComposableFunctionArgs<{}>) => {
      Logger.debug(`useStore/${ssrKey}/load`);
      loading.value = true;
      try {
        stores.value = await _factoryParams.load(params);
      } finally {
        loading.value = false;
      }
    };

    const change = (store: ComposableFunctionArgs<STORE>) => {
      loading.value = true;
      try {
        _factoryParams.change(store);
      } finally {
        loading.value = false;
      }
    };

    return {
      load,
      change,
      stores: computed(() => stores.value),
      loading: computed(() => loading.value),
    };
  };
}
