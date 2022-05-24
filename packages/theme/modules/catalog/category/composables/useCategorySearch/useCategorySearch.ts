import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { CategorySearchQueryVariables, CategoryTree } from '~/modules/GraphQL/types';
import type { ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useCategorySearch} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UseCategorySearchErrors {
  /** Error when searching for categories fails, otherwise is `null`. */
  search: Error | null;
}

/** The params received by {@link useCategorySearch}'s `search` method. */
export type UseCategorySearchParams = ComposableFunctionArgs<CategorySearchQueryVariables>;

/** The interface provided by {@link useCategorySearch} composable. */
export interface UseCategorySearchInterface {
  /**
   * Searches for categories using the received filters and updates the
   * {@link UseCategorySearchInterface.result} ref with the results.
   */
  search(searchParams: UseCategorySearchParams): Promise<void>;

  /** Contains errors from any of the composable methods. */
  error: DeepReadonly<Ref<UseCategorySearchErrors>>;

  /**
   * The list of {@link CategoryTree} found by the last search. It's `null` if the
   * search has not been executed yet or fails.
   */
  result: DeepReadonly<Ref<CategoryTree[] | null>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
