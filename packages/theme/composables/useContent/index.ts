import { ref, Ref, useContext } from '@nuxtjs/composition-api';
import { ComposableFunctionArgs } from '~/composables/types';
import { Logger } from '~/helpers/logger';
import { UseContentInterface, UseContentErrors } from '~/composables/useContent/useContent';
import { loadContentCommand } from '~/composables/useContent/commands/loadContentCommand';
import { loadBlocksCommand } from '~/composables/useContent/commands/loadBlocksCommand';

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
