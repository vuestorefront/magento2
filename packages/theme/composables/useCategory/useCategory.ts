import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useCategory} error object. Its properties values' are the errors
 * thrown by composable methods.
 *
 * @example
 *
 * Use `error` to check if searching fails:
 *
 * ```typescript
 * import { useFetch } from '@nuxtjs/composition-api';
 * import { useCategory } from '~/composables';
 *
 * export default {
 *   setup() {
 *     const { categories, error, loading, search } = useCategory();
 *
 *     useFetch(async () => {
 *       await search({ pageSize: 10 });
 *
 *       // It's an error when searching fails
 *       if (error.value.search) {
 *         // Handle search errors
 *       }
 *     });
 *
 *     return { categories, loading };
 *   },
 * };
 * ```
 */
export interface UseCategoryErrors {
  /** Error when searching categories fails, otherwise is `null`. */
  search: Error | null;
}

/** The {@link useCategory} params object received by `search` function. */
export interface UseCategoryParamsInput {
  pageSize: number;
}

/** The {@link useCategory} interface with the refs and the search function. */
export interface UseCategoryInterface {
  /** The searched category list/tree. */
  categories: Ref<any>;

  /** The error object */
  error: Ref<UseCategoryErrors>;

  /**
   * The loading state.
   *
   * It's `true` when searching and `false` otherwise.
   */
  loading: Ref<boolean>;

  /**
   * Searches for the category list.
   *
   * @example
   * ```typescript
   * import { useFetch } from '@nuxtjs/composition-api';
   * import { useCategory } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { categories, error, loading, search } = useCategory();
   *
   *     useFetch(async () => {
   *       await search({ pageSize: 10 });
   *     });
   *
   *     return { categories, loading };
   *   },
   * };
   */
  search: (searchParams: ComposableFunctionArgs<UseCategoryParamsInput>) => Promise<void>;
}
