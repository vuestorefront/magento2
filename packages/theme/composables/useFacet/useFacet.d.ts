import { AgnosticFacetSearchParams, ComposableFunctionArgs} from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';
// @ts-ignore
import { FacetResultsData } from '@vue-storefront/magento/types';

export interface FacetSearchResult<S> {
  data: S;
  input: AgnosticFacetSearchParams;
}

export interface UseFacetErrors {
  search: Error;
}


export type SearchData = FacetSearchResult<FacetResultsData>;

export interface UseFacet {
  result: Ref<FacetSearchResult<FacetResultsData>>;
  loading: Ref<boolean>;
  search: (params?: ComposableFunctionArgs<AgnosticFacetSearchParams>) => Promise<void>;
  error: Ref<UseFacetErrors>;
}
