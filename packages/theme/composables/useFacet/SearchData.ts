import type { Category, Filter, Product } from '~/composables/types';
import type { UseFacetSearchResult } from './useFacet';

/** The object with data returned by {@link useFacet} search method. */
export type SearchData = UseFacetSearchResult<{
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}>;
