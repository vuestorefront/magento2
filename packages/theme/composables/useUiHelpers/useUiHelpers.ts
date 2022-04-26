import type { Category, FacetInterface } from '~/composables/types';
import type { FilterParams, Params } from './Params';

export interface UseUiHelpersInterface {
  changeFilters(filters: FilterParams, forcePush?: boolean): Promise<void>;
  changeItemsPerPage(itemsPerPage: number, forcePush?: boolean): Promise<void>;
  changeSearchTerm(term: string): string;
  changeSorting(sort: string, forcePush?: boolean): Promise<void>;
  clearFilters(forcePush?: boolean): Promise<void>;
  getCatLink(category: Category): string;
  getFacetsFromURL(): Params;
  getSearchTermFromUrl(): Params;
  isFacetCheckbox(): boolean;
  isFacetColor(facet: FacetInterface): boolean;
  setTermForUrl(term?: string): Promise<void>;
}
