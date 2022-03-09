import { ref, Ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs, Logger } from '@vue-storefront/core';
import { UseContentInterface, UseContentErrors } from '~/composables/useContent/useContent';

export const useContent = <PAGE, BLOCK>(): UseContentInterface<PAGE, BLOCK> => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseContentErrors> = ref({
    page: null,
    blocks: null,
  });
  const { app } = useContext();
  const context = app.$vsf;

  const loadPage = async (params: ComposableFunctionArgs<{ identifier: string }>): Promise<PAGE> => {
    Logger.debug('useContent/loadPage');
    loading.value = true;
    let result = null;

    try {
      error.value.page = null;
      const { loadContentCommand } = await import('~/composables/useContent/commands/loadContentCommand');
      result = await loadContentCommand.execute(context, params);
    } catch (err) {
      error.value.page = err;
    } finally {
      loading.value = false;
    }

    return result;
  };

  const loadBlocks = async (params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<BLOCK[]> => {
    Logger.debug('useContent/loadBlocks');
    loading.value = true;
    let result = [];

    try {
      error.value.blocks = null;
      const { loadBlocksCommand } = await import('~/composables/useContent/commands/loadBlocksCommand');
      result = await loadBlocksCommand.execute(context, params);
    } catch (err) {
      error.value.blocks = err;
    } finally {
      loading.value = false;
    }

    return result;
  };

  return {
    loadPage,
    loadBlocks,
    loading,
    error,
  };
};

export default useContent;
