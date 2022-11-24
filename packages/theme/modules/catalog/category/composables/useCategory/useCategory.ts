import type { Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { CategoryTree } from '~/modules/GraphQL/types';
/**
 * The {@link useCategory} error object. Its properties values' are the errors
 * thrown by composable methods.
 *
 * @example
 *
 * Use `error` to check if loading fails:
 *
 * ```typescript
 * import { useFetch } from '@nuxtjs/composition-api';
 * import { useCategory } from '~/modules/catalog/category/composables/useCategory';
 *
 * export default {
 *   setup() {
 *     const { categories, error, load, loading } = useCategory();
 *
 *     useFetch(async () => {
 *       await load({ pageSize: 10 });
 *
 *       // It's an error when loading fails
 *       if (error.value.load) {
 *         // Handle load errors
 *       }
 *     });
 *
 *     return { categories, loading };
 *   },
 * };
 * ```
 */
export interface UseCategoryErrors {
  /** Error when loading categories fails, otherwise is `null`. */
  load: Error;
  loadCategoryMeta: Error;
}

/** The {@link useCategory} params object received by `load` function. */
export type UseCategoryParamsInput = ComposableFunctionArgs< {
  pageSize: number;
}>;

/** The {@link useCategory} params object received by `loadCategoryMeta` function. */
export type UseCategoryMetaParamsInput = ComposableFunctionArgs< {
  category_uid: string;
}>;

/**
 * Data and methods returned from the {@link useCategory} composable
 * */
export interface UseCategoryInterface {
  /** The array of {@link CategoryTree} fetched in the `load` method, otherwise is `null`. */
  categories: Ref<CategoryTree[] | null>;

  /** The error object */
  error: Ref<UseCategoryErrors>;

  /**
   * The loading state.
   *
   * It's `true` when loading and `false` otherwise.
   */
  loading: Ref<boolean>;

  /**
   * A method that loads the list of {@link CategoryTree} and updates `categories`.
   *
   * @example
   *
   * Loads the categories on server side using the `useFetch` composable:
   *
   * ```typescript
   * import { useFetch } from '@nuxtjs/composition-api';
   * import { useCategory } from '~/modules/catalog/category/composables/useCategory';
   *
   * export default {
   *   setup() {
   *     const { categories, error, load } = useCategory();
   *
   *     useFetch(async () => {
   *       await load({ pageSize: 10 })
   *
   *       if (error.value.load) {
   *         // Handle load errors by, for example, redirecting to 404
   *       }
   *     });
   *
   *     return { categories };
   *   },
   * };
   * ```
   */
  load(params: ComposableFunctionArgs<UseCategoryParamsInput>): Promise<void>;
  loadCategoryMeta(params: ComposableFunctionArgs<UseCategoryMetaParamsInput>): Promise<CategoryTree | null>;
}
