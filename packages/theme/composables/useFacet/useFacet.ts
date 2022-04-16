import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { AgnosticFacetSearchParams, ComposableFunctionArgs } from '~/composables/types';

export interface UseFacetSearchResult<DATA> {
  data: DATA;
  input: AgnosticFacetSearchParams;
}

export interface UseFacetErrors {
  search: Error | null;
}

export interface UseFacetInterface {
  result: Ref<UseFacetSearchResult<any>>;
  loading: Readonly<Ref<boolean>>;
  search: (params?: ComposableFunctionArgs<AgnosticFacetSearchParams>) => Promise<void>;
  error: DeepReadonly<Ref<UseFacetErrors>>;
}
