import { ref, readonly, useContext } from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import type { CmsPage, CmsBlock } from '~/modules/GraphQL/types';
import { Logger } from '~/helpers/logger';
import { loadContentCommand } from './commands/loadContentCommand';
import { loadBlocksCommand } from './commands/loadBlocksCommand';
import type { ComposableFunctionArgs } from '../types';
import type { UseContentInterface, UseContentErrors } from './useContent';

/**
 * Allows loading CMS Pages or Blocks from Magento API.
 *
 * See the {@link UseContentInterface} for a list of methods and values available in this composable.
 */
export function useContent(): UseContentInterface {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseContentErrors> = ref({
    page: null,
    blocks: null,
  });
  const { app } = useContext();
  const context = app.$vsf;

  async function loadPage(params: ComposableFunctionArgs<{ identifier: string }>): Promise<CmsPage> {
    Logger.debug('useContent/loadPage');
    loading.value = true;
    let result = null;

    try {
      error.value.page = null;
      result = await loadContentCommand.execute(context, params);
    } catch (err) {
      error.value.page = err;
    } finally {
      loading.value = false;
    }

    return result;
  }

  async function loadBlocks(params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<CmsBlock[]> {
    Logger.debug('useContent/loadBlocks');
    loading.value = true;
    let result = [];

    try {
      error.value.blocks = null;
      result = await loadBlocksCommand.execute(context, params);
    } catch (err) {
      error.value.blocks = err;
    } finally {
      loading.value = false;
    }

    return result;
  }

  return {
    error: readonly(error),
    loading: readonly(loading),
    loadPage,
    loadBlocks,
  };
}

export default useContent;
export * from './useContent';
