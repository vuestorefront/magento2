import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { AgnosticFacetSearchParams, ComposableFunctionArgs } from '~/composables/types';

/**
 * The {@link useFacet} search results contain the parameters used to filter and
 * the obtained data that matches it.
 */
export interface UseFacetSearchResult<DATA> {
  /** The data obtained in the search. */
  data: DATA;

  /** The parameters used to filter the search. */
  input: AgnosticFacetSearchParams;
}

/**
 * The {@link useFacet} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseFacetErrors {
  /** Error when searching with facets fails, otherwise is `null`. */
  search: Error | null;
}

/** The params received by {@link useFacet}'s `search` method. */
export type UseFacetSearchParams = ComposableFunctionArgs<AgnosticFacetSearchParams>;

/** The interface provided by {@link useFacet} composable. */
export interface UseFacetInterface {
  /**
   * Contains errors from any of the composable methods.
   *
   * Read {@link UseFacetErrors} documentation for more details.
   */
  error: DeepReadonly<Ref<UseFacetErrors>>;

  /**
   * Contains the search results from the last search.
   *
   * Read {@link UseFacetSearchResult} documentation for more details.
   */
  result: Ref<UseFacetSearchResult<any>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Searches for products using facets. */
  search(params?: UseFacetSearchParams): Promise<void>;
}
