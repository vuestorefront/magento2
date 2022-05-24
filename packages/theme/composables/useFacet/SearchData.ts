import type { Filter } from '~/composables/types';
import type { CategoryTree } from '~/modules/GraphQL/types';
import type { UseFacetSearchResult } from './useFacet';
import type { Product } from '~/modules/catalog/product/types';

/** The object with data returned by {@link useFacet} search method. */
export type SearchData = UseFacetSearchResult<{
  products: Product[];
  categories: CategoryTree[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}>;
