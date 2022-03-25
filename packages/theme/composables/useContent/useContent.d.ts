import { ComposableFunctionArgs, ComputedProperty } from '~/composables/types';

export interface UseContentErrors {
  page: Error;
  blocks: Error;
}

export interface UseContentInterface<PAGE, BLOCK> {
  loadPage: (params: ComposableFunctionArgs<{ identifier: string }>) => Promise<PAGE>;
  loadBlocks: (params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<BLOCK[]>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}
