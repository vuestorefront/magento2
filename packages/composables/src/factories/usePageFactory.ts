import { UsePage } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { Context, generateContext, sharedRef, Logger } from '@vue-storefront/core';

export interface UsePageFactoryParams<PAGE> {
    loadPage: (context: Context, identifer: string) => Promise<PAGE>;
}

export function usePageFactory<PAGE>(
  factoryParams: UsePageFactoryParams<PAGE>
) {
  return function usePage(cacheId: string): UsePage<PAGE> {
    const page: Ref<PAGE> = sharedRef({}, `usePage-pages-${cacheId}`);
    const loading: Ref<boolean> = sharedRef(false, `usePage-loading-${cacheId}`);
    const context = generateContext(factoryParams);

    const loadPage = async (identifer: string) => {
      Logger.debug(`usePage/${cacheId}/loadPage`);
      loading.value = true;

      try {
        page.value = await factoryParams.loadPage(context, identifer);
      } finally {
        loading.value = false;
      }
    };

    return {
      loadPage,
      page: computed(() => page.value),
      loading: computed(() => loading.value)
    };
  };
}
