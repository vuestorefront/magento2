import { ref, Ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs, Logger } from '@vue-storefront/core';
import { UseContentInterface, UseContentErrors } from '~/composables/useContent/useContent';

export const useContent = <PAGE, BLOCK>(): UseContentInterface<PAGE, BLOCK> => {
  const page: Ref<PAGE | {}> = ref({});
  const blocks: Ref<BLOCK[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const error: Ref<UseContentErrors> = ref({
    page: null,
    blocks: null,
  });
  const { app } = useContext();
  const context = app.$vsf;

  const loadPage = async (params: ComposableFunctionArgs<{ identifier: string }>): Promise<void> => {
    Logger.debug('useContent/loadPage');
    loading.value = true;

    try {
      error.value.page = null;
      const { loadContentCommand } = await import('~/composables/useContent/commands/loadContentCommand');
      page.value = await loadContentCommand.execute(context, params);
    } catch (err) {
      error.value.page = err;
    } finally {
      loading.value = false;
    }
  };

  const loadBlocks = async (params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<void> => {
    Logger.debug('useContent/loadBlocks');
    loading.value = true;

    try {
      error.value.blocks = null;
      const { loadBlocksCommand } = await import('~/composables/useContent/commands/loadBlocksCommand');
      blocks.value = await loadBlocksCommand.execute(context, params);
    } catch (err) {
      error.value.blocks = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loadPage,
    loadBlocks,
    loading,
    page,
    blocks,
    error,
  };
};

export default useContent;
