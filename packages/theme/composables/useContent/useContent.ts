import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { CmsPage, CmsBlock } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '../types';

export interface UseContentErrors {
  /**
   * Errors related to CMS page loading
   */
  page: Error;
  /**
   * Errors related to CMS blocks loading
   */
  blocks: Error;
}

/**
 * `UseContentInterface` is used by useContent composable, and it's responsible for fetching CMS data from Magento.
 */
export interface UseContentInterface {
  /**
   * Loading state. It returns true when loading data from Magento is in progress
   */
  loading: DeepReadonly<Ref<boolean>>;

  /**
   * Contains errors from any of the methods.
   */
  error: DeepReadonly<Ref<UseContentErrors>>;
  /**
   * Load CMS Page from Magento
   *
   * Returns Promise with {@link CmsPage}
   *
   * @example
   * Load CMS Page using the useFetch composition-api hook:
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
   *         // place for handle 404 error
   *       }
   *     });
   *   }
   * }
   * ```
   *
   * @example
   * Load CMS Page using the useAsync Composition API hook:
   * ```typescript
   * import { useAsync } from '@nuxtjs/composition-api';
   * import { useContent } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { loadPage } = useContent();
   *     const pageId = 'about-us'
   *
   *     const page = useAsync(async () => {
   *       const pageData = await loadPage({ identifier: pageId });
   *
   *       if (!pageData.value) {
   *         // place for handle 404 error
   *       }
   *
   *       return pageData;
   *     });
   *   }
   * }
   * ```
   *
   * @example
   * Load CMS Page on client side using the onMounted Composition API hook:
   * ```typescript
   * import { onMounted, ref } from '@nuxtjs/composition-api';
   * import { useContent } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { loadPage } = useContent();
   *     const page = ref({});
   *     const pageId = 'about-us'
   *
   *     onMounted(async () => {
   *       pageData.value = await loadPage({ identifier: pageId });
   *
   *       if (!pageData.value) {
   *         // place for handle 404 error
   *       }
   *     });
   *   }
   * }
   * ```
   */
  loadPage: (params: ComposableFunctionArgs<{ identifier: string }>) => Promise<CmsPage>;

  /**
   * Load CMS block from Magento
   *
   * Returns Promise with array of {@link CmsBlock}
   *
   * @example
   * Load CMS Block on server side using the useFetch Composition API hook:
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
   * @example
   * Load CMS Block on server side using the useAsync Composition API hook:
   * ```typescript
   * import { useAsync } from '@nuxtjs/composition-api';
   * import { useContent } from '~/composables';
   *
   * export default {
   *   setup(props) {
   *     const { loadBlocks } = useContent();
   *
   *     const blocks = useAsync(async () => {
   *       if (props.identifiers) {
   *         return await loadBlocks(['block-a', 'block-b`]);
   *       }
   *
   *       return null;
   *     });
   *   }
   * }
   * ```
   *
   * @example
   * Load CMS Block on client side using the onMounted Composition API hook:
   * ```typescript
   * import { onMounted, ref } from '@nuxtjs/composition-api';
   * import { useContent } from '~/composables';
   *
   * export default {
   *   setup(props) {
   *     const { loadBlocks } = useContent();
   *     const blocks = ref([]);
   *
   *     onMounted(async () => {
   *       if (props.identifiers) {
   *         blocks.value = await loadBlocks(['block-a', 'block-b`]);
   *       }
   *     });
   *   }
   * }
   * ```
   */
  loadBlocks: (params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<CmsBlock[]>;
}
