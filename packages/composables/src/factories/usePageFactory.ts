import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UsePage } from '../types';

export interface UsePageFactoryParams<PAGE> extends FactoryParams{
  loadPage: (context: Context, identifer: string) => Promise<PAGE>;
}

export function usePageFactory<PAGE>(
  factoryParams: UsePageFactoryParams<PAGE>,
) {
  return function usePage(cacheId: string): UsePage<PAGE> {
    // @ts-ignore
    const page = sharedRef<PAGE>({}, `usePage-pages-${cacheId}`);
    const loading = sharedRef<boolean>(false, `usePage-loading-${cacheId}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const loadPage = async (identifer: string) => {
      Logger.debug(`usePage/${cacheId}/loadPage`);
      loading.value = true;

      try {
        page.value = await _factoryParams.loadPage(identifer);
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
