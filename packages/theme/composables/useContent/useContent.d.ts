import { ComposableFunctionArgs, ComputedProperty } from '@vue-storefront/core';
import { Ref } from '@nuxtjs/composition-api';

export interface UseContentErrors {
  page: Error;
  blocks: Error;
}

export interface UseContentInterface<PAGE, BLOCK> {
  page: Ref<PAGE | {}>;
  blocks: Ref<BLOCK[]>
  loadPage: (params: ComposableFunctionArgs<{ identifier: string }>) => Promise<void>;
  loadBlocks: (params: ComposableFunctionArgs<{ identifiers: string[] }>) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseContentErrors>;
}
