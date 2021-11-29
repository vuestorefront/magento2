import { computed } from 'vue-demi';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams,
  FactoryParams,
} from '@vue-storefront/core';
import { PlatformApi } from '@vue-storefront/core/lib/src/types';
import { UseStore } from '../types/composables';

export interface UseStoreFactoryParams<STORES, STORE, API extends PlatformApi = any> extends FactoryParams<API> {
  load: (context: Context) => Promise<STORES>;
  change: (context: Context, params: STORE) => void;
}

export function useStoreFactory<STORES,
  API extends PlatformApi = any>(factoryParams: UseStoreFactoryParams<STORES, API>) {
  return function useStore(cacheId: string = ''): UseStore<STORES, API> {
    const ssrKey = cacheId || 'useStoreFactory';
    // @ts-ignore
    const stores = sharedRef<STORES>([], `${ssrKey}-stores`);
    const loading = sharedRef<boolean>(false, `${ssrKey}-loading`);

    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async () => {
      Logger.debug(`useStore/${ssrKey}/load`);
      loading.value = true;
      try {
        stores.value = await _factoryParams.load();
      } finally {
        loading.value = false;
      }
    };

    const change = async (store): Promise<void> => {
      loading.value = true;
      try {
        await _factoryParams.change(store)
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
