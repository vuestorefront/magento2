import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { CategorySearchQueryVariables, CategoryTree } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * Errors that occured in the {@link useCategorySearch|useCategorySearch()} composable
 */
export interface UseCategorySearchErrors {
  /**
   * Contains error if `search` method failed, otherwise is `null`
   */
  search: Error | null;
}

/**
 * The params object accepted by the `search` method in the {@link useCategorySearch|useCategorySearch()} composable
 */
export type UseCategorySearchParams = ComposableFunctionArgs<CategorySearchQueryVariables>;

/**
 * Data and methods returned from the {@link useCategorySearch|useCategorySearch()} composable
 */
export interface UseCategorySearchInterface {
  /**
   * Searches for categories using the received filters and updates the
   * {@link UseCategorySearchInterface.result} ref with the results.
   */
  search(searchParams: UseCategorySearchParams): Promise<void>;

  /**
   * Contains errors from the composable methods
   */
  error: DeepReadonly<Ref<UseCategorySearchErrors>>;

  /**
   * The list of {@link CategoryTree} found by the last search. It's `null` if the
   * search has not been executed yet or fails.
   */
  result: DeepReadonly<Ref<CategoryTree[] | null>>;

  /**
   * Indicates whether any of the methods is in progress
   */
  loading: Readonly<Ref<boolean>>;
}
