import type { CategoryTree } from '~/modules/GraphQL/types';
import type { FilterParams, Params } from './Params';
import type { FacetInterface } from '~/modules/catalog/category/types';

/**
 * Data and methods returned from the {@link useUiHelpers} composable.
 */
export interface UseUiHelpersInterface {
  /**
   * Updates current URL with filters as query/search params.
   *
   * It forces the navigation to updated URL when `forcePush` is `true`.
   */
  changeFilters(filters: FilterParams, forcePush?: boolean): Promise<void>;

  /**
   * Updates current URL with items per page count as query/search param.
   *
   * It forces the navigation to updated URL when `forcePush` is `true`.
   */
  changeItemsPerPage(itemsPerPage: number, forcePush?: boolean): Promise<void>;

  /**
   * Returns received term. Use {@link UseUiHelpersInterface#setTermForUrl}
   * instead.
   */
  changeSearchTerm(term: string): string;

  /**
   * Updates current URL with sorting as query/search param.
   *
   * It forces the navigation to updated URL when `forcePush` is `true`.
   */
  changeSorting(sort: string, forcePush?: boolean): Promise<void>;

  /**
   * Clears filters from current URL query/search params.
   *
   * It forces the navigation to updated URL when `forcePush` is `true`.
   */
  clearFilters(forcePush?: boolean): Promise<void>;

  /**
   * Updates current URL with a page as a query/search param.
   *
   * It forces the navigation to updated URL when `forcePush` is `true`.
   */
  changePage(page: number, forcePush?: boolean): Promise<void>;

  /** Gets route link for received category. */
  getCatLink(category: CategoryTree): string;

  /** Gets facets parameters from current URL query/search params. */
  getFacetsFromURL(): Params;

  /** Gets search term and other params from current URL query/search params. */
  getSearchTermFromUrl(): Params;

  isFacetCheckbox(): boolean;

  /** Checks if received facet is a color facet. */
  isFacetColor(facet: FacetInterface): boolean;

  /**
   * Updates current URL with the search term as query/search param and
   * navigates to it.
   */
  setTermForUrl(term?: string): Promise<void>;

}
