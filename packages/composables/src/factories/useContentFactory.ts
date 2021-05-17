import { computed } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseContent } from '../types/composeables';

export interface UseContentFactoryParams<CONTENT> extends FactoryParams{
  loadContent: (context: Context, identifer: string) => Promise<CONTENT>;
}

export function useContentFactory<CONTENT>(
  factoryParams: UseContentFactoryParams<CONTENT>,
) {
  return function useContent(cacheId: string): UseContent<CONTENT> {
    const ssrKey = cacheId || 'useConfigFactory';
    // @ts-ignore
    const page = sharedRef<CONTENT>({}, `useContent-content-${ssrKey}`);
    const loading = sharedRef<boolean>(false, `useContent-loading-${ssrKey}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const loadContent = async (identifer: string) => {
      Logger.debug(`useContent/${ssrKey}/loadPage`);
      loading.value = true;

      try {
        page.value = await _factoryParams.loadContent(identifer);
      } finally {
        loading.value = false;
      }
    };

    return {
      loadContent,
      loading: computed(() => loading.value),
      page: computed(() => page.value),
    };
  };
}
