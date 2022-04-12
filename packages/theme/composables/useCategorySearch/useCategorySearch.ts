import type { Ref } from '@nuxtjs/composition-api';
import type { CategorySearchQueryVariables } from '~/modules/GraphQL/types';
import type { Category, ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useCategorySearch} error object. The properties values' are the
 * errors thrown by its methods.
 */
export interface UseCategoryErrors {
  /** Error when searching for categories fails, otherwise is `null`. */
  search: Error | null;
}

/** The params received by {@link useCategorySearch}'s `search` method. */
export type UseCategorySearchParams = ComposableFunctionArgs<CategorySearchQueryVariables>;

/** The interface provided by {@link useCategorySearch} composable. */
export interface UseCategorySearchInterface {
  error: Ref<UseCategoryErrors>;
  result: Ref<Category[]>;
  loading: Ref<boolean>;
  search(searchParams: UseCategorySearchParams): Promise<void>;
}
