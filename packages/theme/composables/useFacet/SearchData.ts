import type { Category, Filter, Product } from '~/composables/types';
import type { UseFacetSearchResult } from './useFacet';

/** The data returned by {@link useFacet} search method. */
type SearchData = UseFacetSearchResult<{
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}>;

export default SearchData;
