import type { Ref } from '@nuxtjs/composition-api';
import type { Category, ComposableFunctionArgs } from '~/composables/types';

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
  /** The array of {@link Category} fetched in the `search` method, otherwise is `null`. */
  categories: Ref<Category[] | null>;

  /** The error object */
  error: Ref<UseCategoryErrors>;

  /**
   * The loading state.
   *
   * It's `true` when searching and `false` otherwise.
   */
  loading: Ref<boolean>;

  /**
   * A method that searches for a list of {@link Category} and updates
   * `categories` with them.
   *
   * @example
   *
   * Searches for categories on server side using the `useFetch` composable:
   *
   * ```typescript
   * import { useFetch } from '@nuxtjs/composition-api';
   * import { useCategory } from '~/composables';
   *
   * export default {
   *   setup() {
   *     const { categories, error, search } = useCategory();
   *
   *     useFetch(async () => {
   *       await search({ pageSize: 10 })
   *
   *       if (error.value.search) {
   *         // Handle search errors by, for example, redirecting to 404
   *       }
   *     });
   *
   *     return { categories };
   *   },
   * };
   * ```
   */
  search: (searchParams: ComposableFunctionArgs<UseCategoryParamsInput>) => Promise<void>;
}
