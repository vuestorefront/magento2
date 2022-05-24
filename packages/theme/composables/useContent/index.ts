import { ref, readonly, useContext } from '@nuxtjs/composition-api';
import type { Ref } from '@nuxtjs/composition-api';
import type { CmsPage, CmsBlock } from '~/modules/GraphQL/types';
import { Logger } from '~/helpers/logger';
import { loadContentCommand } from './commands/loadContentCommand';
import { loadBlocksCommand } from './commands/loadBlocksCommand';
import type { ComposableFunctionArgs } from '../types';
import type { UseContentInterface, UseContentErrors } from './useContent';

/**
 * @public
 * The `useContent` composable allows loading CMS Pages or Blocks from Magento API.
 *
 * @remarks
 * Under the hood, it calls the following Server Middleware API methods:
 *
 * - {@link @vue-storefront/magento-api#cmsBlocks} for loading CMS blocks
 *
 * - {@link @vue-storefront/magento-api#cmsPage} for loading CMS pages
 *
 * It is currently used in:
 *
 * - `components/ContentBlocks.vue`
 *
 * - `pages/Page.vue`
 *
 * @example
 * Initialization in component:
 *
 * ```typescript
 * import { useContent } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { loading, error, loadPage, loadBlocks } = useContent();
 *   }
 * }
 * ```
 *
 * @example
 * Load CMS Page:
 *
 * ```typescript
 * import { useFetch } from '@nuxtjs/composition-api';
 * import { useContent } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { loading, error, loadPage } = useContent();
 *
 *     const page = ref({});
 *     const pageId = 'about-us'
 *
 *     useFetch(async () => {
 *       page.value = await loadPage({ identifier: pageId });
 *
 *       if (error?.value?.page || !page.value) {
 *         // place for handle 404 error
 *       }
 *     });
 *   }
 * }
 * ```
 * More example with loading CMS Page: {@link UseContentInterface.loadPage}.
 *
 * @example
 * Load CMS Block:
 *
 * ```typescript
 * import { useFetch, ref } from '@nuxtjs/composition-api';
 * import { useContent } from '~/composables';
 *
 * export default {
 *   setup(props) {
 *     const { loadBlocks } = useContent();
 *     const blocks = ref([]);
 *
 *     useFetch(async () => {
 *       if (props.identifiers) {
 *         blocks.value = await loadBlocks(['block-a', 'block-b`]);
 *       }
 *     });
 *   }
 * }
 * ```
 *
 * More example with loading CMS Page: {@link UseContentInterface.loadBlocks}.
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
