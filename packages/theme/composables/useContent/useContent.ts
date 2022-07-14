import type { Ref } from '@nuxtjs/composition-api';
import type { CmsPage, CmsBlock } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '../types';

/**
 * Errors that occured in the {@link useContent|useContent()} composable
 */
export interface UseContentErrors {
  /**
   * Contains error if `loadPage` method failed, otherwise is `null`
   */
  page: Error | null;

  /**
   * Contains error if `loadBlocks` method failed, otherwise is `null`
   */
  blocks: Error | null;
}

/**
 * Data and methods returned from the {@link useContent|useContent()} composable
 */
export interface UseContentInterface {
  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;

  /**
   * Contains errors from the composable methods
   */
  error: Readonly<Ref<UseContentErrors>>;

  /**
   * Loads CMS page
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#cmsPage} API endpoint
   * and accepts custom query named `cmsPage`.
   *
   * @example
   *
   * Load CMS Page using the useFetch hook:
   *
   * ```typescript
   * import { useFetch, ref } from '@nuxtjs/composition-api';
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
   *         // Handle error
   *       }
   *     });
   *   }
   * }
   * ```
   */
  loadPage(params: ComposableFunctionArgs<{ identifier: string }>): Promise<CmsPage>;

  /**
   * Loads CMS block
   *
   * @remarks
   *
   * Internally, it calls the {@link @vue-storefront/magento-api#cmsBlocks} API endpoint
   * and accepts custom query named `cmsBlocks`.
   *
   * @example
   *
   * Load CMS Block using the useFetch hook:
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
   */
  loadBlocks(params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<CmsBlock[]>;
}
