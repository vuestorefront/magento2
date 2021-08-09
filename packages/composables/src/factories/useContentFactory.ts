import { computed } from 'vue-demi';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@vue-storefront/core';
import { UseContent } from '../types/composables';

export interface UseContentFactoryParams<CONTENT, BLOCK> extends FactoryParams{
  loadContent: (context: Context, identifier: string) => Promise<CONTENT>;
  loadBlocks: (context: Context, identifiers: string[]) => Promise<BLOCK[]>;
}

export function useContentFactory<CONTENT, BLOCK>(
  factoryParams: UseContentFactoryParams<CONTENT, BLOCK>,
) {
  return function useContent(ssrKey = 'useConfigFactory'): UseContent<CONTENT, BLOCK> {
    // @ts-ignore
    const page = sharedRef<CONTENT>({}, `useContent-content-${ssrKey}`);
    const blocks = sharedRef<BLOCK[]>([], `useContent-blocks-${ssrKey}`);
    const loading = sharedRef<boolean>(false, `useContent-loading-${ssrKey}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const loadContent = async (identifier: string) => {
      Logger.debug(`useContent/${ssrKey}/loadPage`);
      loading.value = true;

      try {
        page.value = await _factoryParams.loadContent(identifier);
      } finally {
        loading.value = false;
      }
    };

    const loadBlocks = async (identifiers: string[]) => {
      Logger.debug(`useContent/${ssrKey}/loadBlocks`);
      loading.value = true;

      try {
        blocks.value = await _factoryParams.loadBlocks(identifiers);
      } finally {
        loading.value = false;
      }
    };

    return {
      loadContent,
      loadBlocks,
      loading: computed(() => loading.value),
      page: computed(() => page.value),
      blocks: computed(() => blocks.value),
    };
  };
}
