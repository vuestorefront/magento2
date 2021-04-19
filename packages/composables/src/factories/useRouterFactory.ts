import { computed } from '@vue/composition-api';
import {
  Context,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseRouter } from '../types';

export interface UseRouterFactoryParams<ROUTER> {
  search: (context: Context, url: string) => Promise<ROUTER>;
}

export function useRouterFactory<ROUTER>(
  factoryParams: UseRouterFactoryParams<ROUTER>,
) {
  return function useRouter(cacheId: string): UseRouter<ROUTER> {
    const context = generateContext(factoryParams);
    const route = sharedRef<ROUTER>({}, `useRouter-routers-${cacheId}`);
    const loading = sharedRef<boolean>(false, `useRouter-loading-${cacheId}`);

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
