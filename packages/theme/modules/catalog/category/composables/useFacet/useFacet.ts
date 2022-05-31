import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { ComposableFunctionArgs } from '~/composables/types';
import type { ProductInterface } from '~/modules/GraphQL/types';
import type { SortingOption } from '~/modules/catalog/category/composables/useFacet/sortingOptions';

/**
 * The {@link useFacet} search params data structure
 */
export interface FacetSearchParams {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
}

/**
 * The {@link useFacet} search result data structure
 */
export interface SearchResultData {
  items: ProductInterface[],
  total: number,
  availableSortingOptions: SortingOption[],
  perPageOptions: number[],
  itemsPerPage: number
}

/**
 * The {@link useFacet} search results contain the parameters used to filter and
 * the obtained data that matches it.
 */
export interface UseFacetSearchResult {
  /** The data obtained in the search. */
  data: SearchResultData;
  /** The parameters used to filter the search. */
  input: FacetSearchParams;
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
export type UseFacetSearchParams = ComposableFunctionArgs<FacetSearchParams>;

/**
 * Data and methods returned from the {@link useFacet} composable.
 */
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
  result: Ref<UseFacetSearchResult>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;

  /** Searches for products using facets. */
  search(params?: UseFacetSearchParams): Promise<void>;
}
