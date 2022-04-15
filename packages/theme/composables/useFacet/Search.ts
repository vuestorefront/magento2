import type { Category, Filter, Product } from '~/composables/types';
import type { ProductAttributeFilterInput, ProductAttributeSortInput } from '~/modules/GraphQL/types';
import type { FacetSearchResult } from './useFacet';

/** The params object used to search for products. */
export type GetProductSearchParams = {
  pageSize?: number;
  currentPage?: number;
  search?: string;
  filter?: ProductAttributeFilterInput;
  sort?: ProductAttributeSortInput;
  configurations?: string[];
};

/** The data returned by {@link useFacet} search method. */
export type SearchData = FacetSearchResult<{
  products: Product[];
  categories: Category[];
  facets: Record<string, Filter>;
  total: number;
  perPageOptions: number[];
  itemsPerPage: number;
  availableFilters: Record<string, any>;
}>;
