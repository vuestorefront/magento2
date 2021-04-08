import { Ref, computed } from '@vue/composition-api';
import {
  Context, generateContext, sharedRef, Logger,
} from '@vue-storefront/core';
import { UseRouter } from '../types';

export interface UseRouterFactoryParams<ROUTER> {
  search: (context: Context, url: string) => Promise<ROUTER>;
}

export function useRouterFactory<ROUTER>(
  factoryParams: UseRouterFactoryParams<ROUTER>,
) {
  return function useRouter(cacheId: string): UseRouter<ROUTER> {
    const route: Ref<ROUTER> = sharedRef({}, `useRouter-routers-${cacheId}`);
    const loading: Ref<boolean> = sharedRef(false, `useRouter-loading-${cacheId}`);
    const context = generateContext(factoryParams);

    const search = async (url: string) => {
      Logger.debug(`useRouter/${cacheId}/search`);
      loading.value = true;

      try {
        route.value = await factoryParams.search(context, url);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      route: computed(() => route.value),
      loading: computed(() => loading.value),
    };
  };
}
