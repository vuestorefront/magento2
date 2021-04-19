import { computed } from '@vue/composition-api';
import {
  Context,
  generateContext,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UsePage } from '../types';

export interface UsePageFactoryParams<PAGE> {
  loadPage: (context: Context, identifer: string) => Promise<PAGE>;
}

export function usePageFactory<PAGE>(
  factoryParams: UsePageFactoryParams<PAGE>,
) {
  return function usePage(cacheId: string): UsePage<PAGE> {
    const context = generateContext(factoryParams);
    const page = sharedRef<PAGE>({}, `usePage-pages-${cacheId}`);
    const loading = sharedRef<boolean>(false, `usePage-loading-${cacheId}`);

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
      loading: computed(() => loading.value),
      loadPage,
      page: computed(() => page.value),
    };
  };
}
