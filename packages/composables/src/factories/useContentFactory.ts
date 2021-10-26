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
import { UseContentErrors, UseContent } from '../types/composables';

export interface UseContentFactoryParams<CONTENT, BLOCK, API extends PlatformApi = any> extends FactoryParams<API>{
  loadContent: (context: Context, params: ComposableFunctionArgs<{ identifier: string }>) => Promise<CONTENT>;
  loadBlocks: (context: Context, params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<BLOCK[]>;
}

export function useContentFactory<CONTENT, BLOCK, API extends PlatformApi = any>(
  factoryParams: UseContentFactoryParams<CONTENT, BLOCK, API>,
) {
  return function useContent(ssrKey = 'useConfigFactory'): UseContent<CONTENT, BLOCK, API> {
    // @ts-ignore
    const page = sharedRef<CONTENT>({}, `useContent-content-${ssrKey}`);
    const errors: Ref<UseContentErrors> = sharedRef({
      content: null,
      blocks: null,
    }, 'useContent-error');
    const blocks = sharedRef<BLOCK[]>([], `useContent-blocks-${ssrKey}`);
    const loading = sharedRef<boolean>(false, `useContent-loading-${ssrKey}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const loadContent = async (params: ComposableFunctionArgs<{ identifier: string }>) => {
      Logger.debug(`useContent/${ssrKey}/loadPage`);
      loading.value = true;

      try {
        errors.value.content = null;
        page.value = await _factoryParams.loadContent(params);
      } catch (error) {
        errors.value.content = error;
      } finally {
        loading.value = false;
      }
    };

    const loadBlocks = async (params: ComposableFunctionArgs<{ identifiers: string[] }>) => {
      Logger.debug(`useContent/${ssrKey}/loadBlocks`);
      loading.value = true;

      try {
        errors.value.blocks = null;
        blocks.value = await _factoryParams.loadBlocks(params);
      } catch (error) {
        errors.value.blocks = error;
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
      error: computed(() => errors.value),
    };
  };
}
